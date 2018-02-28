import React from 'react';
import { storiesOf } from '../.storybook/facade';
import Sankey from '../src/component/sankey';

const source = [
  ['key', 'a', 'b', 'c', 'd', 'e', 'f'],
  ['a', 0, 0, 5, 3, 3, 0],
  ['b', 0, 0, 0, 0, 8, 0],
  ['c', 0, 0, 0, 0, 0, 0],
  ['d', 0, 0, 0, 0, 0, 0],
  ['e', 0, 0, 1, 0, 0, 2],
  ['f', 0, 0, 0, 0, 0, 0],
];

storiesOf('Sankey Chart', module)
  .add('Simple sankey', () => {
    const story = <Sankey source={source} />;

    return story;
  });
