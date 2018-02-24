import React from 'react';
import ReactEcharts from 'echarts-for-react';
import { storiesOf } from '@storybook/react';
import { specs, describe, it } from 'storybook-addon-specifications';
import { shallow } from 'enzyme';
import expect from 'expect';
import Area from '../src/component/area';
import { source } from './data';

storiesOf('Area Chart', module)
  .add('Simple area', () => {
    const story = <Area source={source} />;

    specs(() => describe('Simple area', () => {
      it('should have type ReactEcharts', () => {
        const output = shallow(story);
        expect(output.type()).toBe(ReactEcharts);
      });
    }));

    return story;
  });
