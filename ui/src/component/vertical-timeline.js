import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import ReactEcharts from 'echarts-for-react';
import _ from 'lodash';
import { validate } from '../utils';

export default class VerticalTimeline extends PureComponent {
  static propTypes = {
    source: PropTypes.arrayOf(PropTypes.array).isRequired,
  }

  render() {
    const { source } = this.props;
    validate(source);

    const columns = _.zip(...source);
    const option = {
      legend: {
      },
      tooltip: {
        trigger: 'axis',
        formatter: '{b} : {c}',
      },
      xAxis: {
        type: 'value',
      },
      yAxis: {
        type: 'category',
        axisLine: { onZero: false },
        // align label and axis tick
        boundaryGap: false,
        data: _.chain(columns)
          .first()
          .slice(1)
          .reverse()
          .value(),
      },
      series: [
        {
          type: 'line',
          smooth: true,
          lineStyle: {
            normal: {
              width: 3,
              shadowColor: 'rgba(0,0,0,0.1)',
              shadowBlur: 6,
              shadowOffsetY: 6,
            },
          },
          data: _.chain(columns)
            .get(1)
            .slice(1)
            .reverse()
            .value(),
        },
      ],
    };

    return (
      <ReactEcharts option={option} {...this.props} />
    );
  }
}
