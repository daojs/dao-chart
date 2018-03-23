import React from 'react';
import { storiesOf } from '../.storybook/facade';
import Pie from '../src/component/pie';
import Partition from '../src/component/partition';
import { pieSource } from './data';

const partitionSource = [
  ['Branch', 'Revenue'],
  ['员工餐厅', 9711],
  ['自助餐', 971],
  ['咖喱屋', 97],
];

storiesOf('Pie Chart', module)
  .add('pie chart', () => (
    <Pie source={pieSource} />
  ))
  .add('Partition', () => (
    <Partition source={partitionSource} />
  ));
