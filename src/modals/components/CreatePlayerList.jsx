import React, { useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { Input, Button, Text, Stack, SimpleGrid } from '@chakra-ui/react';
import { useGameContext } from '../../context/GameContext';

function CreatePlayerList({ initialRef }) {
    const { playerNames, setPlayerNames } = useGameContext();
    const { t } = useTranslation('global');
    const inputRefs = useRef([initialRef]);

    useEffect(() => {
        // Ajustar el tamaño del arreglo de refs para que coincida con playerNames
        inputRefs.current = inputRefs.current.slice(0, playerNames.length);
    }, [playerNames]);

    const addPlayer = () => {
        setPlayerNames([...playerNames, '']);
        // Esperar a que el estado se actualice y luego enfocar el nuevo input
        setTimeout(() => inputRefs.current[playerNames.length]?.focus(), 0);
    };

    const removePlayer = () => {
        if (playerNames.length > 1) {
            setPlayerNames(playerNames.slice(0, -1));
            // Esperar a que el estado se actualice y luego enfocar el input anterior
            setTimeout(() => {
                // Primero revisamos si es el index 0 y hacer .current (ya que es el initialRef)
                inputRefs.current[playerNames.length - 2]?.current?.focus();
            }, 0);
        }
    };

    const handleNameChange = (event, index) => {
        const newPlayerNames = [...playerNames];
        newPlayerNames[index] = event.target.value;
        setPlayerNames(newPlayerNames);
    };

    const isInputInvalid = (index) => {
        const name = playerNames[index];
        const isNameDuplicate = playerNames.indexOf(name) !== index;
        return name.trim() === '' || isNameDuplicate;
    };

    const renderInputs = () => {
        return playerNames.map((name, index) => (
            <Input
                key={index}
                ref={!index ? initialRef : el => inputRefs.current[index] = el}
                placeholder={t('createPlayerList.modal.placeholder', { position: index + 1 })}
                value={name}
                onChange={(event) => handleNameChange(event, index)}
                isInvalid={isInputInvalid(index)}
            />
        ));
    };

    return (
        <Stack spacing={3}>
            <Text mb='2'>
                {t('createPlayerList.description')}
            </Text>
            {renderInputs()}
            <Stack>
                <SimpleGrid mt='2' columns={2} spacing={4}>
                    <Button colorScheme='red' onClick={removePlayer} >
                        {t('button.deletePlayer')}
                    </Button>
                    <Button colorScheme='green' onClick={addPlayer}>
                        {t('button.addPlayer')}
                    </Button>
                </SimpleGrid>
            </Stack>
        </Stack>
    );
}

export default CreatePlayerList;
