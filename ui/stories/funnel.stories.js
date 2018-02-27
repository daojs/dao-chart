import React from 'react';
import { storiesOf } from '../.storybook/facade';
import Funnel from '../src/component/funnel';

const source = [
  ['name', 'value'],
  ['访问', 60],
  ['咨询', 40],
  ['订单', 20],
  ['点击', 80],
  ['展现', 110],
];

storiesOf('Funnel Chart', module)
  .add('Simple funnel', () => (
    <Funnel source={source} style={{ height: '500px', width: '50%' }} />
  ));
