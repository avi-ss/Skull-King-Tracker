import React, { useState, useEffect } from 'react';
import SelectPreset from './pages/SelectPreset';
import SetupPresetGameModal from './modals/SetupPresetGameModal';
import SetupCustomGameModal from './modals/SetupCustomGameModal';
import Game from './pages/Game';
import { Box, HStack, Heading, IconButton, useColorMode } from '@chakra-ui/react';
import { useGameContext } from './context/GameContext';
import { FaMoon, FaSun } from 'react-icons/fa';
import './App.css';

function App() {
  const { colorMode, toggleColorMode } = useColorMode();
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
    <div className='view'>
      <Box padding={6}>
        <HStack mb='4' justifyContent='space-between'>
          <Heading as='h1' size='xl'>Skull King Tracker</Heading>
          <IconButton
            aria-label='toggle theme'
            colorScheme='facebook'
            isRound={true}
            variant='solid'
            size='md'
            onClick={toggleColorMode} 
            icon={colorMode === 'dark' ? <FaSun /> : <FaMoon />}
          />
        </HStack>
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
