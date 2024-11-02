import { pedirCarta } from "./";

/**
 * turno de la computadora
 * @param {Number} puntosMinimos puntos minimos que la computadora necesita para ganar
 * @param {Array<string>} deck
 */


const turnoComputadora = ( puntosMinimos, deck ) => {
    puntosMinimos=puntosJugadores[0]
    do{
        const carta= pedirCarta(deck);
        puntosJugadores[1]=acumularPuntos(carta,puntosJugadores.length-1);

        agregarCarta(carta,puntosJugadores.length-1);

        if( puntosMinimos > 21 ){
            break;
        }
    } while( (puntosJugadores[1] < puntosMinimos )  && ( puntosMinimos <= 21 ) );

    determinarGanador();

} 
