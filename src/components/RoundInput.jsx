import React from 'react';
import { Button, HStack, Input, useNumberInput } from '@chakra-ui/react';

function RoundInput({ name, index, value, defaultValue = 1, min = 1, max = 100, onChange }) {
    const { getInputProps, getIncrementButtonProps, getDecrementButtonProps } =
        useNumberInput({
            step: 1,
            value,
            defaultValue,
            min,
            max,
            onChange: (_, valueAsNumber) => onChange(name, index, valueAsNumber),
        });

    const inc = getIncrementButtonProps();
    const dec = getDecrementButtonProps();
    const input = getInputProps();

    return (
        <HStack>
            <Button {...dec}>-</Button>
            <Input {...input} />
            <Button {...inc}>+</Button>
        </HStack>
    );
}

export default RoundInput;
