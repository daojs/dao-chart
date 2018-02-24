import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import ReactEcharts from 'echarts-for-react';
import _ from 'lodash';
import { validate, getDimensionSeries } from '../utils';

export default class HorizontalBar extends PureComponent {
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
        axisPointer: {
          type: 'shadow',
        },
      },
      dataset: {
        source: this.props.source,
        dimensions,
      },
      yAxis: { type: 'category' },
      xAxis: { type: 'value' },
      series: getDimensionSeries({
        dimensions,
        type: 'bar',
      }),
    };

    return (
      <ReactEcharts option={option} {...this.props} />
    );
  }
}
