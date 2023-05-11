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
    title: 'Katsucon Photographers',
    text: 'Search for photographers attending Katsucon!',
    image:
      'https://ic.pics.livejournal.com/meowkittyzombie/32846548/11767/11767_640.jpg',
  },
  {
    title: '3D Printing Commissions',
    text: 'Need a prop? Check out these 3D printers.',
    image:
      'https://helios-i.mashable.com/imagery/articles/03K6mSGJRfPu2CjQqUUdbEu/hero-image.fill.size_1248x702.v1611610957.jpg',
  },
  {
    title: 'Sewing Commissions',
    text: 'Finding people that can help make your sakizo dress a reality.',
    image:
      'https://media-cldnry.s-nbcnews.com/image/upload/t_social_share_1200x630_center,f_auto,q_auto:best/newscms/2021_12/1692579/sewing-machine-roundup-bd-2x1-bug-210324.jpg',
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
