import React, { useState, useEffect } from 'react';
import { useGameContext } from '../context/GameContext';
import { Button, Heading, Tag, Stack, HStack, useToast, SimpleGrid, Wrap, WrapItem } from '@chakra-ui/react';
import { InfoIcon } from '@chakra-ui/icons';
import { GiKrakenTentacle } from 'react-icons/gi';

import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
} from '@chakra-ui/react'

import {
    AlertDialog,
    AlertDialogBody,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogContent,
    AlertDialogOverlay,
} from '@chakra-ui/react'

import {
    Table,
    Thead,
    Tbody,
    Tr,
    Th,
    Td,
    TableContainer,
} from '@chakra-ui/react'

import { randomColors } from '../utils/colors';
import PlayerCard from '../components/PlayerCard';

function Game({ onRoundChange, onGameExit }) {
    const { playerNames, tricksPerRound, numRounds, width, strictMode } = useGameContext();
    const [isLeaderboardOpen, setLeaderboardOpen] = useState(false);
    const [currentRound, setCurrentRound] = useState(0);
    const [palettes, setPalettes] = useState([]);
    const [playerScores, setPlayerScores] = useState([]);
    const [isGameFinished, setGameFinished] = useState(false);

    const [isExitGameAlertOpen, setExitGameAlertOpen] = useState(false);
    const [isPrevRoundAlertOpen, setPrevRoundAlertOpen] = useState(false);
    const [isStrictModeAlertOpen, setStrictModeAlertOpen] = useState(false);
    const [strictModeDiff, setStrictModeDiff] = useState(0);

    const toast = useToast();

    useEffect(() => {
        const initialScores = playerNames.map(name => ({
            name,
            roundScores: Array.from({ length: numRounds }, () => ({
                bid: 0,
                result: 0,
                captured: {
                    pirate: 0,
                    skullKing: 0,
                    mermaid: 0,
                },
                additionalPoints: 0
            })),
            totalScore: 0
        }));
        const colorPalettes = randomColors(numRounds);
        setPalettes(colorPalettes);
        setPlayerScores(initialScores);
    }, [playerNames, numRounds]);

    useEffect(() => {
        onRoundChange(); // Llamamos al padre
    }, [currentRound])

    const changeBid = (_, index, valueAsNumber) => {
        setPlayerScores(prevScores => {
            const newScores = [...prevScores];
            newScores[index].roundScores[currentRound].bid = valueAsNumber;

            // Reseteamos los valores si la apuesta es 0
            if (valueAsNumber === 0) {
                newScores[index].roundScores[currentRound].captured = {
                    pirate: 0,
                    skullKing: 0,
                    mermaid: 0,
                };
            }

            return newScores;
        });
    };

    const changeResults = (_, index, valueAsNumber) => {
        setPlayerScores(prevScores => {
            const newScores = [...prevScores];
            newScores[index].roundScores[currentRound].result = valueAsNumber;
            return newScores;
        });
    };

    const captureSkullKing = (index) => () => {
        setPlayerScores(prevScores => {
            const newScores = [...prevScores];
            newScores[index].roundScores[currentRound].captured.skullKing += 1;
            return newScores;
        });
    }

    const capturePirate = (index) => (_) => {
        setPlayerScores(prevScores => {
            const newScores = [...prevScores];
            newScores[index].roundScores[currentRound].captured.pirate += 1;
            return newScores;
        });
    }

    const captureMermaid = (index) => (_) => {
        setPlayerScores(prevScores => {
            const newScores = [...prevScores];
            newScores[index].roundScores[currentRound].captured.mermaid += 1;
            return newScores;
        });
    }

    const getAdditionalPoints = (index, points) => (_) => {
        setPlayerScores(prevScores => {
            const newScores = [...prevScores];
            newScores[index].roundScores[currentRound].additionalPoints += points;
            return newScores;
        });
    }

    const resetCurrentScore = (index) => (_) => {
        setPlayerScores(prevScores => {
            const newScores = [...prevScores];
            newScores[index].roundScores[currentRound] = {
                bid: 0,
                result: 0,
                captured: {
                    pirate: 0,
                    skullKing: 0,
                    mermaid: 0,
                },
                additionalPoints: 0
            };

            toast({
                title: 'Info',
                description: `Se han reseteado los valores de ${playerNames[index]}.`,
                status: 'info',
                duration: 1500,
                isClosable: true,
            });

            return newScores;
        });
    }

    const calculateRoundPoints = (index, currentRound) => {
        const {
            bid = 0,
            result = 0,
            captured = { pirate: 0, mermaid: 0, skullKing: 0 },
            additionalPoints = 0
        } = playerScores?.[index]?.roundScores?.[currentRound] || {};

        const { pirate = 0, mermaid = 0, skullKing = 0 } = captured;

        const specialPoints = pirate * 30 + mermaid * 20 + skullKing * 40 + additionalPoints;
        const totalTricksPoints = tricksPerRound[currentRound] * 10;

        let roundScore = 0;

        if (bid === 0) {
            roundScore = (result > 0) ? -totalTricksPoints : totalTricksPoints + specialPoints;
        } else {
            const bidDifference = Math.abs(bid - result) * 10;
            roundScore = (bid === result) ? bid * 20 + specialPoints : -bidDifference;
        }

        return roundScore;
    };

    const checkNextRound = () => {
        // Con el modo estricto se comprueban que los resultados sean aceptables
        if (strictMode && !isGameFinished) {
            const roundsPlayed = tricksPerRound[currentRound];
            const roundsWonByPlayers = playerScores.reduce((acc, score) => {
                acc += score.roundScores[currentRound].result;
                return acc;
            }, 0)

            if (roundsWonByPlayers > roundsPlayed) {
                toast({
                    title: 'Modo estricto',
                    description: `No se pueden ganar ${roundsWonByPlayers} manos en una ronda de ${roundsPlayed} cartas.`,
                    status: 'error',
                    duration: 1500,
                    isClosable: true,
                });
            }
            else if (roundsWonByPlayers < roundsPlayed) {
                setStrictModeDiff(roundsPlayed - roundsWonByPlayers);
                setStrictModeAlertOpen(true);
            }
            else {
                nextRound();
            }
        }
        // En caso contrario, se calcula y se pasa de ronda
        else {
            nextRound();
        }
    }

    const nextRound = () => {
        if (!isGameFinished) {
            setPlayerScores(prevScores => {
                const newFinalScores = [...prevScores];
                newFinalScores.forEach((_, index) => {
                    newFinalScores[index].totalScore += calculateRoundPoints(index, currentRound);
                })
                return newFinalScores;
            });
            toast({
                title: 'Siguiente ronda',
                description: `Se ha actualizado correctamente la tabla de puntuaciones.`,
                status: 'success',
                duration: 1500,
                isClosable: true,
            });
        }
        if (currentRound + 1 < numRounds) {
            setCurrentRound(currentRound + 1);
        }
        else {
            setGameFinished(true);
            setLeaderboardOpen(true);
        }
    }

    const calculatePreviousRound = () => {
        setPrevRoundAlertOpen(false);

        if (currentRound > 0) {
            // TODO: Resetear valores de la ultima ronda
            setPlayerScores(prevScores => {
                const newScores = [...prevScores];
                newScores.forEach((_, index) => {
                    // Resto los puntos de la ronda anterior
                    newScores[index].totalScore -= calculateRoundPoints(index, currentRound - 1);
                    // Reseteo los puntos de la ronda anterior
                    newScores[index].roundScores[currentRound - 1] = {
                        bid: 0,
                        result: 0,
                        captured: {
                            pirate: 0,
                            skullKing: 0,
                            mermaid: 0,
                        },
                        additionalPoints: 0
                    };
                })
                toast({
                    title: 'Anterior ronda',
                    description: `Se ha actualizado correctamente la tabla de puntuaciones.`,
                    status: 'success',
                    duration: 1500,
                    isClosable: true,
                });
                return newScores;
            });

            setCurrentRound(currentRound - 1);
        }
    }

    const renderPoints = (index) => {
        const points = calculateRoundPoints(index, currentRound);
        return isNaN(points) ? "🤐" : points;
    };

    const renderPlayerCards = () => {
        return playerNames.map((name, index) => {
            const points = renderPoints(index);
            const colorPalette = palettes[index];

            return (
                <WrapItem key={index} padding='1'>
                    <PlayerCard key={index} name={name} index={index} points={points} maxTricks={tricksPerRound[currentRound]} palette={colorPalette} currentResults={playerScores?.[index]?.roundScores?.[currentRound] || {}}
                        onChangeBid={changeBid} onChangeResults={changeResults} onCaptureSkullKing={captureSkullKing}
                        onCapturePirate={capturePirate} onCaptureMermaid={captureMermaid} onGetAdditionalPoints={getAdditionalPoints} onResetScore={resetCurrentScore}
                    ></PlayerCard>
                </WrapItem>
            )
        });
    };

    const renderLeaderboardModal = () => {
        return (
            <Modal size={width > 600 ? 'lg' : 'full'} isOpen={isLeaderboardOpen} onClose={() => setLeaderboardOpen(false)}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Tabla de clasificación</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <TableContainer>
                            <Table variant='simple'>
                                <Thead>
                                    <Tr>
                                        <Th>Puesto</Th>
                                        <Th>Jugador</Th>
                                        <Th>Puntos</Th>
                                    </Tr>
                                </Thead>
                                <Tbody>
                                    {
                                        [...playerScores]
                                            .sort((a, b) => b.totalScore - a.totalScore)
                                            .map((player, index) => (
                                                <Tr key={player.name}>
                                                    <Td>{index + 1}</Td>
                                                    <Td>{player.name}</Td>
                                                    <Td>{player.totalScore}</Td>
                                                </Tr>
                                            ))
                                    }
                                </Tbody>
                            </Table>
                        </TableContainer>
                    </ModalBody>
                    <ModalFooter flexDirection='column' alignItems='stretch'>
                        <Stack>
                            <Button colorScheme='blue' variant={isGameFinished ? 'outline' : 'solid'} onClick={() => setLeaderboardOpen(false)}>
                                Cerrar
                            </Button>
                            {isGameFinished && <Button colorScheme='blue' onClick={onGameExit}>Volver al menú</Button>}
                        </Stack>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        )
    }

    const renderStrictModeAlert = () => {
        const cancelRef = React.useRef()

        return (
            <AlertDialog
                isOpen={isStrictModeAlertOpen}
                leastDestructiveRef={cancelRef}
                onClose={() => setStrictModeAlertOpen(false)}
                isCentered
            >
                <AlertDialogOverlay>
                    <AlertDialogContent>
                        <AlertDialogHeader fontSize='lg' fontWeight='bold'>
                            Aviso de Kraken
                        </AlertDialogHeader>
                        <AlertDialogBody>
                            En esta ronda ha habido <b>{strictModeDiff}</b> ronda(s) jugada(s) que nadie ha ganado. Por favor, comprueba que los resultados están bien.
                        </AlertDialogBody>
                        <AlertDialogFooter>
                            <Button ref={cancelRef} onClick={() => setStrictModeAlertOpen(false)}>
                                Cancelar
                            </Button>
                            <Button colorScheme='red' rightIcon={<GiKrakenTentacle />} onClick={() => {
                                setStrictModeAlertOpen(false);
                                nextRound()
                            }} ml={3}>
                                Kraken
                            </Button>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialogOverlay>
            </AlertDialog>
        )
    }

    const renderExitGameAlert = () => {
        const cancelRef = React.useRef()

        return (
            <AlertDialog
                isOpen={isExitGameAlertOpen}
                leastDestructiveRef={cancelRef}
                onClose={() => setExitGameAlertOpen(false)}
                isCentered
            >
                <AlertDialogOverlay>
                    <AlertDialogContent>
                        <AlertDialogHeader fontSize='lg' fontWeight='bold'>
                            Salir de la partida
                        </AlertDialogHeader>
                        <AlertDialogBody>
                            ¿Estás seguro de que quieres salir de la partida? Volverás al menú de selección.
                        </AlertDialogBody>
                        <AlertDialogFooter>
                            <Button ref={cancelRef} onClick={() => setExitGameAlertOpen(false)}>
                                Cancelar
                            </Button>
                            <Button colorScheme='red' onClick={() => {
                                setExitGameAlertOpen(false);
                                onGameExit()
                            }} ml={3}>
                                Salir
                            </Button>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialogOverlay>
            </AlertDialog>
        )
    }

    const renderPreviousRoundAlert = () => {
        const cancelRef = React.useRef()

        return (
            <AlertDialog
                isOpen={isPrevRoundAlertOpen}
                leastDestructiveRef={cancelRef}
                onClose={() => setPrevRoundAlertOpen(false)}
            >
                <AlertDialogOverlay>
                    <AlertDialogContent>
                        <AlertDialogHeader fontSize='lg' fontWeight='bold'>
                            Aviso de progreso
                        </AlertDialogHeader>

                        <AlertDialogBody>
                            ¿Estás seguro de que quieres volver atrás? Esto eliminará el progreso de la última ronda jugada.
                        </AlertDialogBody>

                        <AlertDialogFooter>
                            <Button ref={cancelRef} onClick={() => setPrevRoundAlertOpen(false)}>
                                Cancelar
                            </Button>
                            <Button colorScheme='red' onClick={calculatePreviousRound} ml={3}>
                                Confirmar
                            </Button>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialogOverlay>
            </AlertDialog>
        )
    }

    return (
        <>
            <Stack spacing='4'>
                <Button size='md' leftIcon={<InfoIcon />} colorScheme='twitter' variant="outline" onClick={() => setLeaderboardOpen(true)}>
                    Clasificación
                </Button>
                <HStack justifyContent='space-between'>
                    <Heading as='h2' size='lg'>Ronda {currentRound + 1} de {numRounds}</Heading>
                    <Tag size='lg' colorScheme='twitter'>{tricksPerRound[currentRound]} {tricksPerRound[currentRound] === 1 ? 'baza' : 'bazas'}</Tag>
                </HStack>
                <Wrap justify='center'>
                    {renderPlayerCards()}
                </Wrap>
                <Stack>
                    <SimpleGrid columns={2} spacing={4}>
                        <Button colorScheme='red' variant="outline" onClick={() => setExitGameAlertOpen(true)}>
                            Salir
                        </Button>
                        <Button colorScheme='twitter' variant="outline" isDisabled={currentRound === 0 || isGameFinished} onClick={() => setPrevRoundAlertOpen(true)}>
                            Atrás
                        </Button>
                    </SimpleGrid>
                    <Button colorScheme='twitter' onClick={checkNextRound}>
                        {currentRound + 1 === numRounds ? 'Finalizar' : 'Siguiente'}
                    </Button>
                </Stack>
            </Stack>
            {renderLeaderboardModal()}
            {renderStrictModeAlert()}
            {renderExitGameAlert()}
            {renderPreviousRoundAlert()}
        </>
    );
}

export default Game