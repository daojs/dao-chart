import React from 'react';
import { storiesOf } from '../.storybook/facade';
import Line from '../src/component/line';
import TargetLine from '../src/component/target-line';
import { timeSource } from './data';

storiesOf('Line Chart', module)
  .add('Simple line', () => (
    <Line source={timeSource} />
  ))
  .add('Target line', () => (
    <TargetLine target={80} source={timeSource} />
  ));
