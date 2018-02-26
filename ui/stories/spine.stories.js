import React from 'react';
import { storiesOf } from '../.storybook/facade';
import Spine from '../src/component/spine';

const source1 = [
  ['Date', 'Income', 'Outcome'],
  ['周一', 100, -50],
  ['周二', 200, -180],
  ['周三', 190, -89],
  ['周四', 700, -605],
  ['周五', 900, -590],
  ['周六', 300, -200],
  ['周日', 290, -100],
];

const source2 = [
  ['Date', 'Income', 'Outcome', 'Profit'],
  ['周一', 100, -50, 50],
  ['周二', 200, -180, 20],
  ['周三', 190, -89, 101],
  ['周四', 700, -605, 95],
  ['周五', 900, -590, 310],
  ['周六', 300, -200, 100],
  ['周日', 290, -100, 190],
];
storiesOf('Spine Chart', module)
  .add('Simple spine', () => (
    <Spine source={source1} style={{ height: '800px', width: '100%' }} />
  ))
  .add('Spine and Diverging bar', () => (
    <Spine source={source2} style={{ height: '800px', width: '100%' }} />
  ));
