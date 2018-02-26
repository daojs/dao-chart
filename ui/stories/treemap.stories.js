import React from 'react';
import { storiesOf } from '../.storybook/facade';
import Treemap from '../src/component/treemap';

const source = [
  ['name', 'value', 'id', 'parentId'],
  ['nodeA', 10, 1, 0],
  ['nodeB', 20, 2, 0],
  ['nodeA1', 10, 3, 1],
  ['nodeA2', 10, 4, 1],
  ['nodeA3', 10, 5, 1],
  ['nodeB1', 10, 6, 2],
  ['nodeB2', 10, 7, 2],
  ['nodeB3', 10, 8, 2],
];

storiesOf('Treemap Chart', module)
  .add('Simple treemap', () => (
    <Treemap source={source} style={{ height: '800px', width: '100%' }} />
  ));
