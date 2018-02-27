import React from 'react';
import { storiesOf } from '../.storybook/facade';
import Boxplot from '../src/component/boxplot';

const source = [
  ['Date', 'open', 'close', 'lowest', 'highest'],
  ['2017-10-24', 20, 30, 10, 35],
  ['2017-10-25', 40, 35, 30, 55],
  ['2017-10-26', 33, 38, 30, 40],
  ['2017-10-27', 40, 40, 32, 42],
];

storiesOf('Boxplot Chart', module)
  .add('Simple boxplot', () => (
    <Boxplot source={source} style={{ height: '800px', width: '100%' }} />
  ));
