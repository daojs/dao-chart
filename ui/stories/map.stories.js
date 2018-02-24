import React from 'react';
import { storiesOf } from '../.storybook/facade';
import Map from '../src/component/map';

const source = [
  ['Location', 'iPhone3', 'iPhone4'],
  ['北京', 272, 973],
  ['天津', 508, 129],
  ['上海', 297, 23],
  ['重庆', 913, 488],
  ['河北', 850, 334],
  ['河南', 934, 361],
  ['云南', 620, 172],
  ['辽宁', 975, 683],
  ['黑龙江', 532, 567],
  ['湖南', 839, 435],
  ['安徽', 827, 881],
  ['山东', 297, 85],
  ['新疆', 994, 914],
  ['江苏', 951, 667],
  ['浙江', 307, 946],
  ['江西', 657, 160],
  ['湖北', 844, 398],
  ['广西', 213, 825],
  ['甘肃', 841, 512],
  ['山西', 513, 221],
  ['内蒙古', 636, 570],
  ['陕西', 546, 651],
  ['吉林', 957, 104],
  ['福建', 441, 394],
  ['贵州', 306, 606],
  ['广东', 892, 1],
  ['青海', 363, 346],
  ['西藏', 876, 458],
  ['四川', 343, 917],
  ['宁夏', 7, 446],
  ['海南', 788, 305],
  ['台湾', 452, 710],
  ['香港', 776, 754],
  ['澳门', 17, 732],
];


storiesOf('Map Chart', module)
  .add('Simple map', () => (
    <Map source={source} style={{ height: '800px', width: '100%' }} />
  ));
