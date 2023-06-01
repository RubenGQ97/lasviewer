
/**
 *  
 *  Clasificación 0: Puntos sin clasificar.
    Clasificación 1: Terreno (suelo).
    Clasificación 2: Vegetación.
    Clasificación 3: Estructuras de construcción.
    Clasificación 4: Objetos artificiales.
    Clasificación 5: Puntos de agua.
    Clasificación 6: Superficies del suelo no clasificadas.
    Clasificación 7: Clasificación de baja vegetación.
    Clasificación 8: Clasificación de arbustos.
    Clasificación 9: Clasificación de medianos árboles.
    Clasificación 10: Clasificación de árboles altos.
    Clasificación 11: Edificios.
    Clasificación 12: Superficies de carreteras.
    Clasificación 13: Vías ferroviarias.
    Clasificación 14: Puntos de estructuras puente.
    Clasificación 15: Puntos de muelles, atracaderos y pilotes.
    Clasificación 16: Vegetación en suspensión.
    Clasificación 17: Ruido.
 */

const CLASSIFICATION_MAP = new Map([
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
]);


const toRgb=(arrayColor)=>{
    const rgb = new Uint8Array(arrayColor.length / 4 * 3);
    for (let i = 0, j = 0; i < arrayColor.length; i += 4, j += 3) {
      rgb[j] = arrayColor[i];
      rgb[j + 1] = arrayColor[i + 1];
      rgb[j + 2] = arrayColor[i + 2];
    }
    return rgb
  }

  const classificationToColor=(arrayClassification)=>{
    let color = [];
    arrayClassification.forEach(clasificacion => {
      if(clasificacion>17 || clasificacion<0){
        color.push.apply(color,[255,255,255])
      }else{
        color.push.apply(color,CLASSIFICATION_MAP.get(clasificacion))
      }
    });
    return Uint8Array.from(color)
  }


export {toRgb,classificationToColor}