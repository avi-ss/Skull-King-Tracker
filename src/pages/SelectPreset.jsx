import PresetCard from '../components/PresetCard';
import { useGameContext } from '../context/GameContext';
import { Heading, Stack } from '@chakra-ui/react'

import { PRESETS } from '../utils/presets.js';

function SelectPreset({ onSelectPreset }) {
    const { setNumRounds, setTricksPerRound } = useGameContext();

    const handlePresetCardClick = (preset) => {
        if(!preset?.custom) {
            setNumRounds(preset.rounds.length);
            setTricksPerRound(preset.rounds);
        }

        onSelectPreset(preset?.custom);
    }

    return (
        <>
            <Heading as='h1' size='xl' mb='4'>Selecciona un modo de juego</Heading>
            <Stack>
                {PRESETS.map((value, index) =>
                    <PresetCard key={index} index={index} preset={value} onSelect={() => handlePresetCardClick(value)}></PresetCard>
                )}
            </Stack>
        </>
    );
}

export default SelectPreset;
