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

  const scrollToTop = () => {
    setTimeout(() => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    }, 100); // Retrasar 100ms, ajustar según sea necesario
  }

  return (
    <Box padding={6}>
      <GameProvider>
        {!gameStarted ?
          <SetupGame onSetupEnd={startGame} /> :
          <Game onRoundChange={scrollToTop} onGameExit={() => setGameStarted(false)} />
        }
      </GameProvider>
    </Box>
  );
}

export default App;
