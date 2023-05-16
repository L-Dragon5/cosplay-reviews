import { AddIcon, SearchIcon, StarIcon } from '@chakra-ui/icons';
import {
  Badge,
  Box,
  Button,
  Card,
  CardBody,
  Checkbox,
  CheckboxGroup,
  FormControl,
  FormLabel,
  Grid,
  GridItem,
  Heading,
  Image,
  Input,
  InputGroup,
  InputLeftElement,
  LinkBox,
  LinkOverlay,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Stack,
  Stat,
  StatGroup,
  StatHelpText,
  StatLabel,
  StatNumber,
  Text,
  useColorModeValue,
  useDisclosure,
} from '@chakra-ui/react';
import NextLink from 'next/link';
import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';

import { types } from '@/components/data/types';
import FormAddPerson from '@/components/modules/FormAddPerson';

const ReviewsPageList = ({ data, type }) => {
  const [displayData, setDisplayData] = useState(data);
  const [search, setSearch] = useState('');
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { data: session, status } = useSession();

  const modalAddTitle = types.find((t) => t.type === type)?.label;

  useEffect(() => {
    setDisplayData(
      data.filter((obj) =>
        obj.name.toLowerCase().includes(search.toLowerCase()),
      ),
    );
  }, [search]);

  return (
    <>
      <Grid templateColumns=".25fr 1fr" gap={6} h="100%" flexGrow="1">
        <GridItem
          as={Stack}
          borderColor={useColorModeValue('gray.300', 'gray.600')}
          borderRightWidth="1px"
          pr={2}
        >
          <Box
            bgColor={useColorModeValue('white', 'gray.900')}
            borderWidth="1px"
            borderColor={useColorModeValue('gray.300', 'gray.600')}
            borderRadius="md"
            p={2}
          >
            {session && status !== 'loading' ? (
              <Button
                w="100%"
                colorScheme="blue"
                mb={4}
                leftIcon={<AddIcon />}
                onClick={onOpen}
              >
                Add New
              </Button>
            ) : (
              <Button
                as={NextLink}
                href="/api/auth/signin"
                w="100%"
                colorScheme="blue"
                mb={4}
                leftIcon={<AddIcon />}
              >
                Add New
              </Button>
            )}
            <FormControl mb={5}>
              <FormLabel>Search</FormLabel>
              <InputGroup>
                <InputLeftElement pointerEvents="none">
                  <SearchIcon
                    color={useColorModeValue('gray.300', 'gray.600')}
                  />
                </InputLeftElement>
                <Input
                  placeholder="Search"
                  bgColor={useColorModeValue('white', 'gray.700')}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </InputGroup>
            </FormControl>

            <FormControl as="fieldset">
              <FormLabel as="legend">Select Tags</FormLabel>
              <CheckboxGroup maxH="500px" overflow="auto">
                <Stack />
              </CheckboxGroup>
            </FormControl>
          </Box>
        </GridItem>
        <GridItem as={Stack}>
          {displayData?.map((obj) => (
            <LinkBox
              as={Card}
              key={obj.id}
              direction={{ base: 'column', sm: 'row' }}
              overflow="hidden"
              variant="outline"
            >
              <Image
                objectFit="cover"
                maxW={{ base: '100%', sm: '200px' }}
                src="https://placehold.co/600x400"
              />
              <Stack w="100%">
                <CardBody as={LinkOverlay} href={`/profiles/${obj.id}/`}>
                  <Heading size="md" mb={obj.description ? '0' : '9'}>
                    {obj.name}
                  </Heading>
                  {obj.description && (
                    <Text py={2} mb={2} noOfLines={1}>
                      {obj.description}
                    </Text>
                  )}

                  <StatGroup>
                    <Stat>
                      <StatLabel>Cost</StatLabel>
                      <StatNumber>
                        {obj?.avgCost > -1
                          ? `$${obj.avgCost}`
                          : 'Not enough data'}
                      </StatNumber>
                      <StatHelpText>average in USD</StatHelpText>
                    </Stat>
                    <Stat>
                      <StatLabel>Turnaround Time</StatLabel>
                      <StatNumber>
                        {obj?.avgTurnaround > -1
                          ? `${obj.avgTurnaround}`
                          : 'Not enough data'}
                      </StatNumber>
                      <StatHelpText>average in days</StatHelpText>
                    </Stat>
                    <Stat>
                      <StatLabel>Quality</StatLabel>
                      <StatNumber display="flex" alignItems="center">
                        {obj?.avgQuality > -1 ? (
                          <>
                            {obj.avgQuality}
                            <StarIcon boxSize={4} ml={1} />
                          </>
                        ) : (
                          'Not enough data'
                        )}
                      </StatNumber>
                    </Stat>
                    <Stat>
                      <StatLabel>Communication</StatLabel>
                      <StatNumber display="flex" alignItems="center">
                        {obj?.avgCommunication > -1 ? (
                          <>
                            {obj.avgCommunication}
                            <StarIcon boxSize={4} ml={1} />
                          </>
                        ) : (
                          'Not enough data'
                        )}
                      </StatNumber>
                    </Stat>
                  </StatGroup>

                  {obj?.tags && (
                    <Stack direction="row">
                      {obj?.tags?.map((tag) => (
                        <Badge key={`${obj.id}-${tag}`}>{tag}</Badge>
                      ))}
                    </Stack>
                  )}
                </CardBody>
              </Stack>
            </LinkBox>
          ))}
        </GridItem>
      </Grid>

      <Modal isOpen={isOpen} onClose={onClose} size="xl">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add New [{modalAddTitle}]</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormAddPerson type={type} />
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default ReviewsPageList;
