import React from 'react';
import { storiesOf } from '@storybook/react';
import Pie from '../src/component/pie';
import { pieSource } from './data';


storiesOf('Pie Chart', module)
  .add('pie chart - percent', () => (
    <Pie percent={28} />
  ))
  .add('pie chart - data', () => (
    <Pie source={pieSource} />
  ))
  .add('pie chart - data - withoutLegend', () => (
    <Pie hasLegend={false} source={pieSource} />
  ));
