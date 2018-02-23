import React from 'react';
import { storiesOf } from '@storybook/react';
import Line from '../src/component/line';
import { source } from './data';

storiesOf('Line Chart', module)
  .add('Simple line', () => (
    <Line source={source} />
  ));
