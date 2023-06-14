import React from 'react'
import { useState } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDown } from '@fortawesome/free-solid-svg-icons';


const EXAMPLES_FILES = [
  { name: 'half-dome', path: '/half-dome.laz' },
  { name: 'st.Hellen', path: '/st.Hellen.laz' },
  { name: 'iowa-bridge', path: '/iowa-bridge.laz' },
  { name: 'spaceshuttle', path: '/spaceshuttle.laz' },
]


function Header(props) {
  const [dropdown, setDropdown] = useState(false);
  const [stateControl, setStateControl] = useState(false)

  const handleNewFile = (event) => {
    props.readDataFromFile(event.target.files[0], false)
  }

  const handleExampleFile = (url) => {
    setDropdown(!dropdown)
    props.readDataFromFile(url, true)

  }

  const toggleControlState = () => {
    props.setUseFlyControls()
    setStateControl(!stateControl);
  }
  

  return (
    <div className='relative'>
      <div className={" flex items-center py-3 h-30 bg-blue-900"} >
        <input type="file" className=" hidden" id="file-upload" onChange={handleNewFile}></input>
        <label
          className="cursor-pointer bg-white border border-gray-300 text-black-700 ml-3 py-2 px-4 rounded-l-lg shadow-sm  hover:bg-gray-100"
          htmlFor="file-upload"
        >
          Seleccionar archivo
        </label>
        <button
          className=" ml-0 flex items-center cursor-pointer bg-white border border-gray-300 text-black-700 h-full px-1 py-3 rounded-r-lg shadow-sm hover:bg-gray-100"
          onClick={() => setDropdown(!dropdown)}
        >
          <FontAwesomeIcon icon={faAngleDown} className="mx-auto " />
        </button>

        {dropdown && (
          <div className="absolute top-full left-0 mt-2 bg-white border border-gray-300 py-2 px-4 rounded-lg shadow-sm">
            <p className="text-gray-700">Archivos de ejemplo:</p>
            <ul className="mt-2">

              {EXAMPLES_FILES.map((file, index) => (

                <li key={index}
                  className="cursor-pointer text-black font-mono m-0 p-0 hover:text-blue-700 border-b border-gray-300"
                  onClick={() => handleExampleFile(file.path)}
                >
                  {file.name}
                </li>
              ))}

            </ul>
          </div>
        )}




        <label className="relative inline-flex items-center ml-auto mr-5 cursor-pointer">
          <input
            type="checkbox"
            className="sr-only peer"
            checked={stateControl}
            onChange={toggleControlState}
            style={{ color: stateControl ? 'purple' : 'inherit' }}
          />
          <div className="w-11 h-6 bg-gray-200 rounded-full peer dark:bg-gray-700 peer-focus:ring-4 peer-focus:ring-purple-300 dark:peer-focus:ring-purple-800 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-purple-600"></div>
          <span className="text-white ml-2">
            {stateControl ? 'TrackBall Controls' : 'Orbit Controls'}
          </span>
        </label>

        <button className='flex ml-auto items-center cursor-pointer bg-white border border-gray-300 text-black-700 h-full  mx-6 px-6 py-2 rounded-lg shadow-sm hover:bg-gray-100'
          onClick={props.reset}
        >
          Reset
        </button>
      </div>
    </div>

  );
}

export default Header;
