import React from 'react';
import { storiesOf } from '@storybook/react';
import Pie from '../src/component/pie';

const data = [
  { value: 335, name: '直接访问' },
  { value: 310, name: '邮件营销' },
  { value: 234, name: '联盟广告' },
  { value: 135, name: '视频广告' },
  { value: 1548, name: '搜索引擎' },
];


storiesOf('Pie Chart', module)
  .add('pie chart - percent', () => (
    <Pie percent={28} title="28%" subTitle="fast food" height={140} />
  ))
  .add('pie chart - data', () => (
    <Pie percent={28} />
  ));
