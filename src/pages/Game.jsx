import React from 'react';
import { useState } from 'react';
import { useGameContext } from '../context/GameContext';
import RoundInput from '../components/RoundInput';
import { Button, Card, CardHeader, CardBody, Tag, Text, Stack, Divider } from '@chakra-ui/react';

function Game() {
    const { playerNames, tricksPerRound, numRounds } = useGameContext();
    const [currentRound, setCurrentRound] = useState(0);

    const changeBid = (key, index, valueAsNumber) => {
        console.log(key, index, valueAsNumber);
    }

    const changeResults = (key, index, valueAsNumber) => {
        console.log(key, index, valueAsNumber);
    }

    const previousRound = () => {
        if (currentRound > 0) {
            setCurrentRound(currentRound - 1);
        }
    }

    const nextRound = () => {
        if (currentRound < numRounds) {
            setCurrentRound(currentRound + 1);
        }
        else {
            console.log("Se acabó el juego");
        }
    }

    const renderPlayerCards = () => {
        return playerNames.map((name, index) => (
            <Card key={index} size='sm'>
                <CardHeader><Tag>{name}</Tag></CardHeader>
                <CardBody>
                    <Text fontSize="xl">Apuesta</Text>
                    <RoundInput name={name} index={index} onChange={changeBid} ></RoundInput>
                    <Divider></Divider>
                    <Text fontSize="xl">Resultado</Text>
                    <RoundInput name={name} index={index} onChange={changeResults} ></RoundInput>
                </CardBody>
            </Card>
        ));
    };

    return (<Stack spacing={4}>
        {renderPlayerCards()}
        <Stack>
            <Button colorScheme='twitter' variant="outline" onClick={previousRound}>
                Atrás
            </Button>
            <Button colorScheme='twitter' onClick={nextRound}>
                Siguiente
            </Button>
        </Stack>
    </Stack>);
}

export default Game