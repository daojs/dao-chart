import React from 'react';
import _ from 'lodash';
import { storiesOf } from '../.storybook/facade';
import Heatmap from '../src/component/heatmap';

const hours = ['12a', '1a', '2a', '3a', '4a', '5a', '6a',
  '7a', '8a', '9a', '10a', '11a',
  '12p', '1p', '2p', '3p', '4p', '5p',
  '6p', '7p', '8p', '9p', '10p', '11p'];

const days = ['Saturday', 'Friday', 'Thursday',
  'Wednesday', 'Tuesday', 'Monday', 'Sunday'];


const data = _.map(hours, hour =>
  _.map(days, day => [hour, day, _.random(1, 100)]));

storiesOf('Heatmap Chart', module)
  .add('Simple heatmap', () => (
    <Heatmap
      source={[['Hour', 'DayOfWeek', 'Value'], ..._.flatten(data)]}
      style={{ height: '500px', width: '100%' }}
    />
  ));
