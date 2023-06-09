import React from 'react'
import { useState, useEffect } from 'react';


export default function ColorSection(props) {
    const [selectedOption, setSelectedOption] = useState(0);
    const [colors, setColors] = useState([]);

    const handleOptionSelect = (event) => {
        setSelectedOption(event.target.value);
        props.changeColorType(event.target.value)
    }



    const handleColorChange = (index, newKey, newValue) => {
        const item = colors[index];

        if (item.key !== newKey) {
            const updatedItem = { ...item, key: newKey };
            const updatedList = colors.map((obj, id) => (id === index ? updatedItem : obj));
            setColors(updatedList);
        } else {
            const updatedItem = { ...item, value: newValue };
            const updatedList = colors.map((obj, id) => (id === index ? updatedItem : obj));
            setColors(updatedList);
        }
    }



    const handleAddColor = () => {
        const newElement = { key: 25, value: '#000000' };
        setColors([...colors, newElement])
    }



    const handleApplyColors = () => {

        colors.forEach((item) => {
            let colorAdded = item.value.replace("#", "");
            props.updateClassificationMap(parseInt(item.key), [
              parseInt(colorAdded.substring(0, 2), 16),
              parseInt(colorAdded.substring(2, 4), 16),
              parseInt(colorAdded.substring(4, 6), 16),
            ]);
          });
    }


    useEffect(() => {

        if (props.classificationNumber) {
            props.classificationNumber.forEach(classification => {
                const componentToHex = (c) => {
                    const hex = c.toString(16);
                    return hex.length === 1 ? "0" + hex : hex;
                };
                const array= props.classificationMap.has(classification) ? props.classificationMap.get(classification) : [0, 0, 0]
                const r = componentToHex(array[0]);
                const g = componentToHex(array[1]);
                const b = componentToHex(array[2]);
                setColors((prevColors) => [
                    ...prevColors,
                    { key: classification, value: "#" + r + g + b },
                  ]);
            })
        }
    }, [props.classificationNumber])


    return (
        <div className="bg-blue-900  p-2 mb-4 h-15">
            <h3 className="text-lg font-medium pb-3 text-white">Tipo de color</h3>
            <select
                className="bg-white text-blue-900 px-4 py-2 rounded-full w-auto"
                value={selectedOption}
                onChange={handleOptionSelect}
            >
                <option value="RGB">RGB</option>
                <option value="CLASSIFICATION">CLASSIFICATION</option>
            </select>

            <div className="mt-4">
                <h3 className="text-lg font-medium text-white">Colores de Clasificación</h3>

                {colors.map((item, index) => (
                    <div key={item.key} className="flex items-center mt-2">
                        <input
                            type="number"
                            className="mr-2 px-2 py-1 w-16 border border-gray-300 rounded"
                            value={item.key}
                            onChange={(event) => handleColorChange(index, event.target.value, item.value)}
                        />
                        <input
                            type="color"
                            className="w-8 h-8 rounded"
                            value={item.value}
                            onChange={(event) => handleColorChange(index, item.key, event.target.value)}
                        />
                    </div>
                ))}
                <div className="flex mt-2">
                    <button
                        className="mr-2 px-3 py-1 bg-gray-100 text-blue-900 rounded hover:bg-gray-400"
                        onClick={handleAddColor}
                    >
                        Añadir Color
                    </button>
                    <button
                        className="px-3 py-1 bg-gray-100 text-blue-900 rounded hover:bg-gray-400"
                        onClick={handleApplyColors}
                    >
                        Aplicar
                    </button>
                </div>
            </div>

        </div>
    )
}