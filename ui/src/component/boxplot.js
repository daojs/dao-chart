import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import ReactEcharts from 'echarts-for-react';
import _ from 'lodash';
import { validate } from '../utils';

export default class Boxplot extends PureComponent {
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
        source: this.props.source.slice(1),
      },
      yAxis: {},
      xAxis: { type: 'category' },
      series: [{
        type: 'candlestick',
        dimensions,
        encode: {
          x: _.first(dimensions),
          y: _.slice(dimensions, 1),
        },
      }],
    };

    return (
      <ReactEcharts option={option} {...this.props} />
    );
  }
}
