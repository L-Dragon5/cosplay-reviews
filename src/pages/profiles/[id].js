import { StarIcon } from '@chakra-ui/icons';
import {
  Badge,
  Box,
  Button,
  ButtonGroup,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Container,
  Divider,
  Grid,
  GridItem,
  Heading,
  List,
  ListItem,
  Stack,
  Stat,
  StatGroup,
  StatHelpText,
  StatLabel,
  StatNumber,
  Text,
} from '@chakra-ui/react';
import { useState } from 'react';
import { BsBookmark, BsCamera, BsPencil, BsShare } from 'react-icons/bs';

import AppLayout from '@/components/layouts/AppLayout';

const ReviewCard = ({ review }) => {
  const [expanded, setExpanded] = useState(false);

  const onTextClick = () => {
    if (expanded) {
      setExpanded(false);
    } else {
      setExpanded(true);
    }
  };

  return (
    <Card key={review.id} size="sm">
      <CardHeader>
        <Heading size="md">{review.user}</Heading>
        <Stack direction="row" alignItems="center">
          <Heading size="sm">{review.eventLocation}</Heading>
          <Text>-</Text>
          <Heading size="sm">{review.dateOfShoot}</Heading>
        </Stack>
      </CardHeader>

      <CardBody>
        <Text
          noOfLines={expanded ? 0 : 3}
          cursor="pointer"
          onClick={onTextClick}
        >
          {review.reviewDescription}
        </Text>
      </CardBody>

      <CardFooter>
        <StatGroup gap={2} flexGrow="1">
          <Stat size="sm">
            <StatLabel>Cost</StatLabel>
            <StatNumber>${review.costOfShoot}</StatNumber>
            <StatHelpText>in USD</StatHelpText>
          </Stat>
          <Stat size="sm">
            <StatLabel>Turnaround Time</StatLabel>
            <StatNumber>
              {review.turnaroundTime < 0
                ? 'Never received'
                : review.turnaroundTime}
            </StatNumber>
            <StatHelpText>in days</StatHelpText>
          </Stat>
          <Stat size="sm">
            <StatLabel>Quality</StatLabel>
            <StatNumber display="flex" alignItems="center">
              {review.ratingQuality}
              <StarIcon boxSize={4} ml={1} />
            </StatNumber>
          </Stat>
          <Stat size="sm">
            <StatLabel>Communication</StatLabel>
            <StatNumber display="flex" alignItems="center">
              {review.ratingCommunication}
              <StarIcon boxSize={4} ml={1} />
            </StatNumber>
          </Stat>
        </StatGroup>
      </CardFooter>
    </Card>
  );
};

