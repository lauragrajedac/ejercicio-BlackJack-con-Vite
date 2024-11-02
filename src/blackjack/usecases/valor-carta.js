
/**
 * Esta función da el valor en número de cualquier carta
 * @param {String} carta Ejemplo: 'AJ'
 * @returns {Number} regresa el valor numérico de la carta
 */

export const valorCarta = ( carta ) => {

    const valor  =  carta.substring(0,carta.length-1);

    return ( isNaN( valor ) ) ? 
            ( valor === 'A' ) ? 11 : 10 
            : valor * 1 ;
}