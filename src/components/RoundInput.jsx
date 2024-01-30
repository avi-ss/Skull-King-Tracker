import React from 'react';
import { IconButton, HStack, Input, useNumberInput } from '@chakra-ui/react';

import { ArrowBackIcon, ArrowForwardIcon } from '@chakra-ui/icons';

const ICON_SIZE = '20px';

function RoundInput({ name, index, value, scheme, defaultValue = 1, min = 1, max = 100, onChange }) {
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
            <IconButton colorScheme={scheme} fontSize={ICON_SIZE} icon={<ArrowBackIcon />} {...dec}>-</IconButton>
            <Input isReadOnly fontWeight='600' {...input} />
            <IconButton colorScheme={scheme} fontSize={ICON_SIZE} icon={<ArrowForwardIcon />} {...inc}>+</IconButton>
        </HStack>
    );
}

export default RoundInput;
