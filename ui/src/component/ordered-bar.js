import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import ReactEcharts from 'echarts-for-react';
import _ from 'lodash';
import { validate } from '../utils';

export default class OrderedBar extends PureComponent {
  static propTypes = {
    source: PropTypes.arrayOf(PropTypes.array).isRequired,
  }

  render() {
    validate(this.props.source);
    const dimensions = _.first(this.props.source);
    // ordered chart only supports single metric and single dimension
    if (_.size(dimensions) > 2) {
      return null;
    }

    const [y, x] = dimensions;

    const newSource = _.reduce(this.props.source.slice(1), (memo, data) => [
      ...memo,
      {
        [y]: _.first(data),
        [x]: _.last(data),
      },
    ], []);
    const sortedSource = _.sortBy(newSource, x);

    const option = {
      legend: {},
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'shadow',
        },
      },
      dataset: {
        source: sortedSource,
        dimensions,
      },
      yAxis: { type: 'category' },
      xAxis: { type: 'value' },
      series: {
        type: 'bar',
        name: x,
      },
    };

    return (
      <ReactEcharts option={option} {...this.props} />
    );
  }
}
