import React from 'react';
import { Button, useToast, Stack } from '@chakra-ui/react';
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

import checkPlayerNames from '../utils/control';

function CreatePlayerListModal({ visible, setVisible, onSetupEnd }) {
    const { playerNames, width } = useGameContext();
    const toast = useToast();
    const initialRef = React.useRef(null)

    const checkInputs = () => {
        const toastMessageError = checkPlayerNames(playerNames);

        if (toastMessageError) {
            toast(toastMessageError);
        }
        else {
            setVisible(false);
            onSetupEnd();
        }
    }

    return (
        <Modal size={width > 600 ? 'lg' : 'full'} isOpen={visible} onClose={() => setVisible(false)} initialFocusRef={initialRef} scrollBehavior='inside'>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>Crea una lista de jugadores</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    <SetupPlayers initialRef={initialRef}/>
                </ModalBody>
                <ModalFooter flexDirection='column' alignItems='stretch'>
                    <Stack>
                        <Button colorScheme='twitter' variant='outline' onClick={() => setVisible(false)}>
                            Cerrar
                        </Button>
                        <Button colorScheme='twitter' onClick={checkInputs}>
                            Crear
                        </Button>
                    </Stack>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
}

export default CreatePlayerListModal;
