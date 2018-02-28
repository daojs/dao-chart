import React from 'react';
import ReactEcharts from 'echarts-for-react';
import { shallow } from 'enzyme';
import expect from 'expect';
import { storiesOf, specs, describe, it } from '../.storybook/facade';
import Area from '../src/component/area';
import { timeSource } from './data';

storiesOf('Area Chart', module)
  .add('Simple area', () => {
    const story = <Area source={timeSource} />;

    specs(() => describe('Simple area', () => {
      it('should have type ReactEcharts', () => {
        const output = shallow(story);
        expect(output.type()).toBe(ReactEcharts);
      });
    }));

    return story;
  });
