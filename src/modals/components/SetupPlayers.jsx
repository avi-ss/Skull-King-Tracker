import { Input, Button, Text, Stack, HStack, Divider } from '@chakra-ui/react';
import { useGameContext } from '../../context/GameContext';

function SetupPlayers({ initialRef }) {
    const { playerNames, setPlayerNames } = useGameContext();

    const addPlayer = () => {
        setPlayerNames([...playerNames, '']);
    };

    const removePlayer = () => {
        if (playerNames.length > 1) {
            setPlayerNames(playerNames.slice(0, -1));
        }
    };

    const handleNameChange = (event, index) => {
        const newPlayerNames = [...playerNames];
        newPlayerNames[index] = event.target.value;
        setPlayerNames(newPlayerNames);
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
                ref={initialRef}
                placeholder={`Jugador ${index + 1}`}
                value={name}
                onChange={(event) => handleNameChange(event, index)}
                isInvalid={isInputInvalid(index)}
            />
        ));
    };

    return (
        <Stack spacing={3}>
            <Text>
                Introduce el nombre de los jugadores que van a jugar la partida.
            </Text>
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
        </Stack>
    );
}

export default SetupPlayers;
