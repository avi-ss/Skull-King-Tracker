import React, { useState } from 'react';
import SetupGame from './pages/SetupGame';
import Game from './pages/Game';
import { Center } from '@chakra-ui/react';
import { GameProvider } from './context/GameContext';

function App() {
  const [gameStarted, setGameStarted] = useState(false);

  const startGame = () => {
    setGameStarted(true);
  };

  return (
    <Center>
      <GameProvider>
        {!gameStarted ?
          <SetupGame onSetupEnd={startGame} /> :
          <Game />
        }
      </GameProvider>
    </Center>
  );
}

export default App;
