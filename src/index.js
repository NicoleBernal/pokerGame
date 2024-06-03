const express = require('express');
const app = express();
const port = 3000;
const gameService = require('./services/gameService.js')
app.use(express.json())

const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');

//Creando cards.json
const fileCards = path.join(__dirname, '/cards.json');
const valor = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'];
const palo = ['trebol', 'diamante','corazon','picas'];

if (!fs.existsSync(fileCards)) {
    const cards = [];
    for (const v of valor) {
        for (const p of palo) {
            cards.push({ id: cards.length + 1, valor: v, palo: p, disponibilidad: true });
        }
    }
    fs.writeFileSync(fileCards, JSON.stringify(cards, null, 2), 'utf8');
    console.log("Archivo cards.json creado.");
    console.log(cards);
    return;
}

fs.readFile(fileCards, 'utf8', (err, data) => {
    if (err) {
        console.log("Error leyendo el archivo");
        res.status(500).send('Error leyendo el archivo');
        return;
    }
    const cards = JSON.parse(data);
    console.log(cards);
});

// Importar el controlador
const playerService = require('./services/playerService.js');

app.use(bodyParser.json()); // Middleware para parsear JSON

// Configurar la ruta
app.post('/inicio', playerService.showBeginning);

app.get('/cartas/:id',playerService.getCards);

app.get('/jugadores', (req, res) => { 
    const jugadores = gameService.getJugadores()
    console.log(jugadores)
    res.send(jugadores)
})

app.post('/cambiar', (req, res) => {
    const id = req.body.id
    const cartas = req.body.cartas
    const cambios = gameService.realizarCambios(id, cartas)
    res.send(cambios)
})

app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.get('/estado', (req, res) => { 
    const estado = gameService.estadoJuego()
    res.send(estado)
})

app.get('/cartaAleatoria', (req, res) => {
    const carta = gameService.getCartaAleatoria()
    res.send(carta)
})

app.listen(port, () => {
    console.log(`Server escuchando en el puerto: ${port}`);
});



