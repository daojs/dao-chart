import React from 'react';
import { storiesOf } from '@storybook/react';
import Pie from '../src/component/pie';
import { pieSource } from './data';


storiesOf('Pie Chart', module)
  .add('pie chart', () => (
    <Pie source={pieSource} />
  ));