const IndividualProfileRoute = () => {
  const profileData = {
    id: 1,
    name: 'Photographer A',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque eget ipsum sed erat faucibus sollicitudin. Proin sodales quam nec erat tempus ullamcorper. Sed eget tempor ipsum. Praesent vitae risus maximus, imperdiet ipsum eu, euismod massa. Quisque vel dictum felis. Integer vel sagittis metus, vitae fermentum tortor. Suspendisse mi ligula, condimentum vel purus sed, molestie feugiat massa.',
    ratingQuality: 3.5,
    ratingCommunication: 4,
    ratingTotal: 3.66,
    avgCost: 65,
    avgTurnaround: 12,
    socialIg: '@test',
    tags: ['Professional', 'Composites', 'Lighting Gels', 'Expert Posing'],
    claimed: true,
    reviews: [
      {
        id: '1',
        user: 'Jane Doe',
        anonymous: false,
        ratingQuality: 5,
        ratingCommunication: 4,
        costOfShoot: 50,
        turnaroundTime: 7,
        eventLocation: 'Katsucon 2023',
        dateOfShoot: '2023-02-14',
        reviewDescription:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam nec imperdiet mi. Pellentesque sollicitudin ultrices sapien, aliquam tristique risus auctor a. Vivamus placerat et elit sit amet ultricies. Pellentesque consequat quam metus, at lacinia metus interdum sed. Praesent vel ipsum sed felis consectetur sodales quis mattis lectus. Suspendisse sed placerat nisi, et consectetur lectus. Sed ultrices scelerisque neque ut tincidunt. Donec consectetur sodales est, in aliquet ipsum aliquam vel. Nunc ullamcorper ligula eros, id pretium odio semper vitae.',
      },
      {
        id: '2',
        user: 'Anonymous',
        anonymous: true,
        ratingQuality: 2,
        ratingCommunication: 2,
        costOfShoot: 100,
        turnaroundTime: 30,
        eventLocation: 'Katsucon 2023',
        dateOfShoot: '2023-02-15',
        reviewDescription:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam nec imperdiet mi. Pellentesque sollicitudin ultrices sapien, aliquam tristique risus auctor a. Vivamus placerat et elit sit amet ultricies. Pellentesque consequat quam metus, at lacinia metus interdum sed. Praesent vel ipsum sed felis consectetur sodales quis mattis lectus. Suspendisse sed placerat nisi, et consectetur lectus. Sed ultrices scelerisque neque ut tincidunt. Donec consectetur sodales est, in aliquet ipsum aliquam vel. Nunc ullamcorper ligula eros, id pretium odio semper vitae.',
      },
      {
        id: '3',
        user: 'Jannett Doe',
        anonymous: false,
        ratingQuality: 3,
        ratingCommunication: 3,
        costOfShoot: 60,
        turnaroundTime: 30,
        eventLocation: 'Maryland',
        dateOfShoot: '2023-04-16',
        reviewDescription:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam nec imperdiet mi. Pellentesque sollicitudin ultrices sapien, aliquam tristique risus auctor a. Vivamus placerat et elit sit amet ultricies. Pellentesque consequat quam metus, at lacinia metus interdum sed. Praesent vel ipsum sed felis consectetur sodales quis mattis lectus. Suspendisse sed placerat nisi, et consectetur lectus. Sed ultrices scelerisque neque ut tincidunt. Donec consectetur sodales est, in aliquet ipsum aliquam vel. Nunc ullamcorper ligula eros, id pretium odio semper vitae.',
      },
      {
        id: '4',
        user: 'John Doe',
        anonymous: false,
        ratingQuality: 1,
        ratingCommunication: 1,
        costOfShoot: 200,
        turnaroundTime: -1,
        eventLocation: 'Virginia',
        dateOfShoot: '2023-05-10',
        reviewDescription:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam nec imperdiet mi. Pellentesque sollicitudin ultrices sapien, aliquam tristique risus auctor a. Vivamus placerat et elit sit amet ultricies. Pellentesque consequat quam metus, at lacinia metus interdum sed. Praesent vel ipsum sed felis consectetur sodales quis mattis lectus. Suspendisse sed placerat nisi, et consectetur lectus. Sed ultrices scelerisque neque ut tincidunt. Donec consectetur sodales est, in aliquet ipsum aliquam vel. Nunc ullamcorper ligula eros, id pretium odio semper vitae.',
      },
    ],
  };

  return (
    <Container maxW="1280px" p={4}>
      <Grid gridTemplateColumns="1fr .25fr" gap={6} h="100%" flexGrow="1">
        <GridItem p={2}>
          <Heading size="2xl" mb={3}>
            {profileData.name}
            {profileData.claimed && (
              <Badge colorScheme="brandPrimary" fontSize="xl" ml={4}>
                Claimed
              </Badge>
            )}
          </Heading>
          <Text>{profileData.description}</Text>
          <ButtonGroup spacing={3} my={3}>
            <Button colorScheme="brandSecondary" leftIcon={<BsPencil />}>
              Write a review
            </Button>
            <Button
              colorScheme="white"
              variant="outline"
              leftIcon={<BsShare />}
            >
              Share
            </Button>
            <Button
              colorScheme="white"
              variant="outline"
              leftIcon={<BsBookmark />}
            >
              Save
            </Button>
          </ButtonGroup>
          <Divider />

          <Heading my={2}>Reviews</Heading>
          <Stack gap={2}>
            {profileData?.reviews?.map((review) => (
              <ReviewCard key={review.id} review={review} />
            )) ?? 'No reviews available'}
          </Stack>
        </GridItem>
        <GridItem>
          <Box p={2} bgColor="gray.200" position="sticky" top={4}>
            <StatGroup
              flexDirection="column"
              bgColor="white"
              borderRadius="md"
              borderColor="gray.300"
              borderWidth="1px"
              p={2}
              gap={3}
            >
              <Stat>
                <StatLabel>Cost</StatLabel>
                <StatNumber>${profileData.avgCost}</StatNumber>
                <StatHelpText>average in USD</StatHelpText>
              </Stat>
              <Stat>
                <StatLabel>Turnaround Time</StatLabel>
                <StatNumber>{profileData.avgTurnaround}</StatNumber>
                <StatHelpText>average in days</StatHelpText>
              </Stat>
              <Stat>
                <StatLabel>Quality</StatLabel>
                <StatNumber display="flex" alignItems="center">
                  {profileData.ratingQuality}
                  <StarIcon boxSize={4} ml={1} />
                </StatNumber>
              </Stat>
              <Stat>
                <StatLabel>Communication</StatLabel>
                <StatNumber display="flex" alignItems="center">
                  {profileData.ratingCommunication}
                  <StarIcon boxSize={4} ml={1} />
                </StatNumber>
              </Stat>
              <Stat>
                <StatLabel>Total</StatLabel>
                <StatNumber display="flex" alignItems="center">
                  {profileData.ratingTotal}
                  <StarIcon boxSize={4} ml={1} />
                </StatNumber>
              </Stat>
            </StatGroup>

            <Heading size="lg" mt={4} mb={2}>
              Tags
            </Heading>
            <List spacing={3}>
              {profileData?.tags.map((tag) => (
                <ListItem key={tag} fontSize="lg">
                  {tag}
                </ListItem>
              ))}
            </List>
          </Box>
        </GridItem>
      </Grid>
    </Container>
  );
};

IndividualProfileRoute.getLayout = function getLayout(page) {
  return <AppLayout title="Profile">{page}</AppLayout>;
};

export default IndividualProfileRoute;
