import { Flex } from '@chakra-ui/react';
import Head from 'next/head';

import Footer from '@/components/elements/Footer';
import Navigation from '@/components/elements/Navigation';

const AppLayout = ({ title, children }) => {
  const displayTitle = `${title} | CosReviews`;

  return (
    <Flex direction="column" minHeight="100vh" maxHeight="100vh">
      <Head>
        <title>{displayTitle}</title>
      </Head>

      <Navigation />
      <Flex direction="column" w="100%" flexGrow="1">
        {children}
      </Flex>
      <Footer />
    </Flex>
  );
};

export default AppLayout;
