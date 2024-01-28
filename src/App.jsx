import React, { useState, useEffect } from 'react';
import SelectPreset from './pages/SelectPreset';
import SetupPlayersModal from './modals/SetupPlayersModal';
import SetupGameModal from './modals/SetupGameModal';
import Game from './pages/Game';
import { Box } from '@chakra-ui/react';
import { useGameContext } from './context/GameContext';

function App() {
  const [view, setView] = useState('selectPreset');
  const [setupPlayersVisible, setSetupPlayerVisible] = useState(false);
  const [setupGameVisible, setSetupGameVisible] = useState(false);

  const { setPlayerNames, setNumRounds, setTricksPerRound } = useGameContext();

  useEffect(() => {
    // Resetear a los valores iniciales
    setPlayerNames(['']);
    setNumRounds(1);
    setTricksPerRound([]);
  }, [setupPlayersVisible, setupGameVisible]);

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

  return (
    <>
      <SetupPlayersModal visible={setupPlayersVisible} setVisible={setSetupPlayerVisible} onSetupEnd={() => setView('game')} />
      <SetupGameModal visible={setupGameVisible} setVisible={setSetupGameVisible} onSetupEnd={() => setView('game')} />
      <Box padding={6}>
        {view === 'selectPreset' &&
          <SelectPreset onSelectPreset={handleSelectPreset} ></SelectPreset>
        }
        {view === 'game' && <Game onRoundChange={scrollToTop} onGameExit={() => setView('selectPreset')} />}
      </Box>
    </>
  );
}

export default App;
