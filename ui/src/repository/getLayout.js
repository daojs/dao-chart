import _ from 'lodash';
import { GraphQLClient } from 'graphql-request';

const client = new GraphQLClient('/graphql', {
  mode: 'cors',
});

// const layoutStore = {
//   12345678: [
//     {
//       i: '1', x: 0, y: 0, w: 6, h: 10,
//     },
//     {
//       i: '2', x: 6, y: 0, w: 6, h: 10,
//     },
//   ],
//   10000: [{
//     i: '1', x: 0, y: 0, w: 12, h: 20,
//   }],
// };

export function getLayout({
  storyId,
  sectionIds,
}) {
  return client.request(`query getLayout($storyId: String, $sectionIds: [String]) {
    getLayout(storyId: $storyId, sectionIds: $sectionIds) {
      i,
      x,
      y,
      w,
      h,
    }
  }`, {
    storyId,
    sectionIds,
  }).then(data => data.getLayout);
}

export function setLayout({
  storyId,
  storyLayout,
}) {
  return client.request(`query setLayout($storyId: String, $storyLayout: [sectionLayoutInputType]) {
    setLayout(storyId: $storyId, storyLayout: $storyLayout)
  }
  `, {
    storyId,
    storyLayout: _.map(storyLayout, sectionLayout => _.pick(sectionLayout, ['x', 'y', 'w', 'h', 'i'])),
  });
}
