const express = require('express');
const gameService = require('./services/gameService.js')
const playerService = require('./services/playerService.js');
const app = express();
const port = 3000;
app.use(express.json())


const bodyParser = require('body-parser');
app.use(bodyParser.json());

console.log("Bienvenido al juego de poker")
console.log("Para iniciar el juego, por favor ingrese su nombre")

app.post('/inicio', playerService.showBeginning);
app.get('/cartas/:id', playerService.getCards);
app.get('/jugadores',gameService.getJugadores);
app.post('/cambiar', gameService.realizarCambios);
app.get('/estado', gameService.estadoJuego);

app.listen(port, () => {
    console.log(`Server escuchando en el puerto: ${port}`);
});



