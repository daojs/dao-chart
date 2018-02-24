import React from 'react';
import { storiesOf } from '../.storybook/facade';
import Scatter from '../src/component/scatter';

const scatterSource = [
  ['Price', 'Meat', 'Vegetable'],
  [23, 167, 8.3],
  [81, 284, 12],
  [91, 413, 4.1],
  [13, 287, 13.5],
];

storiesOf('Scatter Chart', module)
  .add('Simple scatter', () => (
    <Scatter source={scatterSource} />
  ));
