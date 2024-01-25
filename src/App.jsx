import React, { useState } from 'react';
import SetupGame from './pages/SetupGame';
import Game from './pages/Game';
import { Box } from '@chakra-ui/react';
import { GameProvider } from './context/GameContext';

function App() {
  const [gameStarted, setGameStarted] = useState(false);

  const startGame = () => {
    setGameStarted(true);
  };

  return (
    <Box padding={6}>
      <GameProvider>
        {!gameStarted ?
          <SetupGame onSetupEnd={startGame} /> :
          <Game />
        }
      </GameProvider>
    </Box>
  );
}

export default App;
