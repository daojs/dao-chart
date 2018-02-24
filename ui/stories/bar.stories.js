import React from 'react';
import { storiesOf } from '../.storybook/facade';
import Bar from '../src/component/bar';
import HorizontalBar from '../src/component/horizontal-bar';
import OrderedBar from '../src/component/ordered-bar';

import { source } from './data';

const sourceForOrderedBar = [
  ['framework', 'star'],
  ['React', 1000],
  ['Angularjs', 1020],
  ['Backbone', 50],
];

storiesOf('Bar Chart', module)
  .add('Simple bar', () => (
    <Bar source={source} />
  ))
  .add('Simple horizontal bar', () => (
    <HorizontalBar source={source} />
  ))
  .add('Simple ordered bar', () => (
    <OrderedBar source={sourceForOrderedBar} />
  ));
