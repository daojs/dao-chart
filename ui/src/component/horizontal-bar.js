import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import ReactEcharts from 'echarts-for-react';
import _ from 'lodash';

export default class HorizontalBar extends PureComponent {
  static propTypes = {
    source: PropTypes.arrayOf(PropTypes.array).isRequired,
  }

  render() {
    const dimensions = _.first(this.props.source);
    if (_.isEmpty(dimensions)) {
      return null;
    }

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
      series: _.map(dimensions.slice(1), dimension => ({
        type: 'bar',
        name: dimension,
      })),
    };

    return (
      <ReactEcharts option={option} {...this.props} />
    );
  }
}
