import React from 'react';
import { storiesOf } from '@storybook/react';
import Bar from '../src/component/bar';
import { source } from './data';

storiesOf('Bar Chart', module)
  .add('Simple bar', () => (
    <Bar source={source} />
  ));
