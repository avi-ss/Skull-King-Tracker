import { useTranslation } from 'react-i18next';
import { Button, Card, CardHeader, Tag, Text, CardFooter, HStack, SimpleGrid, useColorMode } from '@chakra-ui/react';

function PlayerListCard({ index, scheme, playerNames, onSelect, onDelete }) {
    const { t } = useTranslation('global');
    const { colorMode } = useColorMode();

    return (
        <Card key={index} size='sm' variant='elevated' bg={colorMode === 'light' ? `${scheme}.50` : `${scheme}.900`}>
            <CardHeader>
                <HStack justifyContent='space-between'>
                    <Text fontWeight='500'>{playerNames.join(", ")}</Text>
                    <Tag size='lg' colorScheme={scheme}>{playerNames?.length}</Tag>
                </HStack>
            </CardHeader>
            <CardFooter flexDirection='column'>
                <SimpleGrid columns={2} spacing={4}>
                    <Button colorScheme={scheme} variant='outline' onClick={() => onDelete(playerNames)} >
                        {t('button.delete')}
                    </Button>
                    <Button colorScheme={scheme} onClick={() => onSelect(playerNames)}>
                        {t('button.select')}
                    </Button>
                </SimpleGrid>
            </CardFooter>
        </Card>
    )
}

export default PlayerListCard;