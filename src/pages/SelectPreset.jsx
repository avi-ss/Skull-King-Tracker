import PresetCard from '../components/PresetCard';
import { useGameContext } from '../context/GameContext';
import { Alert, AlertIcon, Heading, Stack, Text, Collapse, FormLabel, Switch, HStack, Highlight } from '@chakra-ui/react'

import { PRESETS } from '../utils/presets.js';

function SelectPreset({ onSelectPreset }) {
    const { setNumRounds, setTricksPerRound, strictMode, setStrictMode } = useGameContext();

    const handlePresetCardClick = (preset) => {
        if (!preset?.custom) {
            setNumRounds(preset.rounds.length);
            setTricksPerRound(preset.rounds);
        }

        onSelectPreset(preset?.custom);
    }

    const handleSwitchStrictMode = (ev) => {
        const checked = ev.target.checked;
        setStrictMode(checked)
    }

    return (
        <>
            <Stack spacing='3'>
                <Text fontSize='md'>
                    Elige tu <b>modo de juego</b> preferido o personaliza uno a tu medida. Cada opción ofrece una experiencia única y adaptada a tu estilo de juego.
                </Text>
                <HStack justifyContent='space-between'>
                    <FormLabel htmlFor='strict-mode' mb='0' textAlign='right'>
                        Activar modo estricto
                    </FormLabel>
                    <Switch size='lg' id='strict-mode' isChecked={strictMode} onChange={handleSwitchStrictMode} />
                </HStack>
            </Stack>
            <Collapse in={strictMode} animateOpacity >
                <Alert status='info' mt='3'>
                    <AlertIcon />
                    <Text>En <b>modo estricto</b>, la app asegura que las cartas en mano igualen las rondas ganadas totales.</Text>
                </Alert>
            </Collapse>
            <Stack spacing='3' mt='3'>
                {PRESETS.map((value, index) =>
                    <PresetCard key={index} index={index} preset={value} onSelect={() => handlePresetCardClick(value)}></PresetCard>
                )}
            </Stack>
        </>
    );
}

export default SelectPreset;
