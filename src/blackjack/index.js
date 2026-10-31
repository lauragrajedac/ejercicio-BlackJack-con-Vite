import { valorCarta, crearDeck, pedirCarta } from "./usecases";

const miJava = (() => {
  "use strict";

  let deck = [];
  const tipos = ["C", "D", "H", "S"],
    especiales = ["A", "J", "Q", "K"];

  // let puntosJugador = 0,
  //     puntosComputadora=0;
  let puntosJugadores = [];

  // para agregar info en un array desk.push ( i + 'C');
  // Referencias al HTML, esto para agilizar la lectura de datos y no se recorra todo el documento cada que se requiere hacer algo
  const btnPedir = document.querySelector("#btnPedir"),
    btnNuevo = document.querySelector("#btnNuevo"),
    btnDetener = document.querySelector("#btnDetener");

  let divPuntosHtml = document.querySelectorAll(".divSmall"),
    divCartasJugadores = document.querySelectorAll(".divCarta");

  deck = crearDeck(tipos, especiales);

  //Esta funcioninicializa el juego
  const inicializarJuego = (numJugadores = 2) => {
    deck = crearDeck(tipos, especiales);
    puntosJugadores = [];
    for (let i = 0; i < numJugadores; i++) {
      puntosJugadores.push(0);
      divPuntosHtml[i].innerText = 0;
      divCartasJugadores[i].innerHTML = "";
    }

    btnPedir.disabled = false;
    btnDetener.disabled = false;
    return deck;
  };

  //Turno 0 = primer jugador y el último será la computadora
  const acumularPuntos = (carta, turno) => {
    puntosJugadores[turno] = puntosJugadores[turno] + valorCarta(carta);
    divPuntosHtml[turno].innerText = puntosJugadores[turno];
    return puntosJugadores[turno];
  };
  const agregarCarta = (carta, turno) => {
    const imgCarta = document.createElement("img");
    imgCarta.src = `${import.meta.env.BASE_URL}/assets/cartas/${carta}.png`;
    imgCarta.classList.add("carta");
    divCartasJugadores[turno].append(imgCarta);
  };
  const mostrarModal = (titulo, mensaje) => {
    const modal = document.querySelector("#modalResultado");
    const modalTitulo = document.querySelector("#modalTitulo");
    const modalMensaje = document.querySelector("#modalMensaje");

    modalTitulo.innerText = titulo;
    modalMensaje.innerText = mensaje;
    modal.classList.remove("hidden");
  };

  // Evento para cerrar el modal al dar clic en el botón y reiniciar o continuar
  document.querySelector("#btnCerrarModal")?.addEventListener("click", () => {
    document.querySelector("#modalResultado").classList.add("hidden");

    // Reinicia el juego automáticamente al cerrar el aviso
    inicializarJuego();
  });

  const determinarGanador = () => {
    const [puntosJugador, puntosComputadora] = puntosJugadores;
    setTimeout(() => {
      if (puntosJugador > 21) {
        mostrarModal("¡Derrota!", "Te ganaron Perro");
      } else if (puntosJugador === 21 && puntosComputadora != 21) {
        mostrarModal("¡Victoria!", "21 GANASTE");
      } else if (puntosJugador === 21 && puntosComputadora == 21) {
        mostrarModal("¡Empate!", "21 GANARON LOS DOS");
      } else if (puntosJugador > puntosComputadora) {
        mostrarModal("¡Victoria!", "Felicidades GANASTE");
      } else if (puntosComputadora === puntosJugador) {
        mostrarModal("¡Empate!", "EMPATE pfff los dos son muy malos");
      } else if (puntosJugador < puntosComputadora && puntosComputadora <= 21) {
        mostrarModal("¡Derrota!", "Sorry PERDISTE y FEO!!!");
      } else if (
        puntosJugador < puntosComputadora &&
        puntosComputadora > 21 &&
        puntosJugador <= 21
      ) {
        mostrarModal("¡Victoria!", "Bien ganado!!!");
      } else if (puntosJugador > puntosComputadora && puntosComputadora <= 21) {
        mostrarModal("¡Victoria!", "Felicidades GANASTE");
      } else {
        mostrarModal("¡Derrota!", "Eres un Perdedor :P");
      }
    }, 100);
  };
  //turno de la computadora
  const turnoComputadora = (puntosMinimos) => {
    puntosMinimos = puntosJugadores[0];
    do {
      const carta = pedirCarta(deck);
      puntosJugadores[1] = acumularPuntos(carta, puntosJugadores.length - 1);

      agregarCarta(carta, puntosJugadores.length - 1);

      if (puntosMinimos > 21) {
        break;
      }
    } while (puntosJugadores[1] < puntosMinimos && puntosMinimos <= 21);

    determinarGanador();
  };

  //Eventos

  btnPedir.addEventListener("click", () => {
    const carta = pedirCarta(deck);
    puntosJugadores[0] = acumularPuntos(carta, 0);
    agregarCarta(carta, 0);

    if (puntosJugadores[0] > 21) {
      console.warn("Lo siento mucho perdiste");
      btnPedir.disabled = true;
      btnDetener.disabled = true;
      turnoComputadora(puntosJugadores);
    } else if (puntosJugadores[0] === 21) {
      console.warn("21 genial");
      btnPedir.disabled = true;
      btnDetener.disabled = true;
      turnoComputadora(puntosJugadores);
    }
  });

  btnDetener.addEventListener("click", () => {
    btnPedir.disabled = true;
    btnDetener.disabled = true;
    turnoComputadora(puntosJugadores[0]);
  });

  btnNuevo.addEventListener("click", () => {
    inicializarJuego();
  });

  return {
    nuevoJuego: inicializarJuego,
  };
})();
