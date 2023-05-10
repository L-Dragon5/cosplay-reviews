import { Flex } from '@chakra-ui/react';
import Head from 'next/head';

import Footer from '@/components/elements/Footer';
import Navigation from '@/components/elements/Navigation';

const AppLayout = ({ title, children }) => {
  const displayTitle = `${title} | CR`;

  return (
    <Flex direction="column" minHeight="100vh" maxHeight="100vh">
      <Head>
        <title>{displayTitle}</title>
      </Head>

      <Navigation />
      <Flex direction="column" w="100%" h="calc(100vh - 80px)" flexGrow="1">
        {children}
      </Flex>
      <Footer />
    </Flex>
  );
};

export default AppLayout;
