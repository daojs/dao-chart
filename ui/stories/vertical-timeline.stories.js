import React from 'react';
import { storiesOf } from '../.storybook/facade';
import VerticalTimeline from '../src/component/vertical-timeline';

const source = [
  ['date', 'value'],
  ['2/1', -6.5],
  ['2/2', -0.7],
  ['2/3', 2.3],
  ['2/4', 3.5],
  ['2/5', 2.1],
  ['2/6', 0.5],
  ['2/7', 0],
  ['2/8', 2],
  ['2/9', 8],
];

storiesOf('Vertical Timeline Chart', module)
  .add('Simple vertical timeline', () => {
    const story = <VerticalTimeline source={source} />;

    return story;
  });
