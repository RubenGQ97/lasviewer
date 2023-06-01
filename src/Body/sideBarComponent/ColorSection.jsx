import React from 'react'
import { useState } from 'react';

export default function ColorSection(props) {
    const [selectedOption, setSelectedOption] = useState(0);

    const handleOptionSelect = (event) => {
        setSelectedOption(event.target.value);
        props.changeColorType(event.target.value)
    };

    return (
        <div className="bg-blue-900 p-2 mb-4 h-15">
            <select
                className="bg-white text-blue-900 px-4 py-2 rounded-full w-auto"
                value={selectedOption}
                onChange={handleOptionSelect}
            >
                <option value="RGB">RGB</option>
                <option value="CLASSIFICATION">CLASSIFICATION</option>
            </select>
        </div>
    )
}