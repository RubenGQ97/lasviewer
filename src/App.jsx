import { useState,useEffect } from "react";
import Canvas from "./Body/Canvas";
import SideBar from "./Body/Sidebar";
import Header from "./Header/Header";
import {LASLoader} from '@loaders.gl/las';
import {load} from '@loaders.gl/core';


export default function App() {
  const [data,setData]= useState()
  const [colorType,setColorType] = useState('RGB')
  const [loading,setLoading]  = useState(false)

  const readDataFromFile=async (file)=>{
    setLoading(true)
    let buffer= await file.arrayBuffer()
    const datos = await load(buffer,LASLoader)
    setData(datos)
  }

  const changeColorType=(selected)=>{
    setColorType(selected)
  }

  useEffect(() => {
    console.log(data);
  }, [data]);

  return (
    <div className="w-full h-[100vh] bg-green-400 flex flex-col">
      <Header readDataFromFile={readDataFromFile} className={"h-20 bg-blue-500"} />
      <div className="grid h-full grid-cols-8">
        <Canvas readDataFromFile={readDataFromFile} loading={loading} colorType={colorType}  data={data} />
        <SideBar changeColorType={changeColorType} />
      </div>
    </div>
  );


}
