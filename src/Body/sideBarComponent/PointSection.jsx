import React, { useState } from 'react'


export function PointSection(props) {
    const [customSize, setCustomSize] = useState()


    const handleSizeChange = (value) => {
        props.handleChangePointSize(value);
    }

    const handleCustomSizeChange = (event) => {
        setCustomSize(parseFloat(event.target.value));
    }


    const buttonStyle=(size)=>{
        if(size ==props.pointSize) return "bg-blue-500 hover:bg-blue-500 text-white font-semibold hover:text-white mx-1 py-1 px-1 border border-blue-500 hover:border-transparent rounded"
        return "bg-white hover:bg-blue-500 text-black-700  hover:text-white mx-1 py-1 px-1 border border-blue-500 hover:border-transparent rounded"
    }

    return (
        <div className="bg-blue-900 py-10 p-2 mb-4 h-15">
            <div className="btn-group text-center">
                <button className={buttonStyle(0.05)} onClick={() => handleSizeChange(0.00001)}>
                    Pequeño
                </button>
                <button className={buttonStyle(0.2)} onClick={() => handleSizeChange(0.01)}>
                    Medio
                </button>
                <button className={buttonStyle(1)} onClick={() => handleSizeChange(0.1)}>
                    Grande
                </button>

            </div>
        </div>
    )
}


