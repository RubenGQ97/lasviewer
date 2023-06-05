import React from 'react'


export default function Information(props) {
    return (
        <div className="bg-blue-900 p-5 mb-4 h-50">
            <h2 className="text-xl text-center font-medium text-white">Información</h2>
            <div className="text-white mt-4">
                <p>
                    <span className="font-bold">Nombre del archivo:</span> {props.fileName}
                </p>
                <p>
                    <span className="font-bold">Versión del archivo:</span> {
                        props.datos == "" ? "" :
                    props.datos.versionAsString ? props.datos.versionAsString : "1.2" 
                    }
                </p>
                <p>
                    <span className="font-bold">Versión del formato:</span> {props.datos.pointsFormatId}
                </p>
                <p>
                    <span className="font-bold">Número total de puntos:</span> {props.datos.pointsCount}
                </p>
                <p>
                    <span className="font-bold">Escala:</span> {props.datos.scale ? "[ "+props.datos.scale[0]+", "+props.datos.scale[1]+", "+props.datos.scale[2]+" ]" : ""}
                </p>
            </div>
        </div>
    )
}