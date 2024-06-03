const gameService = require('./gameService.js');
const baraja = require('../cards.json');
const jugadores = gameService.getJugadores();

exports.showBeginning = (req, res) => {
  
    const { name } = req.body;

    // Verificar el máximo de jugadores
    if (jugadores.length >= 4) {
        res.send("Máximo de jugadores alcanzado");
        return;
    }

    const newPlayer = {
        id: jugadores.length ? jugadores[jugadores.length - 1].id + 1 : 1,
        name: name.trim(),
        cartas: [],
        cambios: 0
    };

    // Verificar que haya cartas disponibles
    const availableCards = baraja.filter(card => card.disponibilidad);
    if (availableCards.length < 6) {
        res.status(500).send('No hay suficientes cartas disponibles');
        return;
    }

    // Seleccionar 6 cartas al azar
    const selectedCards = [];
    for (let i = 0; i < 5; i++) {
        let randomIndex;
        let attempts = 0;
        do {
            randomIndex = Math.floor(Math.random() * baraja.length);
            attempts++;
            if (attempts > baraja.length) {
                res.status(500).send('No hay suficientes cartas disponibles');
                return;
            }
        } while (!baraja[randomIndex].disponibilidad); // Asegurarse de seleccionar una carta disponible

        baraja[randomIndex].disponibilidad = false; // Marcar la carta como no disponible
        selectedCards.push(baraja[randomIndex]);
    }

    // Asignar las cartas seleccionadas al nuevo jugador
    newPlayer.cartas = selectedCards;
    jugadores.push(newPlayer);
    res.status(201).send('Jugador guardado exitosamente');
}

    exports.getCards = (req, res) => {
        const playerId = parseInt(req.params.id);
        const jugador = jugadores.find(jugador => jugador.id === playerId)
        res.send(jugador.cartas)
    
    }
