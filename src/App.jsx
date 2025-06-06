import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import SelectPreset from './pages/SelectPreset';
import SetupPresetGameModal from './modals/SetupPresetGameModal';
import SetupCustomGameModal from './modals/SetupCustomGameModal';
import Game from './pages/Game';
import { Box, Stack, HStack, Heading, IconButton, Select, useColorMode } from '@chakra-ui/react';
import { useGameContext } from './context/GameContext';
import { FaMoon, FaSun, FaGlobe } from 'react-icons/fa';
import './App.css';

function App() {
  const { colorMode, toggleColorMode } = useColorMode();
  const { i18n } = useTranslation('global');
  const activeGame = localStorage.getItem("active-game");
  const [gameStarted, setGameStarted] = useState(!!activeGame);
  const [setupPresetVisible, setSetupPresetVisible] = useState(false);
  const [setupCustomVisible, setSetupCustomVisible] = useState(false);

  const { setPlayerNames, setNumRounds, setTricksPerRound } = useGameContext();

  useEffect(() => {
    if (!setupCustomVisible && !setupPresetVisible && !gameStarted) {
      // Resetear a los valores iniciales
      setPlayerNames(['']);
      setNumRounds(1);
      setTricksPerRound([]);
    }
  }, [setupPresetVisible, setupCustomVisible, gameStarted]);

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
      setSetupCustomVisible(true);
    }
    else {
      setSetupPresetVisible(true);
    }
  }

  const handleStartGame = (gameStarted) => {
    if(!gameStarted) {
      localStorage.removeItem("active-game");
    }
    setGameStarted(gameStarted)
    scrollToTop();
  }

  const changeLanguage = (event) => {
    i18n.changeLanguage(event.target.value);
  };

  return (
    <div className='view'>
      <Box padding={6}>
        <Stack mb='4'>
          <HStack justifyContent='space-between'>
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
          <Select mt="2" placeholder="Select language" onChange={changeLanguage} size="sm" variant="filled" icon={<FaGlobe />} value={i18n.language}>
            <option value="en">English</option>
            <option value="es">Español</option>
          </Select>
        </Stack>
        {!gameStarted ?
          <SelectPreset onSelectPreset={handleSelectPreset} ></SelectPreset> :
          <Game onRoundChange={scrollToTop} onGameExit={() => handleStartGame(false)} />
        }
      </Box>
      <SetupPresetGameModal visible={setupPresetVisible} setVisible={setSetupPresetVisible} onSetupEnd={() => handleStartGame(true)} />
      <SetupCustomGameModal visible={setupCustomVisible} setVisible={setSetupCustomVisible} onSetupEnd={() => handleStartGame(true)} />
    </div>
  );
}

export default App;
