import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import ReactEcharts from 'echarts-for-react';
import _ from 'lodash';
import { validate } from '../utils';

export default class Heatmap extends PureComponent {
  static propTypes = {
    source: PropTypes.arrayOf(PropTypes.array).isRequired,
  }

  render() {
    const { source } = this.props;
    validate(source);

    const dimensions = _.first(source);
    const newSource = _.zip(...source);
    const data = _.nth(newSource, 2).slice(1);
    const option = {
      legend: {},
      tooltip: {
        position: 'top',
      },
      dataset: {
        source,
      },
      xAxis: {
        type: 'category',
        splitArea: {
          show: true,
        },
      },
      yAxis: {
        type: 'category',
        splitArea: {
          show: true,
        },
      },
      visualMap: {
        min: _.min(data),
        max: _.max(data),
        calculable: true,
        left: 'left',
        top: 'bottom',
      },
      series: [{
        name: _.last(dimensions),
        type: 'heatmap',
        label: {
          normal: {
            show: true,
          },
        },
        itemStyle: {
          emphasis: {
            shadowBlur: 10,
            shadowColor: 'rgba(0, 0, 0, 0.5)',
          },
        },
      }],
    };

    return (
      <ReactEcharts option={option} {...this.props} />
    );
  }
}
