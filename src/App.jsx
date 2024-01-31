import React, { useState, useEffect } from 'react';
import SelectPreset from './pages/SelectPreset';
import SetupPresetGameModal from './modals/SetupPresetGameModal';
import SetupCustomGameModal from './modals/SetupCustomGameModal';
import Game from './pages/Game';
import { Box, Heading } from '@chakra-ui/react';
import { useGameContext } from './context/GameContext';
import './App.css';

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
    <div className="view">
      <Box padding={6} bg='gray.50'>
        <Heading as='h1' size='xl' mb='4'>Skull King Tracker</Heading>
        {!gameStarted ?
          <SelectPreset onSelectPreset={handleSelectPreset} ></SelectPreset> :
          <Game onRoundChange={scrollToTop} onGameExit={() => handleStartGame(false)} />
        }
      </Box>
      <SetupPresetGameModal visible={setupPlayersVisible} setVisible={setSetupPlayerVisible} onSetupEnd={() => handleStartGame(true)} />
      <SetupCustomGameModal visible={setupGameVisible} setVisible={setSetupGameVisible} onSetupEnd={() => handleStartGame(true)} />
    </div>
  );
}

export default App;
