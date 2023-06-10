import { useState, useEffect } from "react";
import Canvas from "./Body/Canvas";
import SideBar from "./Body/Sidebar";
import Header from "./Header/Header";
import { LASLoader } from '@loaders.gl/las';
import { load} from '@loaders.gl/core';

let fileName;

export default function App() {
  const [data, setData] = useState(null)
  const [selectedOption, setSelectedOption] = useState(0);
  const [colorType, setColorType] = useState('RGB')
  const [loading, setLoading] = useState(false)
  const [speed, setSpeed] = useState(1)
  const [pointSize, setPointSize] = useState(0.01)
  const [resetCamera, setResetCamera] = useState(false)
  const [classificationNumber, setClassificationNumber] = useState(false)
  const [useFlyControls, setUseFlyControls] = useState(false);
  const [initClassificationList,setinitClassificationList]=  useState()
  const [classificationMap,SetClassificationMap] = useState(new Map([
    [0,[255,255,255]],
    [1,[200,138,37]],
    [2,[85, 207, 0]],
    [3,[123, 123, 123]],
    [4,[236, 1, 255]],
    [5,[45, 182, 255]],
    [6,[83, 77, 59]],
    [7,[199, 211, 129]],
    [8,[0, 139, 6]],
    [9,[0, 139, 6]],
    [10,[0, 139, 6]],
    [11,[79, 33, 10]],
    [12,[91, 91, 91]],
    [13,[181, 175, 172]],
    [14,[242, 7, 7]],
    [15,[129, 129, 129]],
    [16,[0, 168, 3 ]],
    [17,[0, 0, 0]]
  ]))


  const readDataFromFile = async (url, isUrl) => {
    setLoading(true)
    
    let file = isUrl ? await fetch(url) : url
    fileName = isUrl ? url.substring(1) : file.name
    let buffer = await file.arrayBuffer()
    const datos = await load(buffer, LASLoader)
    console.log(datos)
    setData(datos)
    setinitClassificationList(Array.from(new Set(datos.attributes?.classification.value)))
    setClassificationNumber(Array.from(new Set(datos.attributes?.classification.value)));
  }


  const updateClassificationMap = (key, array) => {
    SetClassificationMap(prevMap => {
      const newMap = new Map(prevMap);
      newMap.set(key, array);
      return newMap;
    });
  };


  const reset = () => {
    setSpeed(1)
    setColorType('RGB')
    setPointSize(0.01)
    setResetCamera(true)
    setClassificationNumber(initClassificationList)
    setSelectedOption(0)
  }


  const changeColorType = (selected) => {
    setColorType(selected)
  }

  const handleChangePointSize = (value) => {
    setPointSize(value)
  }

  const handleControlstate=()=>{
    setUseFlyControls(!useFlyControls)
  }

  useEffect(() => {

  }, [data]);

  return (
    <div className="w-full h-[100vh] bg-green-400 flex flex-col overflow-hidden">
      <Header setResetCamera={setResetCamera}
        reset={reset}
        readDataFromFile={readDataFromFile}
        setUseFlyControls={handleControlstate}
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
          classificationMap={classificationMap}
          useFlyControls={useFlyControls}
        />
        <SideBar pointSize={pointSize}
          handleChangePointSize={handleChangePointSize}
          changeColorType={changeColorType}
          datos={data != null ? data.loaderData : ""}
          fileName={fileName}
          updateClassificationMap={updateClassificationMap}
          classificationNumber={classificationNumber}
          classificationMap={classificationMap}
          selectedOption={selectedOption}
          setSelectedOption={setSelectedOption}
        />
      </div>

    </div>
  );


}
