import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import ReactEcharts from 'echarts-for-react';
import _ from 'lodash';
import { validate, getDimensionSeries } from '../utils';

export default class Line extends PureComponent {
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
      yAxis: {
        type: 'value',
      },
      xAxis: {
        type: 'category',
        boundaryGap: false,
      },
      series: getDimensionSeries({
        dimensions,
        type: 'line',
      }),
    };

    return (
      <ReactEcharts option={option} {...this.props} />
    );
  }
}
