/**
 *  2C = Two of Clubs
 *  2D = Two of Diaminds
 *  2H = Two of Hearts
 *  2S = Two of Spades
 * 
 */



let _;

if (typeof window !== "undefined" && window._) {
    // Estamos en el navegador (ya cargamos Underscore.js en index.html)
    _ = window._;
} else {
    // Estamos en Node.js (usamos Lodash)
    _ = require('lodash');
}



let deck = [];
const tipos = ['C','D','H','S'];
const especiales = ['A','J','Q','K'];


let puntosJugador = 0, 
    puntosComputadora = 0;

// REFERENCIAS DEL HTML

const btnPedir = document.querySelector('#btnPedir');


// Esta función crea un nuevo deck
const crearDeck = () => {

    for(let i = 2; i <= 10; i++){
        for( let tipo of tipos){
            deck.push(i + tipo);
        }

    }

    for (let tipo of tipos){
        for(let esp of especiales){
            deck.push(esp + tipo);
        }
    }

    // console.log( deck );
    deck = _.shuffle( deck );
    console.log( deck );
    return deck;
}


crearDeck();



// Esta función me permite tomar una carta

// const pedirCarta = () =>{
//     let cartaElegida = deck.pop();
//     deck = deck.filter(carta => carta !== cartaElegida);
//     console.log(cartaElegida);
//     console.log(deck);
    
// }

const pedirCarta = () =>{
      
    if( deck.length === 0){
        throw 'No hay cartas en el deck';
    }

    const carta = deck.pop();
    return carta;    
}

const valorCarta = (carta) =>{

    const valor = carta.substring(0,carta.length-1);
    return( isNaN (valor) ) ?
            (valor === 'A') ? 11 : 10
            : valor * 1;
}



// Eventos

// una funcion que se envia como argumento callback
btnPedir.addEventListener('click', () =>
    {
        const carta = pedirCarta();
        puntosJugador = puntosJugador + valorCarta(carta);
        console.log(puntosJugador);
        document.querySelector('#numeroJ1').innerText = puntosJugador;
    })
    

