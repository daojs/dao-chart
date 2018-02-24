import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import ReactEcharts from 'echarts-for-react';
import _ from 'lodash';
import { validate } from '../utils';

export default class Radar extends PureComponent {
  static propTypes = {
    source: PropTypes.arrayOf(PropTypes.array).isRequired,
  }

  render() {
    const { source } = this.props;
    // transpose two-dimensional array
    /**
     *
      const source = [
        ['product', '2015', '2016', '2017'],
        ['Matcha Latte', 43.3, 85.8, 93.7],
        ['Milk Tea', 83.1, 73.4, 55.1],
      ];
      =>
      [
        ['product', 'Matcha Latte', 'Milk Tea'],
        ['2015', 43.3, 83.1],
        ['2016', 85.8, 73.4],
        ['2017', 93.7, 55.1],
      ];
     */
    validate(source);

    const newSource = source[0].map((col, i) => source.map(row => row[i]));

    const option = {
      legend: {},
      tooltip: {},
      radar: {
        indicator: _.map(_.first(newSource).slice(1), (item, index) => ({
          name: item,
          max: _.max(source[index + 1].slice(1)) + 10,
        })),
      },
      series: {
        type: 'radar',
        data: _.map(newSource.slice(1), data => ({
          name: data[0],
          value: data.slice(1),
        })),
      },
    };

    return (
      <ReactEcharts option={option} {...this.props} />
    );
  }
}
