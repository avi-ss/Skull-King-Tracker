const DEFAULT = {
    name: 'Original',
    description: 'El juego original, una ronda de 1, 2, 3, 4, 5, 6, 7, 8, 9 y 10 cartas por mano.',
    rounds: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
    gameSpeed: 'Normal',
    color: 'yellow',
    custom: false,
}

const COUPLE_KEEL = {
    name: 'Quilla Pareja',
    description: 'Dos rondas de 2, 4, 6, 8, y 10 cartas por mano.',
    rounds: [2, 2, 4, 4, 6, 6, 8, 8, 10, 10],
    gameSpeed: 'Medio-Lento',
    color: 'orange',
    custom: false,
}

const AVOID_THE_FIGHT = {
    name: 'Evitar la Pelea',
    description: 'Una ronda de 6, 7, 8, 9, y 10 cartas por mano.',
    rounds: [6, 7, 8, 9, 10],
    gameSpeed: 'Medio',
    color: 'yellow',
    custom: false,
}

const QUICK_AND_SALTY_SKIRMISH = {
    name: 'Escaramuza Rápida y Salada',
    description: 'Cinco ronda de 5 cartas por mano.',
    rounds: [5, 5, 5, 5, 5],
    gameSpeed: 'Rápido',
    color: 'red',
    custom: false,
}

const GUNWALE_PLANK = {
    name: 'Tablón de Borda',
    description: 'Diez rondas de 10 cartas por mano.',
    rounds: [10, 10, 10, 10, 10, 10, 10, 10, 10, 10],
    gameSpeed: 'Muy Lento',
    color: 'blue',
    custom: false,
}

const HURRICANE = {
    name: 'Huracán',
    description: 'Dos rondas de 9, 7, 5, 3 y 1 carta por mano.',
    rounds: [9, 9, 7, 7, 5, 5, 3, 3, 1, 1],
    gameSpeed: 'Variable',
    color: 'green',
    custom: false,
}

const AFTER_BEDTIME = {
    name: 'Tras la Hora de Dormir',
    description: 'Una ronda de 1 carta por mano más un abrazo de buenas noches.',
    rounds: [1],
    gameSpeed: 'Muy Rápido',
    color: 'red',
    custom: false,
}

const CUSTOM = {
    name: 'Customizado',
    description: '¡Tú eliges el numero de rondas y las cartas por mano!',
    gameSpeed: 'Variable',
    color: 'green',
    custom: true,
}

export const PRESETS = [
    CUSTOM,
    DEFAULT,
    COUPLE_KEEL,
    AVOID_THE_FIGHT,
    QUICK_AND_SALTY_SKIRMISH,
    GUNWALE_PLANK,
    HURRICANE,
    AFTER_BEDTIME,
]