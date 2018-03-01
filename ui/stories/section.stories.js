import React from 'react';
import { storiesOf } from '../.storybook/facade';
import Section from '../src/section';

storiesOf('Section', module)
  .add('pie chart', () => (
    <Section config={{
      dimensions: {
        渠道: {

          toSlicer: 'channel',
        },
      },
      chartType: 'pie',
    }}
    />
  ))
  .add('compare chart', () => (
    <Section config={{
      sessionId: 2,
      dimensions: {
        date: {
          type: 'date-range',
          start: '1/1/2017',
          end: '12/31/2017',
          granularity: 'day',
        },
      },
      metrics: {
        turnover: {
          seriesType: 'line',
        },
        'customer-num': {
          seriesType: 'line',
        },
        'pm2.5': {
          seriesType: 'bar',
        },
        temperature: {
          seriesType: 'line',
        },
      },
      chartType: 'compare',
    }}
    />
  ));
