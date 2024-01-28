import React, { useEffect } from 'react';
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
import SetupPlayers from './components/SetupPlayers';
import SetupRounds from './components/SetupRounds';
import SetupTricks from './components/SetupTricks';

function SetupGameModal({ visible, setVisible, onSetupEnd }) {
    const { activeStep, goToNext, goToPrevious, setActiveStep } = useSteps({
        initialStep: 0,
    });
    const { playerNames } = useGameContext();
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

    const exitSetup = () => {
        setActiveStep(0);
        setVisible(false);
    }

    const nextButton = () => {
        switch (activeStep) {
            case 0: {
                checkSelectPlayerInputs();
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

    const checkSelectPlayerInputs = () => {
        const nameSet = new Set(playerNames);
        const areAllNamesUnique = nameSet.size === playerNames.length;
        const areAllNamesFilled = playerNames.every((name) => name.trim() !== '');

        if (areAllNamesFilled && areAllNamesUnique) {
            console.log('¡Todos los nombres están llenos y son únicos! Puedes comenzar el juego.');
            goToNext();
        } else {
            toast({
                title: 'Error',
                description: 'Por favor, asegúrate de que todos los jugadores tengan un nombre único y no estén vacíos.',
                status: 'error',
                duration: 3000,
                isClosable: true,
            });
        }
    };

    const renderStepContent = (step) => {
        switch (step) {
            case 0:
                return <SetupPlayers initialRef={initialRef} />;
            case 1:
                return <SetupRounds />;
            case 2:
                return <SetupTricks />;
            default:
                return null;
        }
    };

    return (
        <Modal size='full' isOpen={visible} onClose={exitSetup} initialFocusRef={initialRef} scrollBehavior='inside'>
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
                <ModalFooter flexDirection='column' alignItems='stretch'>
                    <Stack>
                        <Button colorScheme='twitter' variant='outline' onClick={previousButton}>
                            {activeStep === 0 ? 'Cerrar' : 'Atrás'}
                        </Button>
                        <Button colorScheme='twitter' onClick={nextButton}>
                            {activeStep === 2 ? 'Continuar' : 'Empezar'}
                        </Button>
                    </Stack>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
}

export default SetupGameModal;
