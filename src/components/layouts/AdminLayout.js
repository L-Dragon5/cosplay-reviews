import { Flex, Text } from '@chakra-ui/react';
import Head from 'next/head';
import { useSession } from 'next-auth/react';

import AdminNavigation from '@/components/elements/AdminNavigation';

const AdminLayout = ({ title, children }) => {
  const { data: session, status } = useSession();
  const displayTitle = `${title} | Admin CosReviews`;

  if (status === 'loading') {
    return <Text>Loading...</Text>;
  }

  if (status === 'unauthenticated' || session?.user?.role === 'user') {
    return <Text>Access denied</Text>;
  }

  return (
    <Flex minHeight="100vh" maxHeight="100vh">
      <Head>
        <title>{displayTitle}</title>
      </Head>

      <AdminNavigation />
      <Flex direction="column" w="100%" flexGrow="1">
        {children}
      </Flex>
    </Flex>
  );
};

export default AdminLayout;
