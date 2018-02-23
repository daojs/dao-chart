import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import ReactEcharts from 'echarts-for-react';
import _ from 'lodash';

export default class Line extends PureComponent {
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
      series: _.map(dimensions.slice(1), dimension => ({
        type: 'line',
        name: dimension,
      })),
    };

    return (
      <ReactEcharts option={option} {...this.props} />
    );
  }
}
