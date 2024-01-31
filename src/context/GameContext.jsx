import React, { createContext, useState, useEffect, useContext } from 'react';
import storage from '../utils/storage';

const GameContext = createContext();

export const useGameContext = () => useContext(GameContext);

export const GameProvider = ({ children }) => {
    const [playerNames, setPlayerNames] = useState(['']);
    const [playerLists, setPlayerLists] = useState([]);
    const [numRounds, setNumRounds] = useState(1);
    const [tricksPerRound, setTricksPerRound] = useState([]);

    const [width, setWidth] = useState(window.innerWidth);
    const [strictMode, setStrictMode] = useState(false);

    // Cargar listas al montar el componente
    useEffect(() => {
        setPlayerLists(storage.getPlayerLists());
    }, []);

    useEffect(() => {
        const handleResize = () => {
            setWidth(window.innerWidth);
        };

        window.addEventListener('resize', handleResize);

        // Limpiar el event listener cuando el componente se desmonta
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return (
        <GameContext.Provider value={{
            playerNames,
            setPlayerNames,
            numRounds,
            setNumRounds,
            tricksPerRound,
            setTricksPerRound,
            width,
            strictMode,
            setStrictMode,
            playerLists,
            setPlayerLists
        }}>
            {children}
        </GameContext.Provider>
    );
};