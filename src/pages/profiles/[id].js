import { StarIcon } from '@chakra-ui/icons';
import {
  Badge,
  Box,
  Button,
  ButtonGroup,
  Container,
  Divider,
  Grid,
  GridItem,
  Heading,
  IconButton,
  Link,
  List,
  ListItem,
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
import { BsBookmark, BsPencil, BsShare } from 'react-icons/bs';
import { FaFacebook, FaInstagram, FaLink, FaTwitter } from 'react-icons/fa';

import AppLayout from '@/components/layouts/AppLayout';
import FormCreateReview from '@/components/modules/FormCreateReview';
import ReviewCard from '@/components/modules/ReviewCard';

const IndividualProfileRoute = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const profileData = {
    id: 1,
    type: 'photo',
    name: 'Photographer A',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque eget ipsum sed erat faucibus sollicitudin. Proin sodales quam nec erat tempus ullamcorper. Sed eget tempor ipsum. Praesent vitae risus maximus, imperdiet ipsum eu, euismod massa. Quisque vel dictum felis. Integer vel sagittis metus, vitae fermentum tortor. Suspendisse mi ligula, condimentum vel purus sed, molestie feugiat massa.',
    avgQuality: 3.5,
    avgCommunication: 2.5,
    avgCost: 102.5,
    avgTurnaround: 22,
    socialInstagram: 'test',
    socialFacebook: 'test',
    socialTwitter: 'test',
    socialWebsite: 'https://www.google.com/',
    tags: ['Professional', 'Composites', 'Lighting Gels', 'Expert Posing'],
    claimed: true,
    reviews: [
      {
        id: '1',
        name: 'Jane Doe',
        isAnonymous: false,
        ratingQuality: 5,
        ratingCommunication: 4,
        cost: 50,
        location: 'Katsucon 2023',
        orderedAt: '2023-02-14',
        completedAt: '2023-02-21',
        reviewDescription:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam nec imperdiet mi. Pellentesque sollicitudin ultrices sapien, aliquam tristique risus auctor a. Vivamus placerat et elit sit amet ultricies. Pellentesque consequat quam metus, at lacinia metus interdum sed. Praesent vel ipsum sed felis consectetur sodales quis mattis lectus. Suspendisse sed placerat nisi, et consectetur lectus. Sed ultrices scelerisque neque ut tincidunt. Donec consectetur sodales est, in aliquet ipsum aliquam vel. Nunc ullamcorper ligula eros, id pretium odio semper vitae.',
      },
      {
        id: '2',
        name: 'Anonymous',
        isAnonymous: true,
        ratingQuality: 2,
        ratingCommunication: 2,
        cost: 100,
        location: 'Katsucon 2023',
        orderedAt: '2023-02-15',
        completedAt: '2023-03-15',
        reviewDescription:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam nec imperdiet mi. Pellentesque sollicitudin ultrices sapien, aliquam tristique risus auctor a. Vivamus placerat et elit sit amet ultricies. Pellentesque consequat quam metus, at lacinia metus interdum sed. Praesent vel ipsum sed felis consectetur sodales quis mattis lectus. Suspendisse sed placerat nisi, et consectetur lectus. Sed ultrices scelerisque neque ut tincidunt. Donec consectetur sodales est, in aliquet ipsum aliquam vel. Nunc ullamcorper ligula eros, id pretium odio semper vitae.',
      },
      {
        id: '3',
        name: 'Jannett Doe',
        isAnonymous: false,
        ratingQuality: 3,
        ratingCommunication: 3,
        cost: 60,
        orderedAt: '2023-04-16',
        completedAt: '2023-05-16',
        reviewDescription:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam nec imperdiet mi. Pellentesque sollicitudin ultrices sapien, aliquam tristique risus auctor a. Vivamus placerat et elit sit amet ultricies. Pellentesque consequat quam metus, at lacinia metus interdum sed. Praesent vel ipsum sed felis consectetur sodales quis mattis lectus. Suspendisse sed placerat nisi, et consectetur lectus. Sed ultrices scelerisque neque ut tincidunt. Donec consectetur sodales est, in aliquet ipsum aliquam vel. Nunc ullamcorper ligula eros, id pretium odio semper vitae.',
      },
      {
        id: '4',
        name: 'John Doe',
        isAnonymous: false,
        ratingQuality: 1,
        ratingCommunication: 1,
        cost: 200,
        orderedAt: '2023-05-10',
        completedAt: null,
        reviewDescription:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam nec imperdiet mi. Pellentesque sollicitudin ultrices sapien, aliquam tristique risus auctor a. Vivamus placerat et elit sit amet ultricies. Pellentesque consequat quam metus, at lacinia metus interdum sed. Praesent vel ipsum sed felis consectetur sodales quis mattis lectus. Suspendisse sed placerat nisi, et consectetur lectus. Sed ultrices scelerisque neque ut tincidunt. Donec consectetur sodales est, in aliquet ipsum aliquam vel. Nunc ullamcorper ligula eros, id pretium odio semper vitae.',
      },
    ],
  };

  return (
    <>
      <Container maxW="1280px" p={4}>
        <Grid gridTemplateColumns="1fr .25fr" gap={6} h="100%" flexGrow="1">
          <GridItem p={2}>
            <Heading size="2xl" mb={3}>
              {profileData.name}
              {profileData.claimed && (
                <Badge colorScheme="blue" fontSize="xl" ml={4}>
                  Claimed
                </Badge>
              )}
            </Heading>
            <Text>{profileData.description}</Text>
            <ButtonGroup spacing={3} my={3}>
              <Button
                colorScheme="blue"
                leftIcon={<BsPencil />}
                onClick={onOpen}
              >
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
            <Box
              p={2}
              bgColor={useColorModeValue('gray.200', 'gray.700')}
              position="sticky"
              top={4}
            >
              <StatGroup
                flexDirection="column"
                bgColor={useColorModeValue('white', 'gray.600')}
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
                    {profileData.avgQuality}
                    <StarIcon boxSize={4} ml={1} />
                  </StatNumber>
                </Stat>
                <Stat>
                  <StatLabel>Communication</StatLabel>
                  <StatNumber display="flex" alignItems="center">
                    {profileData.avgCommunication}
                    <StarIcon boxSize={4} ml={1} />
                  </StatNumber>
                </Stat>
              </StatGroup>

              <ButtonGroup direction="row" mt={3} colorScheme="blue">
                {profileData.socialInstagram && (
                  <IconButton
                    as={Link}
                    aria-label="Instagram"
                    icon={<FaInstagram />}
                    rounded="full"
                    href={`https://www.instagram.com/${profileData.socialInstagram}`}
                    rel="noopener noreferrer"
                    isExternal
                  />
                )}
                {profileData.socialFacebook && (
                  <IconButton
                    as={Link}
                    aria-label="Facebook"
                    icon={<FaFacebook />}
                    rounded="full"
                    href={`https://www.facebook.com/${profileData.socialFacebook}`}
                    rel="noopener noreferrer"
                    isExternal
                  />
                )}
                {profileData.socialTwitter && (
                  <IconButton
                    as={Link}
                    aria-label="Twitter"
                    icon={<FaTwitter />}
                    rounded="full"
                    href={`https://www.twitter.com/${profileData.socialTwitter}`}
                    rel="noopener noreferrer"
                    isExternal
                  />
                )}
                {profileData.socialWebsite && (
                  <IconButton
                    as={Link}
                    aria-label="Personal website"
                    icon={<FaLink />}
                    rounded="full"
                    href={profileData.socialWebsite}
                    rel="noopener noreferrer"
                    isExternal
                  />
                )}
              </ButtonGroup>

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

      <Modal
        isOpen={isOpen}
        onClose={onClose}
        closeOnOverlayClick={false}
        size="2xl"
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Write a review for [{profileData.name}]</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormCreateReview type={profileData.type} id={profileData.id} />
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

IndividualProfileRoute.getLayout = function getLayout(page) {
  return <AppLayout title="Profile">{page}</AppLayout>;
};

export default IndividualProfileRoute;
