import { useEffect } from 'react';
import { Stack, Card, CardBody, Text } from '@chakra-ui/react';
import RoundInput from '../../components/RoundInput';
import { useGameContext } from '../../context/GameContext';

function SetupTricks() {
    const { numRounds, tricksPerRound, setTricksPerRound } = useGameContext();

    useEffect(() => {
        const updatedTricks = Array.from({ length: numRounds }, () => 1);
        setTricksPerRound(updatedTricks);
    }, [numRounds]);

    const handleInputChange = (_, index, valueAsNumber,) => {
        const updatedTricks = [...tricksPerRound];
        updatedTricks[index] = valueAsNumber;
        setTricksPerRound(updatedTricks);
    };

    return (
        <Stack spacing={3}>
            <Text>
                Introduce el número de cartas por mano para cada una de las rondas de la partida.
            </Text>
            {tricksPerRound.map((_, index) => (
                <Card size='sm' key={index}>
                    <CardBody>
                        <Text mb='1' align='left'>
                            <b>Ronda {index + 1}</b>
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
