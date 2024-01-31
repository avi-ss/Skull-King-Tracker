function checkPlayerNames(playerNames, title) {
    const playerNamesSet = new Set(playerNames);
    const areAllNamesUnique = playerNamesSet.size === playerNames.length;
    const areAllNamesFilled = playerNames.every((name) => name.trim() !== '');

    if (!(areAllNamesFilled && areAllNamesUnique)) {
        return {
            title: title || 'Error',
            description: 'Por favor, asegúrate de que todos los jugadores tengan un nombre único y no estén vacíos.',
            status: 'error',
            duration: 3000,
            isClosable: true,
        };
    }
    else if (playerNames.length < 2) {
        return {
            title: title || 'Error',
            description: 'Por favor, asegúrate de que haya como mínimo 2 jugadores.',
            status: 'error',
            duration: 3000,
            isClosable: true,
        };
    }
    else {
        return false;
    }
}

export default checkPlayerNames;