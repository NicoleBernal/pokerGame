const jugadores = require('./jugadores.json')
const baraja = require('./cartas.json')

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
            return "juego finalizado"
        } else {
            return cambiosRealizados
        }
    }
}

const realizarCambios = (id, cartas) => {
    const cambiosCompletos = getCambiosJugador(id) === 2 ? true : false
    if (cambiosCompletos === true) {
        return "Ya has hecho todos los cambios"
    } else {
        cambiarCartas(id, cartas)

        const jugador = jugadores.find(jugador => jugador.id === id)
        jugador.cambios = jugador.cambios + 1
        return "Cambio realizado" 
    }
}


const cambiarCartas = (id, cartas) => {
    if (cartas.length > 0 && cartas.length <= 3) {
        const nuevasCartas = [];
        const jugador = jugadores.find(jugador => jugador.id === id)
        for (let i = 0; i < cartas.length; i++) { 
            const nuevaCarta = getCartaAleatoria()

            nuevasCartas.push(nuevaCarta)
            console.log(nuevaCarta)

            const index = jugador.cartas.findIndex(carta => carta.valor === cartas[i].valor && carta.palo === cartas[i].palo);
            jugador.cartas[index].palo = nuevaCarta.palo
            jugador.cartas[index].valor = nuevaCarta.valor

            const indexBaraja = baraja.findIndex(carta => carta.valor === nuevaCarta.valor && carta.palo === nuevaCarta.palo);
            baraja[indexBaraja].disponible = false;
        }

        cartas.forEach(carta => {
            const indexBaraja = baraja.findIndex(cartaBaraja => cartaBaraja.valor === carta.valor && cartaBaraja.palo === carta.palo);
            baraja[indexBaraja].disponible = true;
        }) 
        console.log(nuevasCartas)
        console.log(jugador.cartas)
        return nuevasCartas
    } else {
        return "Debes cambiar 3 cartas"
    }

}

const getCartaAleatoria = () => {
    let randomIndex;
    let carta;
    
    do {
        randomIndex = Math.floor(Math.random() * baraja.length);
        carta = baraja[randomIndex];
    } while (!carta.disponible);

    return carta;
}

const getCambiosJugador = (id) => {
    const jugador = jugadores.find(jugador => jugador.id === id)
    return jugador.cambios
}

const getJugadores = () => {
    return jugadores;
};
module.exports = { estadoJuego, realizarCambios, getJugadores, getCartaAleatoria };