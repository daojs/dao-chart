import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import ReactEcharts from 'echarts-for-react';
import _ from 'lodash';
import { validate } from '../utils';

export default class Spine extends PureComponent {
  static propTypes = {
    source: PropTypes.arrayOf(PropTypes.array.isRequired).isRequired,
  }

  render() {
    const { source } = this.props;
    validate(source);

    /**
     * Transpose the 2D-array
     * e.g.
     *  ['Date', 'Income', 'Outcome','Profit'],
     *  ['Monday', 200, -100, 100],
     *
     *  =>
     *
     *  ['Date', 'Monday'],
     *  ['Income', 200],
     *  ['Outcome', -100],
     *  ['Profit', 100]
     */
    const newSource = _.zip(...source);
    const option = {
      legend: {},
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'shadow',
        },
      },
      yAxis: [
        {
          type: 'category',
          axisTick: { show: false },
          // Assume that the first row is X
          data: _.first(newSource).slice(1),
        },
      ],
      xAxis: [
        {
          type: 'value',
        },
      ],
      series: _.map(newSource.slice(1), (series, index) => ({
        name: series[0],
        type: 'bar',
        // Assume that 2nd and 3rd rows are for comparison.
        // If newSource has more than 3 rows, the rest rows are shown as horizontal bar
        stack: index < 2 ? 'total' : '',
        label: {
          normal: {
            show: true,
            position: 'inside',
          },
        },
        data: series.slice(1),
      })),
    };

    return (
      <ReactEcharts option={option} {...this.props} />
    );
  }
}
