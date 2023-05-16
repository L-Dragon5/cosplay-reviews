import {
  Flex,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
} from '@chakra-ui/react';

import AppLayout from '@/components/layouts/AppLayout';
import ReviewsPageList from '@/components/modules/ReviewsPageList';
import prisma from '@/lib/prisma';

export const getServerSideProps = async ({ params, query }) => {
  const photographers = await prisma.ReviewablePeople.findMany({
    where: { isApproved: true, type: 'PHOTO' },
    orderBy: { name: 'asc' },
  });
  const propMakers = await prisma.ReviewablePeople.findMany({
    where: { isApproved: true, type: 'PROP' },
    orderBy: { name: 'asc' },
  });
  const sewing = await prisma.ReviewablePeople.findMany({
    where: { isApproved: true, type: 'SEW' },
    orderBy: { name: 'asc' },
  });
  const wigs = await prisma.ReviewablePeople.findMany({
    where: { isApproved: true, type: 'WIG' },
    orderBy: { name: 'asc' },
  });

  return {
    props: {
      photographers: JSON.parse(JSON.stringify(photographers)),
      propMakers: JSON.parse(JSON.stringify(propMakers)),
      sewing: JSON.parse(JSON.stringify(sewing)),
      wigs: JSON.parse(JSON.stringify(wigs)),
      defaultIndex: query?.index ? parseInt(query.index) : 0,
    },
  };
};

const ReviewsRoute = ({
  photographers,
  propMakers,
  sewing,
  wigs,
  defaultIndex,
}) => {
  return (
    <Tabs
      isFitted
      isLazy
      defaultIndex={defaultIndex}
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
          <ReviewsPageList data={photographers} type="PHOTO" />
        </TabPanel>
        <TabPanel as={Flex} flexDirection="column" h="100%" flexGrow="1">
          <ReviewsPageList data={propMakers} type="PROP" />
        </TabPanel>
        <TabPanel as={Flex} flexDirection="column" h="100%" flexGrow="1">
          <ReviewsPageList data={sewing} type="SEW" />
        </TabPanel>
        <TabPanel as={Flex} flexDirection="column" h="100%" flexGrow="1">
          <ReviewsPageList data={wigs} type="WIG" />
        </TabPanel>
      </TabPanels>
    </Tabs>
  );
};

ReviewsRoute.getLayout = function getLayout(page) {
  return <AppLayout title="Reviews">{page}</AppLayout>;
};

export default ReviewsRoute;
