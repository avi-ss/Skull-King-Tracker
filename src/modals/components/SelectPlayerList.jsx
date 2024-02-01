import React, { useEffect, useState } from 'react';
import { Heading, Text, Stack, useToast, Alert, AlertDescription, AlertIcon } from '@chakra-ui/react';
import PlayerListCard from '../../components/PlayerListCard';
import { useGameContext } from '../../context/GameContext';

import { useTranslation } from 'react-i18next';
import { randomColors } from '../../utils/colors';
import storage from '../../utils/storage';

function SelectPlayerList({ onSelectList }) {
    const { playerLists, setPlayerLists } = useGameContext();
    const { t } = useTranslation('global');
    const [colors, setColors] = useState([]);
    const toast = useToast();

    useEffect(() => {
        setColors(randomColors(playerLists.length));
    }, [playerLists])

    const onSelectPlayerList = (playerList) => {
        onSelectList(playerList);
    }

    const onDeletePlayerList = (playerList) => {
        // Convertir la lista de jugadores a un string JSON para comparar
        const playerListString = JSON.stringify(playerList);

        // Recorrer todas las claves en localStorage
        for (let i = 0; i < localStorage.length; i++) {
            const key = localStorage.key(i);
            // Obtener el valor de la key actual y compararlo con la lista de jugadores
            const valor = localStorage.getItem(key);

            if (valor === playerListString) {
                // Si encontramos una coincidencia, eliminar la lista de localStorage
                localStorage.removeItem(key);
                setPlayerLists(storage.getPlayerLists());
                toast({
                    title: t('selectPlayerList.toast.title'),
                    description: t('selectPlayerList.toast.description'),
                    status: 'info',
                    duration: 2000,
                    isClosable: true,
                });
                break; // Salir del bucle una vez que se encuentra la lista
            }
        }
    };

    const renderPlayerLists = () => {
        if (playerLists.length) {
            return playerLists.map((value, index) => (
                <PlayerListCard key={index} index={index} scheme={colors[index]?.scheme} playerNames={value} onSelect={onSelectPlayerList} onDelete={onDeletePlayerList}></PlayerListCard>
            ))
        }
        else {
            return (
                <Alert status='info'>
                    <AlertIcon />
                    <AlertDescription>{t('selectPlayerList.noPlayerLists')}</AlertDescription>
                </Alert>
            )
        }
    }

    return (
        <Stack spacing={3}>
            <Heading as='h3' size='md'>{t('selectPlayerList.header')}</Heading>
            <Text>
                {t('selectPlayerList.description')}
            </Text>
            {renderPlayerLists()}
        </Stack>
    );
}

export default SelectPlayerList;
