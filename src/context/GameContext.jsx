import React, { createContext, useState, useContext } from 'react';

const GameContext = createContext();

export const useGameContext = () => useContext(GameContext);

export const GameProvider = ({ children }) => {
    const [playerNames, setPlayerNames] = useState(['']);
    const [numRounds, setNumRounds] = useState(1);
    const [tricksPerRound, setTricksPerRound] = useState([]);

    return (
        <GameContext.Provider value={{
            playerNames, 
            setPlayerNames, 
            numRounds, 
            setNumRounds, 
            tricksPerRound, 
            setTricksPerRound
        }}>
            {children}
        </GameContext.Provider>
    );
};