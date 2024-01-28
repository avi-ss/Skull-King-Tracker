import { Input, Button, Stack, Text, HStack, useNumberInput } from '@chakra-ui/react';
import { useGameContext } from '../../context/GameContext';

function SetupRounds() {
    const { setNumRounds } = useGameContext();
    const { getInputProps, getIncrementButtonProps, getDecrementButtonProps } =
        useNumberInput({
            step: 1,
            defaultValue: 1,
            min: 1,
            max: 100,
            onChange: (valueAsNumber) => setNumRounds(valueAsNumber),
        })
    const inc = getIncrementButtonProps();
    const dec = getDecrementButtonProps();
    const input = getInputProps();

    return (
        <Stack spacing={3}>
            <Text>Introduce el número de rondas que va a durar la partida.</Text>
            <HStack>
                <Button {...dec}>-</Button>
                <Input {...input} />
                <Button {...inc}>+</Button>
            </HStack>
        </Stack>
    )
}

export default SetupRounds;
