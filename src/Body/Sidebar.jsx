import React from 'react'
import ColorSection from './sideBarComponent/ColorSection';

function SideBar(props) {


  return <div className="h-full col-span-2 bg-white">
    <div className="flex justify-between items-center p-2">
        <img src="../../public/logo1.png"  className="w-25 h-25 mx-auto" />  
      </div>
      <div className="p-4">
        <div className="bg-blue-900 p-5 mb-4  h-50">
          <h2 className="text-xl text-center font-medium">Información</h2>
        </div>
        <h2 className="text-2xl font-sans bg-teal-300 mb-4"> Color</h2>
          <ColorSection changeColorType={props.changeColorType} ></ColorSection>
        <div className="bg-blue-900 p-2 mb-4 h-15">
          <h2 className="text-lg font-medium">Editar</h2>
        </div>
      </div>
  </div>;
}

export default SideBar;
