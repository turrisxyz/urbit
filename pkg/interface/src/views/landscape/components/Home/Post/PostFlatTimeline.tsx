import { Box, Col, Text } from '@tlon/indigo-react';
import { Association, FlatGraph, Group } from '@urbit/api';
import React, { ReactElement } from 'react';
import GlobalApi from '~/logic/api/global';
import { Loading } from '~/views/components/Loading';
import PostFlatFeed from './PostFlatFeed';
import PostInput from './PostInput';

interface PostTimelineProps {
  api: GlobalApi;
  association: Association;
  baseUrl: string;
  flatGraph: FlatGraph;
  graphPath: string;
  group: Group;
  pendingSize: number;
  vip: string;
}

const PostFlatTimeline = (props: PostTimelineProps): ReactElement => {
  const {
    baseUrl,
    api,
    association,
    graphPath,
    group,
    flatGraph,
    pendingSize,
    vip
  } = props;

  //console.log(flatGraph);
  const shouldRenderFeed = Boolean(flatGraph);

  if (!shouldRenderFeed) {
    return (
      <Box height="100%" pt={3} pb={3} width="100%" alignItems="center" pl={1}>
        <Loading />
      </Box>
    );
  }

  const first = flatGraph.peekLargest()?.[0];
  if (!first) {
    return (
      <Col
        key={0}
        width="100%"
        height="100%"
        alignItems="center"
      >
        <Col
          width="100%"
          maxWidth="616px"
          pt={3}
          pl={2}
          pr={2}
          mb={3}
          alignItems="center"
        >
          <PostInput
            api={api}
            graphPath={graphPath}
            group={group}
            association={association}
            vip={vip}
          />
        </Col>
        <Box
          pl={2}
          pr={2}
          width="100%"
          maxWidth="616px"
          alignItems="center"
        >
          <Col bg="washedGray" width="100%" alignItems="center" p={3}>
            <Text textAlign="center" width="100%">
              No one has posted anything here yet.
            </Text>
          </Col>
        </Box>
      </Col>
    );
  }

  return (
    <Box height="calc(100% - 48px)" width="100%" alignItems="center" pl={1}>
      <PostFlatFeed
        key={graphPath}
        graphPath={graphPath}
        flatGraph={flatGraph}
        pendingSize={pendingSize}
        association={association}
        group={group}
        vip={vip}
        api={api}
        baseUrl={baseUrl}
      />
    </Box>
  );
}

export default PostFlatTimeline;
