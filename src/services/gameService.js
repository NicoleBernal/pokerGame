const pokerSolver  = require('./pokerSolver.js') 
const fs = require('fs');
const path = require('path');
const jugadores = path.join(__dirname, '../players.json');
const baraja = path.join(__dirname, '../cards.json');

const estadoJuego = () => {
    const cantidadJugadores = jugadores.length
    console.log(cantidadJugadores)
    if (cantidadJugadores < 4) {
        return "esperando jugadores"
    } else if (cantidadJugadores === 4) {

        const cambiosRealizados = jugadores.map(jugador => {
            return {
                nombre: jugador.nombre,
                cambios: jugador.cambios
            }
        })
        const todosHanHechoDosCambios = cambiosRealizados.every(jugador => jugador.cambios === 2);
        if (todosHanHechoDosCambios) {
            console.log("el ganador")
            return `El juego ha finalizado, el ganador es ${getGanador()}`
        } else {
            return cambiosRealizados
        }
    }
}

const getGanador = () => {
    const puntajes = jugadores.map(jugador => {
        return {
            nombre: jugador.nombre,
            puntaje: pokerSolver(jugador.cartas.sort((a, b) => a.valor - b.valor))
        }
    })
    console.log(puntajes)
    const ganador = puntajes.reduce((max, jugador) => {
        return max.puntaje > jugador.puntaje ? max : jugador
    })
    console.log(ganador)
    return ganador.nombre + " con " + ganador.puntaje
}



const realizarCambios = (id, cartas) => {
    
    const cambiosCompletos = getCambiosJugador(id) === 2 ? true : false
    if (cambiosCompletos === true) {
        return "Ya has hecho todos los cambios"
    }
    else if (cartas.length > 3) {
        return "Debes cambiar 3 cartas"
    }
    else {
        cambiarCartas(id, cartas)
        return "Cambio realizado"
    }
}


const cambiarCartas = (id, cartas) => {
    if (cartas.length > 0 && cartas.length <= 3) {
        console.log("1")
        const nuevasCartas = [];
        const jugador = jugadores.find(jugador => jugador.id === id)

        for (let i = 0; i < cartas.length; i++) { 
            const nuevaCarta = getCartaAleatoria();

            nuevasCartas.push(nuevaCarta);
            console.log("2")

            let indexCarta = jugador.cartas.findIndex(carta => carta.id === cartas[i].id);
            
            if (indexCarta !== -1) {
                jugador.cartas[indexCarta].id = nuevaCarta.id;
                jugador.cartas[indexCarta].palo = nuevaCarta.palo;
                jugador.cartas[indexCarta].valor = nuevaCarta.valor;
                baraja.find(carta => carta.id === nuevaCarta.id).disponibilidad = false;
            }
        }

        cartas.forEach(carta => {
            const cartaEnBaraja = baraja.find(c => c.id === carta.id);
            if (cartaEnBaraja) {
                cartaEnBaraja.disponibilidad = true;
            }
        });

        jugador.cambios += 1;
        console.log("8")
        return nuevasCartas
    } else {
        return "Debes cambiar 3 cartas"
    }

}

const getCartaAleatoria = () => {
    let cartaAleatoria;
    do {
        const idAleatorio = Math.floor(Math.random() * baraja.length) + 1;
        cartaAleatoria = baraja.find(carta => carta.id === idAleatorio);
    } while (!cartaAleatoria.disponibilidad);
    
    return cartaAleatoria;
}

const getCambiosJugador = (id) => {
    const jugador = jugadores.find(jugador => jugador.id === id)
    return jugador.cambios
}

const getJugadores = () => {
    return jugadores
};
module.exports = { estadoJuego, realizarCambios, getJugadores, getCartaAleatoria };