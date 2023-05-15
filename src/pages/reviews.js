import {
  Flex,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
} from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

import AppLayout from '@/components/layouts/AppLayout';
import ReviewsPageList from '@/components/modules/ReviewsPageList';
import prisma from '@/lib/prisma';

export const getStaticProps = async () => {
  const photographers = await prisma.ReviewablePeople.findMany({
    where: { isApproved: true, type: 'PHOTO' },
  });
  const propMakers = await prisma.ReviewablePeople.findMany({
    where: { isApproved: true, type: 'PROP' },
  });
  const sewing = await prisma.ReviewablePeople.findMany({
    where: { isApproved: true, type: 'SEW' },
  });
  const wigs = await prisma.ReviewablePeople.findMany({
    where: { isApproved: true, type: 'WIG' },
  });

  return {
    props: {
      photographers: JSON.parse(JSON.stringify(photographers)),
      propMakers: JSON.parse(JSON.stringify(propMakers)),
      sewing: JSON.parse(JSON.stringify(sewing)),
      wigs: JSON.parse(JSON.stringify(wigs)),
    },
    revalidate: 10,
  };
};

const ReviewsRoute = ({ photographers, propMakers, sewing, wigs }) => {
  console.log(photographers);
  const [tabIndex, setTabIndex] = useState(0);
  const router = useRouter();

  useEffect(() => {
    if (router.query.index) {
      setTabIndex(parseInt(router.query.index));
    }
  }, [router.query.index]);

  return (
    <Tabs
      isFitted
      isLazy
      defaultIndex={tabIndex}
      variant="line"
      display="flex"
      flexDirection="column"
      h="100%"
      flexGrow="1"
    >
      <TabList>
        <Tab>Photographers</Tab>
        <Tab>Prop Makers</Tab>
        <Tab>Sewing</Tab>
        <Tab>Wig Styling</Tab>
      </TabList>
      <TabPanels as={Flex} flexDirection="column" h="100%" flexGrow="1">
        <TabPanel as={Flex} flexDirection="column" h="100%" flexGrow="1">
          <ReviewsPageList data={photographers} type="photo" />
        </TabPanel>
        <TabPanel as={Flex} flexDirection="column" h="100%" flexGrow="1">
          <ReviewsPageList data={propMakers} type="prop" />
        </TabPanel>
        <TabPanel as={Flex} flexDirection="column" h="100%" flexGrow="1">
          <ReviewsPageList data={sewing} type="sew" />
        </TabPanel>
        <TabPanel as={Flex} flexDirection="column" h="100%" flexGrow="1">
          <ReviewsPageList data={wigs} type="wig" />
        </TabPanel>
      </TabPanels>
    </Tabs>
  );
};

ReviewsRoute.getLayout = function getLayout(page) {
  return <AppLayout title="Reviews">{page}</AppLayout>;
};

export default ReviewsRoute;
