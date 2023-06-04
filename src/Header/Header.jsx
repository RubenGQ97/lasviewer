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

  const handleNewFile = (event) => {
    props.readDataFromFile(event.target.files[0], false)
  }

  const handleExampleFile = (url) => {
    setDropdown(!dropdown)
    props.readDataFromFile(url, true)

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

      </div>
    </div>

  );
}

export default Header;
