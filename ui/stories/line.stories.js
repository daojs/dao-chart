import React from 'react';
import { storiesOf } from '../.storybook/facade';
import Line from '../src/component/line';
import TargetLine from '../src/component/target-line';
import Cumulative from '../src/component/cumulative';
import { timeSource } from './data';

const cumulativeSource = [
  ['time', 'Matcha Latte', 'Milk Tea', 'Cheese Cocoa', 'Walnut Brownie'],
  ['2018/1', 43.3, 40, 16.4, 152.4],
  ['2018/2', 85.8, 75, 35.2, 193.9],
  ['2018/3', 93.7, 125, 62.5, 229.1],
  ['2018/4', 103.7, 160, 152.5, 249.1],
  ['2018/4', 113.7, 205, 265.5, 259.1],
];

const growthRateSource = [
  ['time', 'ProductA', 'ProductB', 'ProductC'],
  ['2018/1', 5, -5, 10],
  ['2018/2', 3, 15, 8],
  ['2018/3', 1, -10, 6],
  ['2018/4', 3, 20, 4],
  ['2018/5', 5, -5, 2],
];

storiesOf('Line Chart', module)
  .add('Simple line', () => (
    <Line source={timeSource} />
  ))
  .add('Target line', () => (
    <TargetLine target={80} source={timeSource} />
  ))
  .add('Cumulative', () => (
    <Cumulative source={cumulativeSource} />
  ))
  .add('Growth rate', () => (
    <Line source={growthRateSource} />
  ));
