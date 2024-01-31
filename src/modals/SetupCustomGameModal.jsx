import React, { useEffect, useState } from 'react';
import { Box, Button, Stepper, Step, StepIcon, StepIndicator, StepNumber, StepStatus, StepSeparator, useSteps, Stack, useToast } from '@chakra-ui/react';
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
import SetupRounds from './components/SetupRounds';
import SetupTricks from './components/SetupTricks';
import SelectPlayerList from './components/SelectPlayerList';
import CreatePlayerListModal from './CreatePlayerListModal';

import storage from '../utils/storage';

function SetupCustomGameModal({ visible, setVisible, onSetupEnd }) {
    const { activeStep, goToNext, goToPrevious, setActiveStep } = useSteps({
        initialStep: 0,
    });
    const [isCreatingList, setCreatingList] = useState(false);
    const { playerNames, setPlayerNames, setPlayerLists, width } = useGameContext();
    const initialRef = React.useRef(null);
    const toast = useToast();

    useEffect(() => {
        setActiveStep(0);
    }, [visible])

    const previousButton = () => {
        if (activeStep === 0) {
            exitSetup();
        }
        else {
            goToPrevious();
        }
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

    const exitSetup = () => {
        setActiveStep(0);
        setVisible(false);
    }

    const nextButton = () => {
        switch (activeStep) {
            case 0: {
                setPlayerNames(['']);
                setCreatingList(true);
                break;
            }
            case 1: {
                goToNext();
                break;
            }
            case 2: {
                setVisible(false);
                onSetupEnd();
                break;
            }
        }
    }

    const selectPlayerList = (playerList) => {
        setPlayerNames(playerList);
        goToNext();
    }

    const renderStepContent = (step) => {
        switch (step) {
            case 0:
                return <SelectPlayerList onSelectList={selectPlayerList} />
            case 1:
                return <SetupRounds />;
            case 2:
                return <SetupTricks />;
            default:
                return null;
        }
    };

    const nextStepLabel = () => {
        switch (activeStep) {
            case 0:
                return 'Crear lista';
            case 2:
                return 'Empezar';
            default:
                return 'Continuar';
        }
    }

    return (
        <>
            <CreatePlayerListModal visible={isCreatingList} setVisible={setCreatingList} onSetupEnd={handleSavePlayerList} />
            <Modal size={width > 600 ? 'lg' : 'full'} isOpen={visible} onClose={exitSetup} initialFocusRef={initialRef} scrollBehavior='inside'>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Crear partida customizada</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <Stepper index={activeStep} gap='0'>
                            {[0, 1, 2].map((index) => (
                                <Step key={index} gap='0'>
                                    <StepIndicator>
                                        <StepStatus
                                            complete={<StepIcon />}
                                            incomplete={<StepNumber />}
                                            active={<StepNumber />}
                                        />
                                    </StepIndicator>
                                    <StepSeparator _horizontal={{ ml: '0' }} />
                                </Step>
                            ))}
                        </Stepper>
                        <Box mt={4}>
                            {renderStepContent(activeStep)}
                        </Box>
                    </ModalBody>
                    <ModalFooter flexDirection='column' alignItems='stretch' boxShadow='2xl'>
                        <Stack>
                            <Button colorScheme='twitter' variant='outline' onClick={previousButton}>
                                Atrás
                            </Button>
                            <Button colorScheme='twitter' onClick={nextButton}>
                                {nextStepLabel()}
                            </Button>
                        </Stack>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    );
}

export default SetupCustomGameModal;
