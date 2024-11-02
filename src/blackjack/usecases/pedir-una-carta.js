

/**
 * Este funcion me permite tomar una carta
 * @param {Array<string>} deck 
 * @returns  El deck menos la ultima carta
 */

export const pedirCarta = (deck) => {

    if ( !deck || deck.length === 0 ){
    throw ' No hay más cartas en el deck';
    }
    return deck.pop();
}