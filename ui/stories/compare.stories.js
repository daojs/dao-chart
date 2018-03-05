import React from 'react';
import { storiesOf } from '../.storybook/facade';
import Compare from '../src/component/compare';


const compareSource = [
  [
    {
      name: '时间',
    },
    {
      name: '营业额',
      type: 'line',
    },
    {
      name: '客户数量',
      type: 'line',
    },
    {
      name: 'PM2.5',
      type: 'bar',
    },
    {
      name: '平均温度',
      type: 'line',
    },
  ],
  ['2017/1', 681, 128, 45, 4],
  ['2017/2', 553, 125, 127, 6],
  ['2017/3', 688, 119, 131, -6],
  ['2017/4', 551, 151, 180, 22],
  ['2017/5', 676, 158, 56, 11],
  ['2017/6', 679, 178, 157, 12],
  ['2017/7', 615, 148, 80, -8],
  ['2017/8', 638, 149, 91, 28],
  ['2017/9', 579, 150, 142, 6],
  ['2017/10', 594, 162, 62, 14],
  ['2017/11', 626, 145, 40, 18],
  ['2017/12', 507, 164, 169, 8],
];


storiesOf('Compare Chart', module)
  .add('compare chart', () => {
    const story = <Compare source={compareSource} />;

    return story;
  });
