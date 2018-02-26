import React from 'react';
import { storiesOf } from '../.storybook/facade';
import DivergingStacked from '../src/component/diverging-stacked';

const source = [
  ['Date', 'Negative', 'Neutral', 'Positive'],
  ['2017-10-24', 20, 30, 10],
  ['2017-10-25', 40, 35, 30],
  ['2017-10-26', 33, 38, 30],
  ['2017-10-27', 40, 40, 32],
];

storiesOf('DivergingStacked Chart', module)
  .add('Diverging stacked', () => (
    <DivergingStacked source={source} />
  ));
