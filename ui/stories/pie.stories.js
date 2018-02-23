import React from 'react';
import { storiesOf } from '@storybook/react';
import Pie from '../src/component/pie';

const source = [
  ['name', 'value'],
  ['直接访问', 335],
  ['邮件营销', 310],
  ['联盟广告', 234],
  ['视频广告', 135],
  ['搜索引擎', 1548],
];


storiesOf('Pie Chart', module)
  .add('pie chart - percent', () => (
    <Pie percent={28} />
  ))
  .add('pie chart - data', () => (
    <Pie source={source} />
  ))
  .add('pie chart - data - hasLegend', () => (
    <Pie hasLegend source={source} />
  ));
