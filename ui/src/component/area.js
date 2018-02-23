import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import ReactEcharts from 'echarts-for-react';
import _ from 'lodash';

export default class Area extends PureComponent {
  static propTypes = {
    source: PropTypes.arrayOf(PropTypes.array).isRequired,
  }

  render() {
    const dimensions = _.first(this.props.source);
    const source = _.slice(this.props.source, 1);
    if (_.isEmpty(dimensions)) {
      return null;
    }

    const option = {
      legend: {},
      tooltip: {
        trigger: 'axis',
      },
      yAxis: {
        type: 'value',
      },
      xAxis: {
        type: 'category',
        boundaryGap: false,
        data: _.slice(dimensions, 1),
      },
      series: _.map(source, row => ({
        type: 'line',
        name: row[0],
        stack: 'total',
        areaStyle: { normal: {} },
        data: _.slice(row, 1),
      })),
    };

    return (
      <ReactEcharts option={option} {...this.props} />
    );
  }
}
