import _ from 'lodash';
import React from 'react';
import { storiesOf } from '../.storybook/facade';
import Map from '../src/component/map';

function randomData() {
  return Math.round(Math.random() * 1000);
}

const locs = [
  '北京',
  '天津',
  '上海',
  '重庆',
  '河北',
  '河南',
  '云南',
  '辽宁',
  '黑龙江',
  '湖南',
  '安徽',
  '山东',
  '新疆',
  '江苏',
  '浙江',
  '江西',
  '湖北',
  '广西',
  '甘肃',
  '山西',
  '内蒙古',
  '陕西',
  '吉林',
  '福建',
  '贵州',
  '广东',
  '青海',
  '西藏',
  '四川',
  '宁夏',
  '海南',
  '台湾',
  '香港',
  '澳门',
];

const source = _.map(locs, loc => ([
  loc, randomData(), randomData(),
]));

source.unshift(['Location', 'iPhone3', 'iPhone4']);

storiesOf('Map Chart', module)
  .add('Simple map', () => (
    <Map source={source} style={{ height: '800px', width: '100%' }} />
  ));
