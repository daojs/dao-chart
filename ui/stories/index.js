import React from 'react';
import { storiesOf } from '@storybook/react';
import Hello from '../src/component/hello';
import Bar from '../src/component/bar';
import Line from '../src/component/line';
import Scatter from '../src/component/scatter';
import Radar from '../src/component/radar';
// 目前并非所有图表都支持 dataset。
// 支持 dataset 的图表有： line、bar、pie、scatter、effectScatter、parallel、candlestick、map、funnel、custom

const source = [
  ['product', '2015', '2016', '2017'],
  ['Matcha Latte', 43.3, 85.8, 93.7],
  ['Milk Tea', 83.1, 73.4, 55.1],
  ['Cheese Cocoa', 86.4, 65.2, 82.5],
  ['Walnut Brownie', 72.4, 53.9, 39.1],
];

storiesOf('Hello', module)
  .add('hello', () => (
    <Hello />
  ));

storiesOf('Bar Chart', module)
  .add('Simple bar', () => (
    <Bar source={source} />
  ));

storiesOf('Line Chart', module)
  .add('Simple line', () => (
    <Line source={source} />
  ));

const scatterSource = [
  ['Price', 'Meat', 'Vegetable'],
  [23, 167, 8.3],
  [81, 284, 12],
  [91, 413, 4.1],
  [13, 287, 13.5],
];

storiesOf('Scatter Chart', module)
  .add('Simple scatter', () => (
    <Scatter source={scatterSource} />
  ));

storiesOf('Radar Chart', module)
  .add('Simple radar', () => (
    <Radar source={source} />
  ));
