import React, { createContext, useState, useEffect, useContext } from 'react';

const GameContext = createContext();

export const useGameContext = () => useContext(GameContext);

export const GameProvider = ({ children }) => {
    const [playerNames, setPlayerNames] = useState(['']);
    const [numRounds, setNumRounds] = useState(1);
    const [tricksPerRound, setTricksPerRound] = useState([]);
    const [width, setWidth] = useState(window.innerWidth);

    useEffect(() => {
        const handleResize = () => {
            console.log(window.innerWidth);
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
        }}>
            {children}
        </GameContext.Provider>
    );
};