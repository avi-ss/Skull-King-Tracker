import { Badge, Button, Card, CardHeader, CardBody, Heading, Tag, Text, Stack, HStack, CardFooter, useColorMode } from '@chakra-ui/react';
import { CheckIcon } from '@chakra-ui/icons';

function PresetCard({ index, preset, onSelect }) {
    const { colorMode } = useColorMode();

    return (
        <Card key={index} size='sm' variant='elevated' bg={colorMode === 'light' ? `${preset?.color}.50` : `${preset?.color}.900`}>
            <CardHeader>
                <HStack justifyContent='space-between'>
                    <Stack spacing='2' alignItems='self-start'>
                        <Heading as='h4' size='sm'>{preset?.name}</Heading>
                        <Badge colorScheme={preset?.color}>{preset?.gameSpeed}</Badge>
                    </Stack>
                    <Tag size='lg' variant='solid' colorScheme={preset?.color}>{preset?.rounds?.length || '??'}</Tag>
                </HStack>
            </CardHeader>
            <CardBody>
                <Text>{preset.description}</Text>
            </CardBody>
            <CardFooter flexDirection='column'>
                <Button colorScheme={preset?.color} rightIcon={<CheckIcon />} onClick={onSelect}>Seleccionar</Button>
            </CardFooter>
        </Card>
    )
}

export default PresetCard;