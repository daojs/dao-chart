import React from 'react';
import { storiesOf } from '../.storybook/facade';
import Radar from '../src/component/radar';
import { source } from './data';

storiesOf('Radar Chart', module)
  .add('Simple radar', () => (
    <Radar source={source} style={{ height: '500px', width: '100%' }} />
  ));
