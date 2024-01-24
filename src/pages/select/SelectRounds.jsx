import { Input, Button, Stack, HStack, useNumberInput, Divider } from '@chakra-ui/react';
import { useGameContext } from '../../context/GameContext';

function SelectRounds({ onNext, onBack }) {
    const { numRounds, setNumRounds } = useGameContext();
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

    const nextStep = () => {
        console.log("Enviando rondas a SetupGame:", numRounds);
        onNext(numRounds);
    };

    const backStep = () => {
        onBack();
    };

    return (<Stack spacing={3}>
        <HStack>
            <Button {...dec}>-</Button>
            <Input {...input} />
            <Button {...inc}>+</Button>
        </HStack>
        <Divider></Divider>
        <Stack>
            <Button colorScheme='twitter' variant="outline" onClick={backStep}>
                Atrás
            </Button>
            <Button colorScheme='twitter' onClick={nextStep}>
                Siguiente
            </Button>
        </Stack>
    </Stack>
    )
}

export default SelectRounds;
