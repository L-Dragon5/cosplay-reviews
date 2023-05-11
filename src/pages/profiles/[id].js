import { Box } from '@chakra-ui/react';

import AppLayout from '@/components/layouts/AppLayout';

const IndividualProfileRoute = () => {
  return <Box>Putting Profile information in here</Box>;
};

IndividualProfileRoute.getLayout = function getLayout(page) {
  return <AppLayout title="Profile">{page}</AppLayout>;
};

export default IndividualProfileRoute;
