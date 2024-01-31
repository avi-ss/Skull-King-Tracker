import React, { useState } from 'react';
import {
    Button,
    Stack,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalFooter,
    ModalCloseButton,
} from '@chakra-ui/react'

import SelectPlayerList from './components/SelectPlayerList';
import CreatePlayerListModal from './CreatePlayerListModal';
import { useGameContext } from '../context/GameContext';

import storage from '../utils/storage';

function SetupPresetGameModal({ visible, setVisible, onSetupEnd }) {
    const { playerNames, setPlayerNames, setPlayerLists, width } = useGameContext();
    const [isCreatingList, setCreatingList] = useState(false);
    const initialRef = React.useRef(null)

    const selectPlayerList = (playerList) => {
        setPlayerNames(playerList);
        setVisible(false);
        onSetupEnd();
    }

    const handleSavePlayerList = () => {
        const success = storage.savePlayerList(playerNames);

        if (success) {
            setPlayerLists(storage.getPlayerLists());
            toast({
                title: 'Lista guardada',
                description: 'La lista se ha guardado correctamente.',
                status: 'success',
                duration: 2000,
                isClosable: true,
            });
        }
        else {
            toast({
                title: 'Error',
                description: 'La lista de jugadores que has creado ya existe.',
                status: 'error',
                duration: 2000,
                isClosable: true,
            });
        }
    };

    const nextButton = () => {
        setPlayerNames(['']);
        setCreatingList(true);
    }

    return (
        <>
            <CreatePlayerListModal visible={isCreatingList} setVisible={setCreatingList} onSetupEnd={handleSavePlayerList} />
            <Modal size={width > 600 ? 'lg' : 'full'} isOpen={visible} onClose={() => setVisible(false)} initialFocusRef={initialRef} scrollBehavior='inside'>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Crear partida</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <SelectPlayerList onSelectList={selectPlayerList} />
                    </ModalBody>
                    <ModalFooter flexDirection='column' alignItems='stretch' boxShadow='2xl'>
                        <Stack>
                            <Button colorScheme='twitter' variant='outline' onClick={() => setVisible(false)}>
                                Atrás
                            </Button>
                            <Button colorScheme='twitter' onClick={nextButton}>
                                Crear lista
                            </Button>
                        </Stack>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    );
}

export default SetupPresetGameModal;
