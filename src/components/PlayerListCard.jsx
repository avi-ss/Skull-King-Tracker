import { Button, Card, CardHeader, Tag, Text, CardFooter, HStack, SimpleGrid } from '@chakra-ui/react';

function PlayerListCard({ index, scheme, playerNames, onSelect, onDelete }) {

    return (
        <Card key={index} size='sm' variant='elevated' bg={`${scheme}.50`}>
            <CardHeader>
                <HStack justifyContent='space-between'>
                    <Text fontWeight='500'>{playerNames.join(", ")}</Text>
                    <Tag size='lg' colorScheme={scheme}>{playerNames?.length}</Tag>
                </HStack>
            </CardHeader>
            <CardFooter flexDirection='column'>
                <SimpleGrid columns={2} spacing={4}>
                    <Button colorScheme={scheme} variant='outline' onClick={() => onDelete(playerNames)} >
                        Eliminar
                    </Button>
                    <Button colorScheme={scheme} onClick={() => onSelect(playerNames)}>
                        Seleccionar
                    </Button>
                </SimpleGrid>
            </CardFooter>
        </Card>
    )
}

export default PlayerListCard;