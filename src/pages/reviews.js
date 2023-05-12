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

import {
  photographers,
  propMakers,
  sewing,
  wigs,
} from '@/components/data/ReviewData';
import AppLayout from '@/components/layouts/AppLayout';
import ReviewsPageList from '@/components/modules/ReviewsPageList';

const ReviewsRoute = () => {
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
