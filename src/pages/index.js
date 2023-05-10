import {
  Box,
  Container,
  Heading,
  LinkBox,
  LinkOverlay,
  SimpleGrid,
  Square,
} from '@chakra-ui/react';
import NextLink from 'next/link';

import AppLayout from '@/components/layouts/AppLayout';

const links = [
  {
    label: 'Photographers',
    href: '/photographers',
  },
  {
    label: 'Prop Makers',
    href: '/prop-makers',
  },
  {
    label: 'Seamstress/Seamster',
    href: '/sewing',
  },
];

const HomeRoute = () => {
  return (
    <Box>
      <Container p={4} maxW="1280px">
        <Heading mb={3}>Reviews</Heading>
        <SimpleGrid columns={2} spacing={4} maxW="1280px" margin="0 auto">
          {links.map((link) => (
            <LinkBox
              key={link.label}
              as={Square}
              borderWidth="1px"
              rounded="md"
              bgColor="brandSecondary.200"
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
