import React, { useRef, useState, useEffect } from "react";
import * as THREE from 'three';
import { FlyControls } from 'three/examples/jsm/controls/FlyControls.js';
import './styles/canvas.css'
import { toRgb, classificationToColor } from './utils.jsx'
let scene, camera, renderer, controls, points
const scaleFactor = 0.01;

function Canvas(props) {
  const ref = useRef(null)
  const [firstState, setFirstState] = useState(true)
  const [color, setColor] = useState(null)
  const [classificationColor, setClassificationColor] = useState()
  const [position, setPosition] = useState()
  const [classification, setClassification] = useState()
  const [intensity, setIntensity] = useState()
  let material;
  const geometry = new THREE.BufferGeometry()


  /**
   * evento se lee archivo desde la dropzone
   */
  const handleNewFile = (event) => {
    props.readDataFromFile(event.target.files[0], false)
  }

  /**
   * Guarda el estado de classificacion y crea 
   * un array con valores RGB según la clasificacion de cada punto
   */
  const initClassification = (value) => {
    setClassification(value)
    setClassificationColor(classificationToColor(value))
  }


  /*
    Crea el material de los puntos según el tipo de colorizacion fijado
  */
  const createMaterial = () => {
    if (color == null) {
      material = new THREE.PointsMaterial({ size: 0.1, color: 'grey' })
    } else {
      material = new THREE.PointsMaterial({ size: 0.08, vertexColors: true });
      switch (props.colorType) {
        case 'RGB':
          geometry.setAttribute('color', new THREE.BufferAttribute(color, 3, true))
          break;
        case 'CLASSIFICATION':
          geometry.setAttribute('color', new THREE.BufferAttribute(classificationColor, 3, true))
          break;
        default:
          material = new THREE.PointsMaterial({ size: 0.1, color: 'grey' })
          break;

      }
    }
    geometry.setAttribute('position', new THREE.BufferAttribute(position, 3))
  }

  /**
   * crea la escena de threeJS
   */
  const createScene = () => {
    scene = new THREE.Scene()
    scene.background = new THREE.Color(0x000000)
  }

  /**
   * crea la camara de threeJS
   */
  const createCamera = () => {
    camera = new THREE.PerspectiveCamera();
  }


  /**
   * crea los controles de camara
   */
  const createControls = () => {
    controls = new FlyControls(camera, ref.current)
    controls.movementSpeed = props.speed;
    controls.rollSpeed = 0.01;
  }


  /**
   * Resetea la posicion de la camara
   */
  const resetCamera = () => {
    const vista = new THREE.Box3().setFromObject(points);
    const center = vista.getCenter(new THREE.Vector3());
    const size = vista.getSize(new THREE.Vector3());
    const maxDimension = Math.max(size.x, size.y, size.z);
    const distance = maxDimension / (2 * Math.tan(THREE.MathUtils.degToRad(camera.fov) / 2));
    camera.position.copy(center);
    camera.position.z += distance;
    camera.lookAt(center);
  }



  const initScene = () => {
    createScene()
    createCamera()
    createControls()
    createMaterial()

    points = new THREE.Points(geometry, material);

    //Escalamos
    points.scale.set(scaleFactor, scaleFactor, scaleFactor);

    //Ajustamos camara tras escalar
    resetCamera()

    console.log(points)
    scene.add(points)
  }


  // Loop de renderizado de la escena
  const startRenderingLoop = () => {
    renderer = new THREE.WebGLRenderer({ canvas: ref.current });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(ref.current.clientWidth, ref.current.clientHeight);
    const render = () => {
      requestAnimationFrame(render);
      controls.update(1);
      renderer.render(scene, camera);
    };

    render();
  };





  /**
   * Crea de nuevo los puntos cuando el tipo de color cambia o el tamaño de los puntos cambia
   */
  const updatePoints = () => {
    createMaterial();
    const newPoints = new THREE.Points(geometry, material);
    newPoints.scale.set(scaleFactor, scaleFactor, scaleFactor);
    scene.remove(points);
    scene.add(newPoints);
    points = newPoints;
  }


  //inicial
  useEffect(() => {
    setFirstState(false)
  }, [])



  /**
   * UseEffect para que si se cargan datos actualizar las variables del componente
   */
  useEffect(() => {
    if (!firstState) {
      props.data.attributes?.COLOR_0 ? setColor(toRgb(props.data.attributes.COLOR_0.value)) : null
      props.data.attributes?.POSITION ? setPosition(props.data.attributes.POSITION.value) : null
      props.data.attributes?.classification ? initClassification(props.data.attributes.classification.value) : null
      props.data.attributes?.intensity ? setIntensity(props.data.attributes.intensity.value) : null
    }
  }, [props.data]);



  /**
   * Si la variable position se inicia, se monta la escena 
   */
  useEffect(() => {
    console.log("effect datos 2")
    if (!firstState) {
      initScene()
      startRenderingLoop()
    }

  }, [position])



  //si cambia el tipo de color
  useEffect(() => {

    if (!firstState) {
      updatePoints()
    }

  }, [props.colorType])




  const returnCanvas = () => {
    return (
      <div className="h-full flex justify-center items-center col-span-6 bg-black">
        <canvas ref={ref} className="w-full h-full" ></canvas>
      </div>
    )
  }



  const returnDropZone = () => {

    const handleDrop = (event) => {
      event.preventDefault();
      const files = event.dataTransfer.files;
      if (files.length > 0) {
        props.readDataFromFile(files[0], false);
      }
    };

    if (props.loading) {
      return (
        <div className="h-full flex justify-center items-center col-span-6 bg-gif">
          <label htmlFor="dropzone-file" className=" m-10 flex flex-col items-center justify-center w-2/6 h-3/6 border-2 bg-loading">

          </label>
        </div>
      )
    } else {
      return (
        <div className="h-full flex justify-center items-center col-span-6 bg-gif"
          onDragOver={(event) => { event.preventDefault() }}
          onDrop={handleDrop}>
          <label htmlFor="dropzone-file" className=" m-10 flex flex-col items-center justify-center w-3/6 h-3/6 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-gray-800 dark:bg-gray-900 hover:bg-orange-200 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
            <div className="flex flex-col items-center justify-center pt-5 pb-6">
              <svg aria-hidden="true" className="w-20 h-20 mb-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path></svg>
              <p className="mb-2 text-3xl text-gray-500 dark:text-gray-400"><span className="font-semibold">Click to upload</span> or drag and drop</p>
              <p className="text-3xl text-gray-500 dark:text-gray-400">LAS or LAZ files</p>
            </div>
            <input id="dropzone-file" type="file" className="hidden" onChange={handleNewFile} />
          </label>
        </div>
      )
    }

  }


  //O bien mostramos el canvas si hay datos cargados o damos la opcion de un dropzone
  if (props.data == undefined) {
    return returnDropZone()
  } else {
    return returnCanvas()
  }

}






export default Canvas;
