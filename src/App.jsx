import { useState, useEffect } from "react";
import Canvas from "./Body/Canvas";
import SideBar from "./Body/Sidebar";
import Header from "./Header/Header";
import { LASLoader } from '@loaders.gl/las';
import { load,parse} from '@loaders.gl/core';

let fileName;

export default function App() {
  const [data, setData] = useState(null)
  const [colorType, setColorType] = useState('RGB')
  const [loading, setLoading] = useState(false)
  const [speed, setSpeed] = useState(1)
  const [pointSize, setPointSize] = useState(0.1)
  const [resetCamera, setResetCamera] = useState(false)


  const readDataFromFile = async (url, isUrl) => {
    setLoading(true)
    
    let file = isUrl ? await fetch(url) : url
    fileName = isUrl ? url.substring(1) : file.name
    let buffer = await file.arrayBuffer()
    const datos = await load(buffer, LASLoader)
    console.log(datos)
    setData(datos)
  }


  const reset = () => {
    setSpeed(1)
    setColorType('RGB')
    setPointSize(0.1)
    setResetCamera(true)
  }


  const changeColorType = (selected) => {
    setColorType(selected)
  }

  const handleChangePointSize = (value) => {
    setPointSize(value)
  }

  useEffect(() => {

  }, [data]);

  return (
    <div className="w-full h-[100vh] bg-green-400 flex flex-col overflow-hidden">
      <Header setResetCamera={setResetCamera}
        reset={reset}
        readDataFromFile={readDataFromFile}
      />

      <div className="grid h-full grid-cols-8">
        <Canvas resetCamera={resetCamera}
          pointSize={pointSize}
          readDataFromFile={readDataFromFile}
          speed={speed}
          loading={loading}
          colorType={colorType}
          data={data}
          setResetCamera={setResetCamera}
        />
        <SideBar pointSize={pointSize}
          handleChangePointSize={handleChangePointSize}
          changeColorType={changeColorType}
          datos={data != null ? data.loaderData : ""}
          fileName={fileName}
        />
      </div>

    </div>
  );


}
