import { useTranslation } from 'react-i18next';
import { Stack, Text } from '@chakra-ui/react';
import { useGameContext } from '../../context/GameContext';
import RoundInput from '../../components/RoundInput';

function SetupRounds() {
    const { setNumRounds } = useGameContext();
    const { t } = useTranslation('global');

    const handleInputChange = (_, index, value) => {
        setNumRounds(value);
    }

    return (
        <Stack spacing={3}>
            <Text>{t('setupRounds.description')}</Text>
            <RoundInput
                index='0'
                onChange={handleInputChange}
            />
        </Stack>
    )
}

export default SetupRounds;
