import { Flex, Text } from '@chakra-ui/react';
import Head from 'next/head';
import { useSession } from 'next-auth/react';

import Navigation from '@/components/elements/Navigation';

const AdminLayout = ({ title, children }) => {
  const { data: session, status } = useSession();
  const displayTitle = `${title} | Admin CR`;

  if (status === 'loading') {
    return <Text>Loading...</Text>;
  }

  if (status === 'unauthenticated' || session?.user?.role === 'admin') {
    return <Text>Access denied</Text>;
  }

  return (
    <Flex direction="column" minHeight="100vh" maxHeight="100vh">
      <Head>
        <title>{displayTitle}</title>
      </Head>

      <Navigation />
      <Flex direction="column" w="100%" flexGrow="1">
        {children}
      </Flex>
    </Flex>
  );
};

export default AdminLayout;
