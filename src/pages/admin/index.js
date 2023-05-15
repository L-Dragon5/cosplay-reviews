import { CheckIcon, CloseIcon } from '@chakra-ui/icons';
import {
  Box,
  ButtonGroup,
  Card,
  CardBody,
  Container,
  Heading,
  IconButton,
  SimpleGrid,
  Spacer,
  Stack,
  Text,
  useColorModeValue,
} from '@chakra-ui/react';
import { useSession } from 'next-auth/react';
import useSWR from 'swr';

import AdminLayout from '@/components/layouts/AdminLayout';
import axios from '@/lib/axios';

const fetcher = async (input, init) => {
  const res = await fetch(input, init);
  return res.json();
};

const AdminRoute = () => {
  const { data: session } = useSession();
  const { data: unapprovedReviews, mutate: reviewMutate } = useSWR(
    '/api/review',
    fetcher,
  );
  const { data: unapprovedPeople, mutate: peopleMutate } = useSWR(
    '/api/person',
    fetcher,
  );

  const onApprove = (type, id) => {
    axios.put(`/api/${type}/${id}`, { isApproved: true }).then(() => {
      if (type === 'person') {
        peopleMutate();
      } else if (type === 'review') {
        reviewMutate();
      }
      axios.post('/api/audit', {
        admin: { connect: { id: session?.user?.id } },
        message: `Approved [${type}]: ${id}`,
      });
    });
  };

  const onReject = (type, id) => {
    axios
      .put(`/api/${type}/${id}`, {
        deletedAt: new Date().toISOString(),
      })
      .then(() => {
        if (type === 'person') {
          peopleMutate();
        } else if (type === 'review') {
          reviewMutate();
        }
        axios.post('/api/audit', {
          admin: { connect: { id: session?.user?.id } },
          message: `Rejected [${type}]: ${id}`,
        });
      });
  };

  return (
    <Box>
      <Container p={4} maxW="1280px">
        <Heading mb={3}>Admin Panel</Heading>
        <SimpleGrid columns={2} spacing={4}>
          <Box bgColor={useColorModeValue('gray.100', 'gray.700')} p={2}>
            <Heading fontSize="2xl" mb={3}>
              Unapproved People
            </Heading>
            <Stack maxH="calc(100vh - 80px)" overflow="auto">
              {unapprovedPeople &&
                unapprovedPeople?.map((person) => (
                  <Card
                    key={`p-${person.id}`}
                    direction={{ base: 'column', sm: 'row' }}
                    overflow="hidden"
                    variant="outline"
                  >
                    <CardBody>
                      <Stack direction={{ base: 'column', sm: 'row' }}>
                        <Stack>
                          <Text>
                            <strong>Name:</strong> {person.name}
                          </Text>
                          <Text>
                            <strong>Type:</strong> {person.type}
                          </Text>
                          {person?.location && (
                            <Text>
                              <strong>Location:</strong> {person.location}
                            </Text>
                          )}
                          {person?.socialFacebook && (
                            <Text>
                              <strong>FB:</strong> {person.socialFacebook}
                            </Text>
                          )}
                          {person?.socialInstagram && (
                            <Text>
                              <strong>IG:</strong> {person.socialInstagram}
                            </Text>
                          )}
                          {person?.socialTwitter && (
                            <Text>
                              <strong>TW:</strong> {person.socialTwitter}
                            </Text>
                          )}
                          {person?.socialWebsite && (
                            <Text>
                              <strong>Web:</strong> {person.socialWebsite}
                            </Text>
                          )}
                        </Stack>
                        <Spacer />
                        <ButtonGroup variant="outline">
                          <IconButton
                            title="Approve"
                            aria-label="Approve"
                            icon={<CheckIcon />}
                            onClick={() => onApprove('person', person.id)}
                          />
                          <IconButton
                            title="Reject"
                            aria-label="Reject"
                            icon={<CloseIcon />}
                            onClick={() => onReject('person', person.id)}
                          />
                        </ButtonGroup>
                      </Stack>
                    </CardBody>
                  </Card>
                ))}
            </Stack>
          </Box>
          <Box bgColor={useColorModeValue('gray.100', 'gray.700')} p={2}>
            <Heading fontSize="2xl" mb={3}>
              Unapproved Review
            </Heading>
            <Stack maxH="calc(100vh - 80px)" overflow="auto">
              {unapprovedReviews &&
                unapprovedReviews?.map((review) => (
                  <Card
                    key={`r-${review.id}`}
                    direction={{ base: 'column', sm: 'row' }}
                    overflow="hidden"
                    variant="outline"
                  >
                    <CardBody>
                      <Stack direction={{ base: 'column', sm: 'row' }}>
                        <Stack>
                          <Text>
                            [{review.reviewee.type}] {review.reviewee.name}
                          </Text>
                          <Text>{review.description}</Text>
                          {review?.location && (
                            <Text>
                              <strong>Location:</strong> {review.location}
                            </Text>
                          )}
                        </Stack>
                        <Spacer />
                        <ButtonGroup variant="outline">
                          <IconButton
                            title="Approve"
                            aria-label="Approve"
                            icon={<CheckIcon />}
                            onClick={() => onApprove('review', review.id)}
                          />
                          <IconButton
                            title="Reject"
                            aria-label="Reject"
                            icon={<CloseIcon />}
                            onClick={() => onReject('review', review.id)}
                          />
                        </ButtonGroup>
                      </Stack>
                    </CardBody>
                  </Card>
                ))}
            </Stack>
          </Box>
        </SimpleGrid>
      </Container>
    </Box>
  );
};

AdminRoute.getLayout = function getLayout(page) {
  return <AdminLayout title="Home">{page}</AdminLayout>;
};

export default AdminRoute;
