
// Patron modulo

(() => {

    'use strict'


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

    const btnNuevo = document.querySelector('#btnNuevo');
    const btnPedir = document.querySelector('#btnPedir');
    const btnDetener = document.querySelector('#btnDetener');

    const divCartasJugador = document.querySelector('#jugador-cartas');
    const divCartasComputadora = document.querySelector('#computadora-cartas');


    const puntosHtml = document.querySelectorAll('small');




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
        return deck;
    }


    crearDeck();





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


    btnPedir.addEventListener('click', () =>
        {
            
            const carta = pedirCarta();
            
            puntosJugador = puntosJugador + valorCarta(carta);
            puntosHtml[0].innerText = puntosJugador;
        
            // <img class="carta" src="assets/cartas/10C.png" alt="">

            const imgCarta = document.createElement('img');
            imgCarta.src = `assets/cartas/${carta}.png`;
            imgCarta.classList.add("carta")
            divCartasJugador.append( imgCarta);

            if(puntosJugador > 21){
                console.warn("Perdiste cojudo");
                btnPedir.disabled = true;
                btnDetener.disabled = true;
                turnoComputadora(puntosJugador);
            } else if(puntosJugador === 21) {
                console.warn("21, genial");
                btnPedir.disabled = true;
                btnDetener.disabled = true;
                turnoComputadora(puntosJugador);
            }


        })
        


    // Turno de la computadora

    const turnoComputadora = ( puntosMinimos) => {
    
            do {
            const carta = pedirCarta();
            
            puntosComputadora = puntosComputadora + valorCarta(carta);
            puntosHtml[1].innerText = puntosComputadora;
        
            // <img class="carta" src="assets/cartas/10C.png" alt="">

            const imgCarta = document.createElement('img');
            imgCarta.src = `assets/cartas/${carta}.png`;
            imgCarta.classList.add("carta")
            divCartasComputadora.append( imgCarta);

            if(puntosMinimos > 21){
                break;
            }

            } while( (puntosComputadora < puntosMinimos) && (puntosMinimos <= 21));

            setTimeout(() => {
                if( puntosComputadora === puntosMinimos) {
                    alert("Nadie gana :(");
                } else if( puntosMinimos > 21){
                    alert("Computadora gana");
                } else if( puntosComputadora > 21){
                    alert("Jugador Gana");
                } else {
                    alert("Computadora Gana");
                }
                }, 100);

    }
        

    btnDetener.addEventListener('click', () =>
        {
            btnPedir.disabled = true;
            btnDetener.disabled = true;
            

            turnoComputadora( puntosJugador);
        });



    btnNuevo.addEventListener('click', () => {

        console.clear();
        deck = [];
        deck = crearDeck();
        puntosJugador = 0;

        puntosComputadora = 0;

        puntosHtml[0].innerText = 0;
        puntosHtml[1].innerText = 0;

        divCartasComputadora.innerHTML = '';
        divCartasJugador.innerHTML = '';

        btnPedir.disabled = false;
        btnDetener.disabled = false;
    })
    
})();



