import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import ReactEcharts from 'echarts-for-react';
import _ from 'lodash';
import { validate, getDimensionSeries } from '../utils';

export default class Scatter extends PureComponent {
  static propTypes = {
    source: PropTypes.arrayOf(PropTypes.array).isRequired,
  }

  render() {
    validate(this.props.source);
    const dimensions = _.first(this.props.source);
    const option = {
      legend: {},
      tooltip: {
        trigger: 'axis',
      },
      dataset: {
        source: this.props.source,
        dimensions,
      },
      xAxis: {
        splitLine: {
          lineStyle: {
            type: 'dashed',
          },
        },
      },
      yAxis: {
        splitLine: {
          lineStyle: {
            type: 'dashed',
          },
        },
        scale: true,
      },
      series: getDimensionSeries({
        dimensions,
        type: 'scatter',
      }),
    };

    return (
      <ReactEcharts option={option} {...this.props} />
    );
  }
}
