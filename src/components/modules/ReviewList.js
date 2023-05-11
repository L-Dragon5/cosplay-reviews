import { SearchIcon, StarIcon } from '@chakra-ui/icons';
import {
  Badge,
  Box,
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
  Stack,
  Stat,
  StatGroup,
  StatHelpText,
  StatLabel,
  StatNumber,
  Text,
} from '@chakra-ui/react';

const ReviewList = ({ data }) => {
  return (
    <Grid templateColumns=".25fr 1fr" gap={6} h="100%" flexGrow="1">
      <GridItem
        as={Stack}
        borderColor="brandGray.300"
        borderRightWidth="1px"
        pr={2}
      >
        <Box
          bgColor="white"
          borderWidth="1px"
          borderColor="gray.300"
          borderRadius="md"
          p={2}
        >
          <FormControl mb={5}>
            <FormLabel>Search</FormLabel>
            <InputGroup>
              <InputLeftElement pointerEvents="none">
                <SearchIcon color="gray.300" />
              </InputLeftElement>
              <Input placeholder="Search" bgColor="white" />
            </InputGroup>
          </FormControl>

          <FormControl as="fieldset">
            <FormLabel as="legend">Select Tags</FormLabel>
            <CheckboxGroup maxH="500px" overflow="auto">
              <Stack>
                <Checkbox value="">Tag 1</Checkbox>
                <Checkbox value="">Tag 2</Checkbox>
              </Stack>
            </CheckboxGroup>
          </FormControl>
        </Box>
      </GridItem>
      <GridItem as={Stack}>
        {data?.map((obj) => (
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
                    <StatNumber>${obj.avgCost}</StatNumber>
                    <StatHelpText>average in USD</StatHelpText>
                  </Stat>
                  <Stat>
                    <StatLabel>Turnaround Time</StatLabel>
                    <StatNumber>{obj.avgTurnaround}</StatNumber>
                    <StatHelpText>average in days</StatHelpText>
                  </Stat>
                  <Stat>
                    <StatLabel>Quality</StatLabel>
                    <StatNumber display="flex" alignItems="center">
                      {obj.ratingQuality}
                      <StarIcon boxSize={4} ml={1} />
                    </StatNumber>
                  </Stat>
                  <Stat>
                    <StatLabel>Communication</StatLabel>
                    <StatNumber display="flex" alignItems="center">
                      {obj.ratingCommunication}
                      <StarIcon boxSize={4} ml={1} />
                    </StatNumber>
                  </Stat>
                  <Stat>
                    <StatLabel>Total</StatLabel>
                    <StatNumber display="flex" alignItems="center">
                      {obj.ratingTotal}
                      <StarIcon boxSize={4} ml={1} />
                    </StatNumber>
                  </Stat>
                </StatGroup>

                <Stack direction="row">
                  {obj?.tags?.map((tag) => (
                    <Badge key={`${obj.id}-${tag}`}>{tag}</Badge>
                  ))}
                </Stack>
              </CardBody>
            </Stack>
          </LinkBox>
        ))}
      </GridItem>
    </Grid>
  );
};

export default ReviewList;
