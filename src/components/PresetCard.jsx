import { IconButton, Badge, Button, Card, CardHeader, CardBody, Heading, Tag, Text, Stack, HStack, CardFooter } from '@chakra-ui/react';
import { CheckIcon } from '@chakra-ui/icons';

function PresetCard({ index, preset, onSelect }) {

    return (
        <Card key={index} size='sm' variant='filled'>
            <CardHeader>
                <HStack justifyContent='space-between'>
                    <Stack spacing='2' alignItems='self-start'>
                        <Heading as='h4' size='sm'>{preset.name}</Heading>
                        <Badge colorScheme={preset.color}>{preset.gameSpeed}</Badge>
                    </Stack>
                    <Tag size='lg' colorScheme={preset.color}>{preset?.rounds?.length || '??'}</Tag>
                </HStack>
            </CardHeader>
            <CardBody>
                <Text>{preset.description}</Text>
            </CardBody>
            <CardFooter flexDirection='column'>
                <Button colorScheme='twitter' rightIcon={<CheckIcon />} onClick={onSelect}>Seleccionar</Button>
            </CardFooter>
        </Card>
    )
}

export default PresetCard;