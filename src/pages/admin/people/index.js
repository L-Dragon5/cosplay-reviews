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
  const { data: people, mutate: peopleMutate } = useSWR('/api/person', fetcher);

  const onApprove = (id) => {
    axios.put(`/api/person/${id}`, { isApproved: true }).then(() => {
      peopleMutate();
      axios.post('/api/audit', {
        admin: { connect: { id: session?.user?.id } },
        message: `Approved [ReviewablePeople]: ${id}`,
      });
    });
  };

  const onReject = (id) => {
    axios
      .put(`/api/person/${id}`, {
        deletedAt: new Date().toISOString(),
      })
      .then(() => {
        peopleMutate();
        axios.post('/api/audit', {
          admin: { connect: { id: session?.user?.id } },
          message: `Rejected [ReviewablePeople]: ${id}`,
        });
      });
  };

  return (
    <Box>
      <Heading m={4}>Reviewable People</Heading>
      <TableContainer>
        <Table variant="striped" colorScheme="orange">
          <Thead>
            <Tr>
              <Th>Name</Th>
              <Th>Type</Th>
              <Th>Location</Th>
              <Th>Facebook</Th>
              <Th>Instagram</Th>
              <Th>Twitter</Th>
              <Th>Website</Th>
              <Th>Actions</Th>
            </Tr>
          </Thead>
          <Tbody>
            {people &&
              people?.map((person) => (
                <Tr key={`p-${person.id}`}>
                  <Td>
                    {person.isApproved ? <CheckIcon mr={3} /> : null}
                    {person.name}
                  </Td>
                  <Td>{person.type}</Td>
                  <Td>{person?.location}</Td>
                  <Td>{person?.socialFacebook}</Td>
                  <Td>{person?.socialInstagram}</Td>
                  <Td>{person?.socialTwitter}</Td>
                  <Td>{person?.socialWebsite}</Td>
                  <Td>
                    {person.isApproved ? (
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
                          onClick={() => onApprove('person', person.id)}
                        />
                        <IconButton
                          title="Reject"
                          aria-label="Reject"
                          icon={<CloseIcon />}
                          onClick={() => onReject('person', person.id)}
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
  return <AdminLayout title="Reviewable People">{page}</AdminLayout>;
};

export default AdminRoute;
