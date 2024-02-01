import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Stack, Card, CardBody, Text } from '@chakra-ui/react';
import RoundInput from '../../components/RoundInput';
import { useGameContext } from '../../context/GameContext';

function SetupTricks() {
    const { numRounds, tricksPerRound, setTricksPerRound } = useGameContext();
    const { t } = useTranslation('global');

    useEffect(() => {
        const updatedTricks = Array.from({ length: numRounds }, () => 1);
        setTricksPerRound(updatedTricks);
    }, [numRounds]);

    const handleInputChange = (_, index, valueAsNumber) => {
        const updatedTricks = [...tricksPerRound];
        updatedTricks[index] = valueAsNumber;
        setTricksPerRound(updatedTricks);
    };

    return (
        <Stack spacing={3}>
            <Text>
                {t('setupTricks.description')}
            </Text>
            {tricksPerRound.map((_, index) => (
                <Card size='sm' key={index}>
                    <CardBody>
                        <Text mb='1' align='left'>
                            <b>{t('setupTricks.round')} {index + 1}</b>
                        </Text>
                        <RoundInput
                            index={index}
                            onChange={handleInputChange}
                        />
                    </CardBody>
                </Card>
            ))}
        </Stack>
    );
}

export default SetupTricks;
