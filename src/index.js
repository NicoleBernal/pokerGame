const express = require('express');
const gameService = require('./services/gameService.js')
const playerService = require('./services/playerService.js');
const app = express();
const port = 3000;
app.use(express.json())


const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');
app.use(bodyParser.json());

// //Creando cards.json
// const fileCards = path.join(__dirname, '/cards.json');
// const valor = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'];
// const palo = ['trebol', 'diamante','corazon','picas'];

// if (!fs.existsSync(fileCards)) {
//     const cards = [];
//     for (const v of valor) {
//         for (const p of palo) {
//             cards.push({ id: cards.length + 1, valor: v, palo: p, disponibilidad: true });
//         }
//     }
//     fs.writeFileSync(fileCards, JSON.stringify(cards, null, 2), 'utf8');
//     console.log("Archivo cards.json creado.");
//     console.log(cards);
//     return;
// }

// fs.readFile(fileCards, 'utf8', (err, data) => {
//     if (err) {
//         console.log("Error leyendo el archivo");
//         res.status(500).send('Error leyendo el archivo');
//         return;
//     }
//     const cards = JSON.parse(data);
// });

console.log("Bienvenido al juego de poker")
console.log("Para iniciar el juego, por favor ingrese su nombre")

app.post('/inicio', playerService.showBeginning);

app.get('/cartas/:id',playerService.getCards);

app.get('/jugadores', (req, res) => { 
    const jugadores = gameService.getJugadores()
   
    res.send(jugadores)
})

app.post('/cambiar', (req, res) => {
    const id = req.body.id
    const cartas = req.body.cartas
    const cambios = gameService.realizarCambios(id, cartas)
    res.send(cambios)
})

app.get('/estado', (req, res) => { 
    const estado = gameService.estadoJuego()
    res.send(estado)
})

app.listen(port, () => {
    console.log(`Server escuchando en el puerto: ${port}`);
});



