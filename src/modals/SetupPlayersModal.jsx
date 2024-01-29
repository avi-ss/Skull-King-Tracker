import React from 'react';
import { Input, Button, useToast, Stack, Text, Divider, SimpleGrid } from '@chakra-ui/react';
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
import SetupPlayers from './components/SetupPlayers';

function SetupPlayersModal({ visible, setVisible, onSetupEnd }) {
    const { playerNames, width } = useGameContext();
    const toast = useToast();
    const initialRef = React.useRef(null)

    const checkInputs = () => {
        const nameSet = new Set(playerNames);
        const areAllNamesUnique = nameSet.size === playerNames.length;
        const areAllNamesFilled = playerNames.every((name) => name.trim() !== '');

        if (!(areAllNamesFilled && areAllNamesUnique)) {
            toast({
                title: 'Error',
                description: 'Por favor, asegúrate de que todos los jugadores tengan un nombre único y no estén vacíos.',
                status: 'error',
                duration: 3000,
                isClosable: true,
            });
        }
        else if (playerNames.length < 2) {
            toast({
                title: 'Error',
                description: 'Por favor, incluye al menos a dos jugadores en la partida.',
                status: 'error',
                duration: 3000,
                isClosable: true,
            });
        }
        else {
            console.log('¡Todos los nombres están llenos y son únicos! Puedes comenzar el juego.');
            setVisible(false);
            onSetupEnd();
        }
    }

    return (
        <Modal size={width > 600 ? 'lg' : 'full'} isOpen={visible} onClose={() => setVisible(false)} initialFocusRef={initialRef} scrollBehavior='inside'>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>Seleccionar jugadores</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    <SetupPlayers initialRef={initialRef} />
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
