import { useEffect } from 'react';
import { Stack, Divider, Button, Card, CardBody, Text } from '@chakra-ui/react';
import RoundInput from '../../components/RoundInput';
import { useGameContext } from '../../context/GameContext';

function SelectTricks({ onBack, onNext }) {
    const { numRounds } = useGameContext();
    const { tricksPerRound, setTricksPerRound } = useGameContext();

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
            <Divider></Divider>
            <Stack>
                <Button colorScheme='twitter' variant="outline" onClick={onBack}>
                    Atrás
                </Button>
                <Button colorScheme='twitter' onClick={onNext}>
                    Siguiente
                </Button>
            </Stack>
        </Stack>
    );
}

export default SelectTricks;
