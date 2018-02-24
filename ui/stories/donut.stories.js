import React from 'react';
import { storiesOf } from '../.storybook/facade';
import Donut from '../src/component/donut';
import { pieSource } from './data';


storiesOf('Donut Chart', module)
  .add('donut chart - percent', () => (
    <Donut percent={28} title="28%" subTitle="fast food" />
  ))
  .add('donut chart - data', () => (
    <Donut source={pieSource} title="$15781" subTitle="revenue" />
  ))
  .add('donut chart - data - withoutLegend', () => (
    <Donut hasLegend={false} source={pieSource} title="$15781" subTitle="revenue" />
  ));
