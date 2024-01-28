import React from 'react';
import { Box, Stepper, Step, StepIcon, StepIndicator, StepNumber, StepStatus, StepSeparator, useSteps } from '@chakra-ui/react';
import SetupPlayers from './setup/SetupPlayers';
import SetupRounds from './setup/SetupRounds';
import SetupTricks from './setup/SetupTricks';

function SetupGame({ initialRef, checkInputs, onSetupEnd }) {
    const { activeStep, goToNext, goToPrevious } = useSteps({
        initialStep: 0,
    });

    const renderStepContent = (step) => {
        switch (step) {
            case 0:
                return <SetupPlayers initialRef={initialRef} checkInputs={checkInputs} onNext={goToNext} />;
            case 1:
                return <SetupRounds onNext={goToNext} onBack={goToPrevious} />;
            case 2:
                return <SetupTricks onBack={goToPrevious} onNext={onSetupEnd} />;
            default:
                return null;
        }
    };

    return (
        <Box>
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
        </Box>
    );
}

export default SetupGame;
