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
  useToast,
} from '@chakra-ui/react';
import NextLink from 'next/link';
import { useSession } from 'next-auth/react';
import {
  BsBookmark,
  BsBookmarkFill,
  BsFlag,
  BsPencil,
  BsShare,
} from 'react-icons/bs';
import { FaFacebook, FaInstagram, FaLink, FaTwitter } from 'react-icons/fa';

import { useToastComingSoon } from '@/components/elements/toastComingSoon';
import AppLayout from '@/components/layouts/AppLayout';
import FormCreateReview from '@/components/modules/FormCreateReview';
import ReviewCard from '@/components/modules/ReviewCard';
import { useUserBookmarks } from '@/hooks/useUserBookmarks';
import axios from '@/lib/axios';
import prisma from '@/lib/prisma';

export const getServerSideProps = async ({ req, params, resolvedUrl }) => {
  const profileData = await prisma.ReviewablePeople.findUnique({
    where: {
      id: params?.id,
    },
    include: {
      reviews: {
        include: {
          reviewer: true,
        },
      },
    },
  });

  return {
    props: {
      profileData: JSON.parse(JSON.stringify(profileData)),
      profileId: params?.id,
      resolvedUrl: req.headers.host + resolvedUrl,
    },
  };
};

const IndividualProfileRoute = ({ profileData, profileId, resolvedUrl }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { data: session, status } = useSession();
  const { displayMessage } = useToastComingSoon();
  const toast = useToast();
  const { userBookmarks, updateUserBookmarks } = useUserBookmarks();

  const saved = userBookmarks?.bookmarks?.some((b) => b.personId === profileId);

  const onBookmark = () => {
    if (!saved) {
      axios
        .put(`/api/user/${session?.user?.id}`, {
          personId: profileId,
        })
        .then(() => {
          updateUserBookmarks();
        });
    } else {
      axios
        .post(`/api/user/bookmarks/${session?.user?.id}`, {
          method: 'DELETE',
          personId: profileId,
        })
        .then(() => {
          updateUserBookmarks();
        });
    }
  };

  const onShare = () => {
    navigator.clipboard.writeText(resolvedUrl);
    toast({
      title: 'Share',
      description: 'Saved URL to clipboard!',
      status: 'success',
      duration: 2000,
      isClosable: true,
      position: 'top',
    });
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
              {session && status !== 'loading' ? (
                <Button
                  colorScheme="blue"
                  leftIcon={<BsPencil />}
                  onClick={onOpen}
                >
                  Write a review
                </Button>
              ) : (
                <Button
                  as={NextLink}
                  href="/api/auth/signin"
                  colorScheme="blue"
                  leftIcon={<BsPencil />}
                >
                  Write a review
                </Button>
              )}

              <Button
                colorScheme="white"
                variant="outline"
                leftIcon={<BsShare />}
                onClick={onShare}
              >
                Share
              </Button>
              {session &&
                status !== 'loading' &&
                (saved ? (
                  <Button
                    colorScheme="green"
                    variant="outline"
                    leftIcon={<BsBookmarkFill />}
                    onClick={onBookmark}
                  >
                    Saved
                  </Button>
                ) : (
                  <Button
                    colorScheme="white"
                    variant="outline"
                    leftIcon={<BsBookmark />}
                    onClick={onBookmark}
                  >
                    Save
                  </Button>
                ))}

              {profileData.userId === null && session && status !== 'loading' && (
                <Button
                  colorScheme="teal"
                  leftIcon={<BsFlag />}
                  onClick={displayMessage}
                >
                  Claim
                </Button>
              )}
            </ButtonGroup>
            <Divider />

            <Heading my={2}>Reviews</Heading>
            <Stack gap={2}>
              {profileData?.reviews?.length > 0 ? (
                profileData?.reviews?.map((review) => (
                  <ReviewCard key={review.id} review={review} />
                ))
              ) : (
                <Text fontSize="xl">No reviews available</Text>
              )}
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
                  <StatNumber>
                    {profileData?.avgCost > -1
                      ? `$${profileData.avgCost}`
                      : 'Not enough data'}
                  </StatNumber>
                  <StatHelpText>average in USD</StatHelpText>
                </Stat>
                <Stat>
                  <StatLabel>Turnaround Time</StatLabel>
                  <StatNumber>
                    {profileData?.avgTurnaround > -1
                      ? `${profileData.avgTurnaround}`
                      : 'Not enough data'}
                  </StatNumber>
                  <StatHelpText>average in days</StatHelpText>
                </Stat>
                <Stat>
                  <StatLabel>Quality</StatLabel>
                  <StatNumber display="flex" alignItems="center">
                    {profileData?.avgQuality > -1 ? (
                      <>
                        {profileData.avgQuality}
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
                    {profileData?.avgCommunication > -1 ? (
                      <>
                        {profileData.avgCommunication}
                        <StarIcon boxSize={4} ml={1} />
                      </>
                    ) : (
                      'Not enough data'
                    )}
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

              {profileData?.tags && (
                <>
                  <Heading size="lg" mt={4} mb={2}>
                    Tags
                  </Heading>
                  <List spacing={3}>
                    {profileData?.tags?.map((tag) => (
                      <ListItem key={tag} fontSize="lg">
                        {tag}
                      </ListItem>
                    ))}
                  </List>
                </>
              )}
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
