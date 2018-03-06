import Promise from 'bluebird';

const layoutStore = {
  12345678: [
    {
      i: '1', x: 0, y: 0, w: 6, h: 10,
    },
    {
      i: '2', x: 6, y: 0, w: 6, h: 10,
    },
  ],
};

export function getLayout(storyId) {
  return Promise.resolve(layoutStore[storyId]);
}

export function setLayout(storyId, layout) {
  layoutStore[storyId] = layout; // eslint-disable-line immutable/no-mutation
  return Promise.resolve();
}
