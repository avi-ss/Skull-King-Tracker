import React from 'react';
import { useState, useEffect, useDisclosure } from 'react';
import { useGameContext } from '../context/GameContext';
import { Button, Heading, Tag, Stack, HStack } from '@chakra-ui/react';
import { InfoIcon } from '@chakra-ui/icons';

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
    Table,
    Thead,
    Tbody,
    Tr,
    Th,
    Td,
    TableContainer,
} from '@chakra-ui/react'

import { assignColors } from '../utils/colors';
import PlayerCard from '../components/PlayerCard';

function Game() {
    const { playerNames, tricksPerRound, numRounds } = useGameContext();
    const [isLeaderboardOpen, setLeaderboardOpen] = useState(false);
    const [currentRound, setCurrentRound] = useState(0);
    const [avatarColors, setAvatarColors] = useState([]);
    const [playerScores, setPlayerScores] = useState([]);

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
        setAvatarColors(assignColors(numRounds));
        setPlayerScores(initialScores);
    }, [playerNames, numRounds]);

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

    const getAdditionalPoints = (index) => (_) => {
        setPlayerScores(prevScores => {
            const newScores = [...prevScores];
            newScores[index].roundScores[currentRound].additionalPoints += 10;
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
            return newScores;
        });
    }

    const calculateRoundPoints = (index) => {
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

    const previousRound = () => {
        if (currentRound > 0) {
            setCurrentRound(currentRound - 1);
        }
    }

    const nextRound = () => {
        if (currentRound + 1 < numRounds) {
            setPlayerScores(prevScores => {
                const newFinalScores = [...prevScores];
                newFinalScores.forEach((_, index) => {
                    newFinalScores[index].totalScore += calculateRoundPoints(index);
                })
                return newFinalScores;
            });
            setCurrentRound(currentRound + 1);
        }
        else {
            console.log("Se acabó el juego");
        }
    }

    const renderPoints = (index) => {
        const points = calculateRoundPoints(index);
        return isNaN(points) ? "🤐" : points;
    };

    const renderPlayerCards = () => {
        return playerNames.map((name, index) => {
            const points = renderPoints(index);
            const avatarColor = avatarColors[index]

            return (
                <PlayerCard key={index} name={name} index={index} points={points} maxTricks={tricksPerRound[currentRound]} avatarColor={avatarColor} currentResults={playerScores?.[index]?.roundScores?.[currentRound] || {}}
                    onChangeBid={changeBid} onChangeResults={changeResults} onCaptureSkullKing={captureSkullKing}
                    onCapturePirate={capturePirate} onCaptureMermaid={captureMermaid} onGetAdditionalPoints={getAdditionalPoints} onResetScore={resetCurrentScore}
                ></PlayerCard>
            )
        });
    };

    const renderLeaderboardModal = () => {
        return (
            <Modal size='sm' isOpen={isLeaderboardOpen} onClose={() => setLeaderboardOpen(false)}>
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
                    <ModalFooter>
                        <Button colorScheme='blue' onClick={() => setLeaderboardOpen(false)}>
                            Cerrar
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        )
    }

    return (
        <>
            <Stack spacing={4}>
                <HStack justifyContent='space-between'>
                    <Heading as='h1' size='xl'>Ronda {currentRound + 1} de {numRounds}</Heading>
                    <Tag size='lg' colorScheme='twitter'>{tricksPerRound[currentRound]} bazas</Tag>
                </HStack>
                <Button size='md' leftIcon={<InfoIcon />} colorScheme='twitter' variant="outline" onClick={() => setLeaderboardOpen(true)}>
                    Clasificación
                </Button>
                {renderPlayerCards()}
                <Stack>
                    <Button colorScheme='twitter' variant="outline" onClick={previousRound}>
                        Atrás
                    </Button>
                    <Button colorScheme='twitter' onClick={nextRound}>
                        Siguiente
                    </Button>
                </Stack>
            </Stack>
            {renderLeaderboardModal()}
        </>
    );
}

export default Game