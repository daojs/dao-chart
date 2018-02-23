import React from 'react';
import { storiesOf } from '@storybook/react';
import Donut from '../src/component/donut';

const source = [
  ['name', 'value'],
  ['直接访问', 335],
  ['邮件营销', 310],
  ['联盟广告', 234],
  ['视频广告', 135],
  ['搜索引擎', 1548],
];


storiesOf('Donut Chart', module)
  .add('donut chart - percent', () => (
    <Donut percent={28} title="28%" subTitle="fast food" />
  ))
  .add('donut chart - data', () => (
    <Donut source={source} title="$15781" subTitle="revenue" />
  ))
  .add('donut chart - data - hasLegend', () => (
    <Donut hasLegend source={source} title="$15781" subTitle="revenue" />
  ));
