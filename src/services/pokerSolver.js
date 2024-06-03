const pokerSolver = (cartas) => { 
    cartas.sort((a, b) => valorCarta(a) - valorCarta(b));
    console.log(cartas)
    if (sonMismoPalo(cartas) && sonConsecutivas(cartas) && Number(cartas[0].valor) === 10) {
        return clasificaciones['Escalera Real']
    } else if (sonConsecutivas(cartas) && sonMismoPalo(cartas)) {
        return clasificaciones['Escalera de Color']
    } else if (esPoker(cartas)) {
        return clasificaciones['Poker']
    } else if (esFull(cartas)) {
        return clasificaciones['Full']
    } else if (sonMismoPalo(cartas)) {
        return clasificaciones['Color']
    } else if (sonConsecutivas(cartas)) {
        return clasificaciones['Escalera']
    } else if (esTrio(cartas)) {
        return clasificaciones['Trio']
    } else if (esDoblePareja(cartas)) {
        return clasificaciones['Doble Pareja']
    } else if (esPareja(cartas)) {
        return clasificaciones['Pareja']
    } else {
       
        return cartas.map(carta => valorCarta(carta)).reduce((max, valor) => {
            return max > valor ? max : valor
        })
    }
}

const sonMismoPalo = (cartas) =>{
    return cartas.every(carta => carta.palo === cartas[0].palo)
}

const sonConsecutivas = (cartas) => {
    const valores = cartas.map(carta => valorCarta(carta)).sort((a, b) => a - b);
    for (let i = 0; i < valores.length - 1; i++) {
        if (valores[i + 1] !== valores[i] + 1) {
            return false;
        }
    }
    return true;
}

const valoresUnicos = (cartas) => {
    const valores = cartas.map(carta => carta.valor)
    const valoresUnicos = [...new Set(valores)]
    return valoresUnicos
}

const esPareja = (cartas) => {
    if (valoresUnicos(cartas).length === 4) {
        return true
    }
}
const esDoblePareja = (cartas) => {
    if (valoresUnicos(cartas).length === 3 &&
        valoresUnicos(cartas).some(valor => cartas.filter(carta => carta.valor === valor).length === 2)) {
       return true
   }
}

const esTrio = (cartas) => {
    if (valoresUnicos(cartas).length === 3) {
        return cartas.some(carta => 
            cartas.filter(c => c.valor === carta.valor).length === 3
        );
    }
    return false;
}

const esFull = (cartas) => {
    const valores = valoresUnicos(cartas);
    if (valores.length === 2 && cartas.some(carta => cartas.filter(c => c.valor === carta.valor).length === 3)) {
        return true;
    }
    return false;
}


const esPoker = (cartas) => {
    const valores = cartas.map(carta => carta.valor)
    return valores.some(valor => valores.filter(v => v === valor).length === 4)
}

const valorCarta = (carta) => {
    const valores = {
        'A': 14, 'K': 13, 'Q': 12, 'J': 11, '10': 10, '9': 9,
        '8': 8, '7': 7, '6': 6, '5': 5, '4': 4, '3': 3, '2': 2
    };
    return valores[carta.valor];
}

const clasificaciones = {
    'Escalera Real': 23, 'Escalera de Color': 22, 'Poker': 21, //good
    'Full': 20,  'Color': 19,'Escalera': 18, //good
    'Trio': 17, 'Doble Pareja': 16, 'Pareja': 15 //good
}

module.exports = pokerSolver;