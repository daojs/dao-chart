import React from 'react';
import { storiesOf } from '../.storybook/facade';
import Sankey from '../src/component/sankey';

const source = [
  ['Source', 'Target', 'Value'],
  ['a', 'c', 5],
  ['a', 'd', 3],
  ['a', 'e', 3],
  ['b', 'e', 8],
  ['e', 'c', 1],
  ['e', 'f', 2],
];

storiesOf('Sankey Chart', module)
  .add('Simple sankey', () => {
    const story = <Sankey source={source} />;

    return story;
  });
