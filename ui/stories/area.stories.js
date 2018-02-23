import React from 'react';
import { storiesOf } from '@storybook/react';
import Area from '../src/component/area';
import { source } from './data';

storiesOf('Area Chart', module)
  .add('Simple area', () => (
    <Area source={source} />
  ));
