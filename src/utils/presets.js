const DEFAULT = {
    name: 'gameMode.original.name',
    description: 'gameMode.original.description',
    rounds: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
    gameSpeed: 'gameSpeed.normal',
    color: 'yellow',
    custom: false,
}

const COUPLE_KEEL = {
    name: 'gameMode.coupleKeel.name',
    description: 'gameMode.coupleKeel.description',
    rounds: [2, 2, 4, 4, 6, 6, 8, 8, 10, 10],
    gameSpeed: 'gameSpeed.mediumSlow',
    color: 'orange',
    custom: false,
}

const AVOID_THE_FIGHT = {
    name: 'gameMode.avoidTheFight.name',
    description: 'gameMode.avoidTheFight.description',
    rounds: [6, 7, 8, 9, 10],
    gameSpeed: 'gameSpeed.medium',
    color: 'yellow',
    custom: false,
}

const QUICK_AND_SALTY_SKIRMISH = {
    name: 'gameMode.quickAndSaltySkirmish.name',
    description: 'gameMode.quickAndSaltySkirmish.description',
    rounds: [5, 5, 5, 5, 5],
    gameSpeed: 'gameSpeed.fast',
    color: 'red',
    custom: false,
}

const GUNWALE_PLANK = {
    name: 'gameMode.gunwalePlank.name',
    description: 'gameMode.gunwalePlank.description',
    rounds: [10, 10, 10, 10, 10, 10, 10, 10, 10, 10],
    gameSpeed: 'gameSpeed.verySlow',
    color: 'blue',
    custom: false,
}

const HURRICANE = {
    name: 'gameMode.hurricane.name',
    description: 'gameMode.hurricane.description',
    rounds: [9, 9, 7, 7, 5, 5, 3, 3, 1, 1],
    gameSpeed: 'gameSpeed.variable',
    color: 'green',
    custom: false,
}

const AFTER_BEDTIME = {
    name: 'gameMode.afterBedtime.name',
    description: 'gameMode.afterBedtime.description',
    rounds: [1],
    gameSpeed: 'gameSpeed.veryFast',
    color: 'red',
    custom: false,
}

const CUSTOM = {
    name: 'gameMode.custom.name',
    description: 'gameMode.custom.description',
    gameSpeed: 'gameSpeed.variable',
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