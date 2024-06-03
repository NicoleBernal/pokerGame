const express = require('express')
const gameService = require('./services/gameService.js')
const app = express();
const port = 3000
app.use(express.json())


app.get('/jugadores', (req, res) => { 
    const jugadores = gameService.getJugadores()
    console.log(jugadores)
    res.send(jugadores)
})

app.post('/cambiar', (req, res) => {
    const id = req.body.id
    
    if (req.body.cartas === undefined) {
        res.send("No se cambió ninguna carta")
    } else {
        const cartas = req.body.cartas
        const cambios = gameService.realizarCambios(id, cartas)
        res.send(cambios)
    }
   
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
    console.log(`Example app listening at http://localhost:${port}`)
})
