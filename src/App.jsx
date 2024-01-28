import React, { useState, useEffect } from 'react';
import SelectPreset from './pages/SelectPreset';
import SetupPlayersModal from './modals/SetupPlayersModal';
import SetupGameModal from './modals/SetupGameModal';
import Game from './pages/Game';
import { Box } from '@chakra-ui/react';
import { useGameContext } from './context/GameContext';

function App() {
  const [gameStarted, setGameStarted] = useState(false);
  const [setupPlayersVisible, setSetupPlayerVisible] = useState(false);
  const [setupGameVisible, setSetupGameVisible] = useState(false);

  const { setPlayerNames, setNumRounds, setTricksPerRound } = useGameContext();

  useEffect(() => {
    if (!setupGameVisible && !setupPlayersVisible && !gameStarted) {
      // Resetear a los valores iniciales
      setPlayerNames(['']);
      setNumRounds(1);
      setTricksPerRound([]);
    }
  }, [setupPlayersVisible, setupGameVisible, gameStarted]);

  const scrollToTop = () => {
    setTimeout(() => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    }, 100); // Retrasar 100ms, ajustar según sea necesario
  }

  const handleSelectPreset = (isCustomPreset) => {
    if (isCustomPreset) {
      setSetupGameVisible(true);
    }
    else {
      setSetupPlayerVisible(true);
    }
  }

  const handleStartGame = (gameStarted) => {
    setGameStarted(gameStarted)
    scrollToTop();
  }

  return (
    <>
      <SetupPlayersModal visible={setupPlayersVisible} setVisible={setSetupPlayerVisible} onSetupEnd={() => handleStartGame(true)} />
      <SetupGameModal visible={setupGameVisible} setVisible={setSetupGameVisible} onSetupEnd={() => handleStartGame(true)} />
      <Box padding={6}>
        {!gameStarted ?
          <SelectPreset onSelectPreset={handleSelectPreset} ></SelectPreset> :
          <Game onRoundChange={scrollToTop} onGameExit={() => handleStartGame(false)} />
        }
      </Box>
    </>
  );
}

export default App;
