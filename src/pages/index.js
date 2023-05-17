import {
  Box,
  Container,
  Heading,
  LinkBox,
  LinkOverlay,
  SimpleGrid,
  Square,
  useColorModeValue,
} from '@chakra-ui/react';
import NextLink from 'next/link';

import Carousel from '@/components/elements/Carousel';
import AppLayout from '@/components/layouts/AppLayout';

const links = [
  {
    label: 'Photographers',
    href: '/reviews/?index=0',
  },
  {
    label: 'Prop Makers',
    href: '/reviews/?index=1',
  },
  {
    label: 'Seamstress/Seamster',
    href: '/reviews/?index=2',
  },
  {
    label: 'Wig Stylists',
    href: '/reviews/?index=3',
  },
];

const carouselCards = [
  {
    title: 'Welcome to CosReviews!',
    text: 'This site is still a work-in-progress, so just be mindful.',
    image:
      'https://images.unsplash.com/photo-1543332164-6e82f355badc?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2560&q=80',
  },
];

const HomeRoute = () => {
  return (
    <Box>
      <Carousel cards={carouselCards} />
      <Container p={4} maxW="1280px">
        <Heading mb={3}>I'm looking for...</Heading>
        <SimpleGrid columns={2} spacing={4} maxW="1280px" margin="0 auto">
          {links.map((link) => (
            <LinkBox
              key={link.label}
              as={Square}
              borderWidth="1px"
              rounded="md"
              bgColor={useColorModeValue('blue.300', 'blue.700')}
              h={20}
            >
              <LinkOverlay as={NextLink} href={link.href}>
                <Heading size="md">{link.label}</Heading>
              </LinkOverlay>
            </LinkBox>
          ))}
        </SimpleGrid>
      </Container>
    </Box>
  );
};

HomeRoute.getLayout = function getLayout(page) {
  return <AppLayout title="Home">{page}</AppLayout>;
};

export default HomeRoute;
