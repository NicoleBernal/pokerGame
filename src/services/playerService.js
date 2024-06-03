const fs = require('fs');
const path = require('path');
const filePlayers = path.join(__dirname, '../players.json');
const fileCards = path.join(__dirname, '../cards.json');

exports.showBeginning = (req, res) => {
    console.log("HOLA");
    const { name } = req.body;

    // Crear archivo players.json si no existe
    if (!fs.existsSync(filePlayers)) {
<<<<<<< HEAD
        fs.writeFileSync(filePlayers, JSON.stringify([], null, 2), 'utf8');
        console.log("Archivo players.json creado.");
    }

    // Leer archivo players.json
    fs.readFile(filePlayers, 'utf8', (err, playerData) => {
=======
        const initialData = [];
        // Crea el archivo con un arreglo vacío si no existe
    
        fs.writeFileSync(filePlayers, JSON.stringify(initialData, null, 2), 'utf8');
       
        console.log("Archivo players.json creado.");
    }
   
    fs.readFile(filePlayers, 'utf8', (err, data) => {
>>>>>>> 5963a00c2df562890ca726bc559e6d32e36f6293
        if (err) {
            console.log("Error leyendo el archivo players.json");
            res.status(500).send('Error leyendo el archivo');
            return;
        }

        console.log("Archivo players.json leído correctamente");
        let players = JSON.parse(playerData);

        // Verificar el máximo de jugadores
        if (players.length >= 4) {
            res.send("Máximo de jugadores alcanzado");
            return;
        }

        const newPlayer = {
            id: players.length ? players[players.length - 1].id + 1 : 1,
            name: name.trim(),
            cartas: [],
            cambios: 0
        };

        // Leer archivo cards.json
        fs.readFile(fileCards, 'utf8', (err, cardData) => {
            if (err) {
                console.log("Error leyendo el archivo cards.json");
                res.status(500).send('Error leyendo el archivo de cartas');
                return;
            }

            console.log("Archivo cards.json leído correctamente");
            let cards = JSON.parse(cardData);
            
            console.log("LLEGOOO 1")
            // Seleccionar 6 cartas al azar
            const selectedCards = [];
            for (let i = 0; i < 6; i++) {
                let randomIndex;
                do {
                    randomIndex = Math.floor(Math.random() * cards.length);
                    console.log("HAGO 1")
                } while (!cards[randomIndex].disponibilidad); // Asegurarse de seleccionar una carta disponible

                cards[randomIndex].disponibilidad = false; // Marcar la carta como no disponible
                selectedCards.push(cards[randomIndex]);
            }
            

            // Asignar las cartas seleccionadas al nuevo jugador
            newPlayer.cartas = selectedCards;
            players.push(newPlayer);
            // Guardar las actualizaciones en cards.json
            fs.writeFile(fileCards, JSON.stringify(cards, null, 2), (err) => {
                if (err) {
                    res.status(500).send('Error actualizando el archivo de cartas');
                    return;
                }

                console.log("Archivo cards.json actualizado correctamente");

                // Guardar las actualizaciones en players.json
                fs.writeFile(filePlayers, JSON.stringify(players, null, 2), (err) => {
                    if (err) {
                        res.status(500).send('Error guardando el jugador');
                        return;
                    }
                    console.log("Jugador guardado exitosamente");
                    res.status(201).send('Jugador guardado exitosamente');
                });
            });
        });
    });
};


exports.getCards = (req, res) => {
    const playerId = parseInt(req.params.id);

    fs.readFile(filePlayers, 'utf8', (err, playerData) => {
        if (err) {
            console.log("Error leyendo el archivo players.json");
            res.status(500).send('Error leyendo el archivo de jugadores');
            return;
        }
        let players = JSON.parse(playerData);
        let player = players.find(p => p.id === playerId);
        if (!player) {
            res.status(404).send('Jugador no encontrado');
            return;
        }
        res.send(player.cartas);
        

           
        });
    
};
