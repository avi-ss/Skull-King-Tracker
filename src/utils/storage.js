const PLAYER_LIST_PREFIX = 'pl_';

function getPlayerLists() {
    const _playerLists = [];

    for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);

        if (key.startsWith(PLAYER_LIST_PREFIX)) {
            _playerLists.push(JSON.parse(localStorage.getItem(key)));
        }
    }

    return _playerLists;
}

function savePlayerList(playerNames) {
    const newKey = `${PLAYER_LIST_PREFIX}${Date.now()}`;
    const playerNamesSet = new Set(playerNames);

    // Recorrer todas las claves en localStorage para verificar si la lista ya existe
    for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);

        if (key.startsWith(PLAYER_LIST_PREFIX)) {
            const savedList = new Set(JSON.parse(localStorage.getItem(key)));

            if (savedList.size === playerNamesSet.size && [...savedList].every(name => playerNamesSet.has(name))) {
                return false;
            }
        }
    }

    // Guardar la lista solo si no existe una igual
    localStorage.setItem(newKey, JSON.stringify(Array.from(playerNamesSet)));
    
    return true;
};

export default { getPlayerLists, savePlayerList };