import { Stack, Text } from '@chakra-ui/react';
import { useGameContext } from '../../context/GameContext';
import RoundInput from '../../components/RoundInput';

function SetupRounds() {
    const { setNumRounds } = useGameContext();

    const handleInputChange = (_, index, value) => {
        setNumRounds(value);
    }

    return (
        <Stack spacing={3}>
            <Text>Introduce el número de rondas que va a durar la partida.</Text>
            <RoundInput
                index='0'
                onChange={handleInputChange}
            />
        </Stack>
    )
}

export default SetupRounds;
