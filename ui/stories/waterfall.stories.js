import React from 'react';
import { storiesOf } from '../.storybook/facade';
import Waterfall from '../src/component/waterfall';

const source = [
  ['time', 'value'],
  ['1', 600],
  ['2', 305],
  ['3', 330],
  ['4', -108],
  ['5', -154],
  ['6', 135],
  ['7', 178],
  ['8', 286],
  ['9', -119],
  ['10', -361],
  ['11', -463],
];

storiesOf('Waterfall Chart', module)
  .add('Simple waterfall', () => {
    const story = <Waterfall source={source} />;

    return story;
  });
