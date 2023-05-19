import { CheckIcon, CloseIcon, EditIcon } from '@chakra-ui/icons';
import {
  Box,
  ButtonGroup,
  Heading,
  IconButton,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
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
  const { data: reviews, mutate: reviewMutate } = useSWR(
    '/api/review',
    fetcher,
  );

  const onApprove = (id) => {
    axios.put(`/api/review/${id}`, { isApproved: true }).then(() => {
      reviewMutate();
      axios.post('/api/audit', {
        admin: { connect: { id: session?.user?.id } },
        message: `Approved [Review]: ${id}`,
      });
    });
  };

  const onReject = (id) => {
    axios
      .put(`/api/review/${id}`, {
        deletedAt: new Date().toISOString(),
      })
      .then(() => {
        reviewMutate();
        axios.post('/api/audit', {
          admin: { connect: { id: session?.user?.id } },
          message: `Rejected [Review]: ${id}`,
        });
      });
  };

  return (
    <Box>
      <Heading m={4}>Reviews</Heading>
      <TableContainer>
        <Table variant="striped" colorScheme="orange">
          <Thead>
            <Tr>
              <Th>Reviewee Name</Th>
              <Th>Reviewee Type</Th>
              <Th>Review Location</Th>
              <Th>Description</Th>
              <Th>Actions</Th>
            </Tr>
          </Thead>
          <Tbody>
            {reviews &&
              reviews?.map((review) => (
                <Tr key={`r-${review.id}`}>
                  <Td>
                    {review.isApproved ? <CheckIcon mr={3} /> : null}
                    {review.reviewee.name}
                  </Td>
                  <Td>{review.reviewee.type}</Td>
                  <Td>{review?.location}</Td>
                  <Td>{review.description}</Td>
                  <Td>
                    {review.isApproved ? (
                      <ButtonGroup variant="outline">
                        <IconButton
                          title="Edit"
                          aria-label="Edit"
                          icon={<EditIcon />}
                        />
                      </ButtonGroup>
                    ) : (
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
                    )}
                  </Td>
                </Tr>
              ))}
          </Tbody>
        </Table>
      </TableContainer>
    </Box>
  );
};

AdminRoute.getLayout = function getLayout(page) {
  return <AdminLayout title="Reviews">{page}</AdminLayout>;
};

export default AdminRoute;
