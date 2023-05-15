import { Box, Container, Heading } from '@chakra-ui/react';

import AdminLayout from '@/components/layouts/AdminLayout';

const AdminRoute = () => {
  return (
    <Box>
      <Container p={4} maxW="1280px">
        <Heading mb={3}>Admin Panel</Heading>
      </Container>
    </Box>
  );
};

AdminRoute.getLayout = function getLayout(page) {
  return <AdminLayout title="Home">{page}</AdminLayout>;
};

export default AdminRoute;
