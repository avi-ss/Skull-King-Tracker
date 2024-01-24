import { useState } from 'react';
import { Input, Button, useToast, Stack, HStack, Divider } from '@chakra-ui/react';
import { useGameContext } from '../../context/GameContext';

function SelectPlayers({ onNext }) {
    const [numPlayers, setNumPlayers] = useState(1);
    const { playerNames, setPlayerNames } = useGameContext();
    const toast = useToast();

    const addPlayer = () => {
        setNumPlayers(numPlayers + 1);
        setPlayerNames([...playerNames, '']);
    };

    const removePlayer = () => {
        if (numPlayers > 1) {
            setNumPlayers(numPlayers - 1);
            setPlayerNames(playerNames.slice(0, -1));
        }
    };

    const handleNameChange = (event, index) => {
        const newPlayerNames = [...playerNames];
        newPlayerNames[index] = event.target.value;
        setPlayerNames(newPlayerNames);
    };

    const nextStep = () => {
        const nameSet = new Set(playerNames);
        const areAllNamesUnique = nameSet.size === playerNames.length;
        const areAllNamesFilled = playerNames.every((name) => name.trim() !== '');

        if (areAllNamesFilled && areAllNamesUnique) {
            console.log('¡Todos los nombres están llenos y son únicos! Puedes comenzar el juego.');
            onNext();
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

    const isInputInvalid = (index) => {
        const name = playerNames[index];
        const isNameDuplicate = playerNames.indexOf(name) !== index;
        return name.trim() === '' || isNameDuplicate;
    };

    const renderInputs = () => {
        return playerNames.map((name, index) => (
            <Input
                key={index}
                placeholder={`Jugador ${index + 1}`}
                value={name}
                onChange={(event) => handleNameChange(event, index)}
                isInvalid={isInputInvalid(index)}
            />
        ));
    };

    return (
        <Stack spacing={3}>
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
            <Button colorScheme='twitter' onClick={nextStep}>
                Siguiente
            </Button>
        </Stack>
    );
}

export default SelectPlayers;
