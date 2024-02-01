import React from 'react';
import { useTranslation } from 'react-i18next';
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
import CreatePlayerList from './components/CreatePlayerList';

function CreatePlayerListModal({ visible, setVisible, onSetupEnd }) {
    const { playerNames, width } = useGameContext();
    const { t } = useTranslation('global');
    const toast = useToast();
    const initialRef = React.useRef(null)

    const checkInputs = () => {
        const playerNamesSet = new Set(playerNames);
        const areAllNamesUnique = playerNamesSet.size === playerNames.length;
        const areAllNamesFilled = playerNames.every((name) => name.trim() !== '');

        if (!(areAllNamesFilled && areAllNamesUnique)) {
            toast({
                title: t('createPlayerList.toast.error.title'),
                description: t('createPlayerList.toast.error.uniqueDescription'),
                status: 'error',
                duration: 3000,
                isClosable: true,
            });
        }
        else if (playerNames.length < 2) {
            toast({
                title: t('createPlayerList.toast.error.title'),
                description: t('createPlayerList.toast.error.minPlayerDescription'),
                status: 'error',
                duration: 3000,
                isClosable: true,
            });
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
                <ModalHeader>{t('createPlayerList.modal.header')}</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    <CreatePlayerList initialRef={initialRef} />
                </ModalBody>
                <ModalFooter flexDirection='column' alignItems='stretch'>
                    <Stack>
                        <Button colorScheme='twitter' variant='outline' onClick={() => setVisible(false)}>
                            {t('button.close')}
                        </Button>
                        <Button colorScheme='twitter' onClick={checkInputs}>
                            {t('button.create')}
                        </Button>
                    </Stack>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
}

export default CreatePlayerListModal;
