import React from 'react';
import { Input, Button, useToast, Stack, HStack, Text, Divider } from '@chakra-ui/react';
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalFooter,
    ModalCloseButton,
} from '@chakra-ui/react'

import { useGameContext } from '../context/GameContext';

function SetupPlayersModal({ visible, setVisible, onSetupEnd }) {
    const { playerNames, setPlayerNames } = useGameContext();
    const toast = useToast();
    const initialRef = React.useRef(null)

    const addPlayer = () => {
        setPlayerNames([...playerNames, '']);
    };

    const removePlayer = () => {
        if (playerNames.length > 1) {
            setPlayerNames(playerNames.slice(0, -1));
        }
    };

    const handleNameChange = (event, index) => {
        const newPlayerNames = [...playerNames];
        newPlayerNames[index] = event.target.value;
        setPlayerNames(newPlayerNames);
    };

    const checkInputs = () => {
        const nameSet = new Set(playerNames);
        const areAllNamesUnique = nameSet.size === playerNames.length;
        const areAllNamesFilled = playerNames.every((name) => name.trim() !== '');

        if (areAllNamesFilled && areAllNamesUnique) {
            console.log('¡Todos los nombres están llenos y son únicos! Puedes comenzar el juego.');
            setVisible(false);
            onSetupEnd();
        } else {
            toast({
                title: 'Error',
                description: 'Por favor, asegúrate de que todos los jugadores tengan un nombre único y no estén vacíos.',
                status: 'error',
                duration: 3000,
                isClosable: true,
            });
        }
    }

    const isInputInvalid = (index) => {
        const name = playerNames[index];
        const isNameDuplicate = playerNames.indexOf(name) !== index;
        return name.trim() === '' || isNameDuplicate;
    };

    const renderInputs = () => {
        return playerNames.map((name, index) => (
            <Input
                key={index}
                ref={initialRef}
                placeholder={`Jugador ${index + 1}`}
                value={name}
                onChange={(event) => handleNameChange(event, index)}
                isInvalid={isInputInvalid(index)}
            />
        ));
    };

    return (
        <Modal size='full' isOpen={visible} onClose={() => setVisible(false)} initialFocusRef={initialRef} scrollBehavior='inside'>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>Seleccionar jugadores</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    <Stack spacing={3}>
                        <Text>
                            Introduce el nombre de los jugadores que van a jugar la partida.
                        </Text>
                        {renderInputs()}
                        <Divider />
                        <HStack justifyContent='space-between'>
                            <Button colorScheme='red' onClick={removePlayer} >
                                Quitar jugador
                            </Button>
                            <Button colorScheme='green' onClick={addPlayer}>
                                Añadir jugador
                            </Button>
                        </HStack>
                    </Stack>
                </ModalBody>
                <ModalFooter flexDirection='column' alignItems='stretch'>
                    <Stack>
                        <Button colorScheme='twitter' variant='outline' onClick={() => setVisible(false)}>
                            Cerrar
                        </Button>
                        <Button colorScheme='twitter' onClick={checkInputs}>
                            Empezar
                        </Button>
                    </Stack>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
}

export default SetupPlayersModal;
