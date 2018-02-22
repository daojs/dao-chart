import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import ReactEcharts from 'echarts-for-react';
import _ from 'lodash';

export default class extends PureComponent {
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
      tooltip: {},
      dataset: {
        source: this.props.source,
        dimensions,
      },
      yAxis: {},
      xAxis: { type: 'category' },
      series: _.map(dimensions.slice(1), dimension => ({
        type: 'bar',
        name: dimension,
      })),
    };

    return (
      <ReactEcharts option={option} />
    );
  }
}
