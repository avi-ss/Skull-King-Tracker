import React from 'react';
import { Box, Stepper, Step, StepIcon, StepIndicator, StepNumber, StepStatus, Text, StepSeparator, useSteps } from '@chakra-ui/react';
import SelectPlayers from './select/SelectPlayers';
import SelectRounds from './select/SelectRounds';
import SelectTricks from './select/SelectTricks';

const steps = [
    { title: 'Jugadores', description: 'Elije a los jugadores del juego' },
    { title: 'Rondas', description: 'Establece el número de rondas' },
    { title: 'Bazas', description: 'Define el número de bazas para cada ronda' },
];

function SetupGame({ onSetupEnd }) {
    const { activeStep, goToNext, goToPrevious } = useSteps({
        initialStep: 0,
    });

    const renderStepContent = (step) => {
        switch (step) {
            case 0:
                return <SelectPlayers onNext={goToNext} />;
            case 1:
                return <SelectRounds onNext={goToNext} onBack={goToPrevious} />;
            case 2:
                return <SelectTricks onBack={goToPrevious} onNext={onSetupEnd} />;
            default:
                return null;
        }
    };

    return (
        <Box>
            <Stepper index={activeStep} gap='0'>
                {steps.map((index) => (
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
            <Text mt="3" align='left'>
                <b>{steps[activeStep].title}:</b> {steps[activeStep].description}
            </Text>
            <Box mt={4}>
                {renderStepContent(activeStep)}
            </Box>
        </Box>
    );
}

export default SetupGame;
