import React from 'react'
import ColorSection from './sideBarComponent/ColorSection';
import { PointSection } from './sideBarComponent/PointSection'; 
import Information from './sideBarComponent/Information';

function SideBar(props) {


  return <div className="h-full col-span-2 bg-white overflow-y-auto">
    <div className="flex justify-between items-center p-2">
        <img src="../../public/logo1.png"  className="w-25 h-25 mx-auto" />  
      </div>
      <div className="p-4">
        <Information datos={props.datos} fileName={props.fileName}></Information>
        <h2 className="text-2xl font-sans bg-teal-300 mb-4"> Color</h2>
          <ColorSection 
          changeColorType={props.changeColorType} 
          updateClassificationMap={props.updateClassificationMap}
          classificationNumber={props.classificationNumber}
          classificationMap={props.classificationMap}
          selectedOption={props.selectedOption}
          setSelectedOption={props.setSelectedOption}
          ></ColorSection>
        <h2 className="text-2xl font-sans bg-teal-300 mb-4"> Puntos</h2>
          <PointSection pointSize={props.pointSize} handleChangePointSize={props.handleChangePointSize} ></PointSection>
      </div>
  </div>;
}

export default SideBar;
