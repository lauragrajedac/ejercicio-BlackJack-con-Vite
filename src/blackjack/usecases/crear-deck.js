
import _ from 'underscore';

// cuando se usa la palabra exporte es una exportación
// independiente

/**
 * Esta función crea un nuevo deck
 * @param {Array<String>} tiposDeCartas  Ejemplo:  ['C','D','H','S']
 * @param {Array<String>} tiposEspeciales Ejemplo:  ['A','J','Q','K']
 * @returns {Array<String>}  retorna un nuevo deck de cartas
 */
export const crearDeck = (tiposDeCartas, tiposEspeciales) => {

    if ( !tiposDeCartas || tiposDeCartas.lenght === 0) throw new Error('tiposDeCartas es obligatorio, como un arreglo de string');
    if ( !tiposEspeciales || tiposEspeciales.lenght ) throw new Error('tiposEspeciales es obligatorio, como un arreglo de string');
    

    let deck = [];
    for ( let i =2; i<=10 ; i++) {
        for (let tipo of tiposDeCartas){
            deck.push ( i + tipo);
        }
    }
    for (let tipo of tiposDeCartas){
        for (let especial of tiposEspeciales){
            deck.push( especial+ tipo);
        }
    }
    return _.shuffle( deck);
}
export const a = () => {console.log('Hola Mundo,esta función se exporto de forma por default');
}
