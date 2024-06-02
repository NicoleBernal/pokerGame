const express = require('express');
const app = express();
const port = 3000;
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
const controller = require('./controllers/controller');

app.use(bodyParser.json()); // Middleware para parsear JSON

// Configurar la ruta
app.post('/inicio', controller.showBeginning);
app.get('/cartas/:id',controller.getCards)

app.listen(port, () => {
    console.log(`Server escuchando en el puerto: ${port}`);
});
