import React from 'react';

import RoundInput from '../components/RoundInput';
import { Avatar, Badge, ButtonGroup, IconButton, Button, Card, CardHeader, CardBody, Heading, Tag, Text, Stack, HStack, Collapse, useColorMode} from '@chakra-ui/react';
import { GiPirateCaptain, GiPirateFlag, GiMermaid, GiOpenTreasureChest } from "react-icons/gi";
import { RepeatIcon } from '@chakra-ui/icons';

const ICON_SIZE = '26px';

function PlayerCard({ name, index, points, palette, currentResults, maxTricks, onChangeBid, onChangeResults, onCaptureSkullKing, onCapturePirate, onCaptureMermaid, onGetAdditionalPoints, onResetScore }) {
    const { colorMode } = useColorMode();

    const hasSpecialBadges = () => {
        const {
            captured = { pirate: 0, mermaid: 0, skullKing: 0 },
            additionalPoints = 0
        } = currentResults || {};
        const { pirate = 0, mermaid = 0, skullKing = 0 } = captured;

        return (pirate > 0 || mermaid > 0 || skullKing > 0 || Math.abs(additionalPoints) > 0);
    }

    const renderSpecialBadges = () => {
        const {
            captured = { pirate: 0, mermaid: 0, skullKing: 0 },
            additionalPoints = 0
        } = currentResults || {};
        const { pirate = 0, mermaid = 0, skullKing = 0 } = captured;

        const badges = [];

        if (pirate > 0) {
            badges.push(<Badge key="pirate" colorScheme="red">{pirate === 1 ? 'Pirata' : `${pirate} Piratas`}</Badge>);
        }
        if (mermaid > 0) {
            badges.push(<Badge key="mermaid" colorScheme="teal">{mermaid === 1 ? 'Sirena' : `${mermaid} Sirenas`}</Badge>);
        }
        if (skullKing > 0) {
            badges.push(<Badge key="skullKing" colorScheme="blue">{skullKing === 1 ? 'SKULL K' : `${skullKing} SKULL K`}</Badge>);
        }
        if (Math.abs(additionalPoints) > 0) {
            badges.push(<Badge key="points" colorScheme="purple" variant={additionalPoints < 0 ? 'outline' : 'subtle'}>{additionalPoints} puntos</Badge>);
        }

        return <HStack mt='3'>{badges}</HStack>;
    }

    return (
        <Card key={index} size='sm' variant='elevated' padding={2} bg={colorMode === 'light' ? `${palette?.scheme}.50` : `${palette?.scheme}.900`}>
            <CardHeader>
                <Stack gap='0'>
                    <HStack justifyContent='space-between'>
                        <HStack gap='3'>
                            <Avatar size='sm' bg={palette?.avatar} />
                            <Heading as='h3' size='md'>{name}</Heading>
                            <IconButton size='sm' fontSize={ICON_SIZE} colorScheme={palette?.scheme} variant="ghost" icon={<RepeatIcon />} onClick={onResetScore(index)}></IconButton>
                        </HStack>
                        <Tag size='lg' colorScheme={palette?.scheme} variant='solid'>{points}</Tag>
                    </HStack>
                    <Collapse in={hasSpecialBadges()} animateOpacity>
                        {renderSpecialBadges()}
                    </Collapse>
                </Stack>
            </CardHeader>
            <CardBody>
                <Stack spacing={3}>
                    <Stack spacing={1}>
                        <Text fontSize="md" fontWeight='600'>Apuesta</Text>
                        <RoundInput name={name} scheme={palette?.scheme} index={index} value={currentResults?.bid || 0} defaultValue={0} min={0} max={maxTricks} onChange={onChangeBid} ></RoundInput>
                    </Stack>
                    <Stack spacing={1}>
                        <Text fontSize="md" fontWeight='600'>Resultado</Text>
                        <RoundInput name={name} scheme={palette?.scheme} index={index} value={currentResults?.result || 0} defaultValue={0} min={0} max={maxTricks} onChange={onChangeResults} ></RoundInput>
                    </Stack>
                    <Stack spacing={1}>
                        <Text fontSize="md" fontWeight='600'>Bonus</Text>
                        <HStack justifyContent='space-between'>
                            <ButtonGroup size='md' isAttached>
                                <IconButton isDisabled={(currentResults?.bid || 0) === 0} colorScheme='facebook' fontSize={ICON_SIZE} icon={<GiPirateCaptain />} onClick={onCaptureSkullKing(index)}></IconButton>
                                <IconButton isDisabled={(currentResults?.bid || 0) === 0} colorScheme='red' fontSize={ICON_SIZE} icon={<GiPirateFlag />} onClick={onCapturePirate(index)}></IconButton>
                                <IconButton isDisabled={(currentResults?.bid || 0) === 0} colorScheme='teal' fontSize={ICON_SIZE} icon={<GiMermaid />} onClick={onCaptureMermaid(index)}></IconButton>
                                <IconButton colorScheme='yellow' fontSize={ICON_SIZE} icon={<GiOpenTreasureChest />} onClick={onGetAdditionalPoints(index, 20)}></IconButton>
                            </ButtonGroup>
                            <ButtonGroup size='md' isAttached>
                                <Button isDisabled={(currentResults?.bid || 0) === 0} colorScheme={palette?.scheme} onClick={onGetAdditionalPoints(index, 10)}>+10</Button>
                                <Button colorScheme={palette?.scheme} variant="outline" onClick={onGetAdditionalPoints(index, -10)}>-10</Button>
                            </ButtonGroup>
                        </HStack>
                    </Stack>
                </Stack>
            </CardBody>
        </Card>
    )
}

export default PlayerCard;