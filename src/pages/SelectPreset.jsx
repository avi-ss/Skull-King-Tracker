import { useTranslation } from 'react-i18next';
import parse from 'html-react-parser';
import PresetCard from '../components/PresetCard';
import { useGameContext } from '../context/GameContext';
import { Alert, AlertIcon, Stack, Text, Collapse, FormLabel, Switch, HStack } from '@chakra-ui/react'

import { PRESETS } from '../utils/presets.js';

function SelectPreset({ onSelectPreset }) {
    const { t } = useTranslation('global');
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
                <Text fontSize='md'>{parse(t('chooseYourGameMode'))}</Text>
                <HStack justifyContent='space-between'>
                    <FormLabel htmlFor='strict-mode' mb='0' textAlign='right'>
                        {t('strictMode.title')}
                    </FormLabel>
                    <Switch size='lg' id='strict-mode' isChecked={strictMode} onChange={handleSwitchStrictMode} />
                </HStack>
            </Stack>
            <Collapse in={strictMode} animateOpacity >
                <Alert status='info' mt='3'>
                    <AlertIcon />
                    <Text>{parse(t('strictMode.description'))}</Text>
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
