import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import ReactEcharts from 'echarts-for-react';
import _ from 'lodash';
import { validate } from '../utils';

require('echarts/map/js/china.js');

export default class Map extends PureComponent {
  static propTypes = {
    source: PropTypes.arrayOf(PropTypes.array).isRequired,
  }

  render() {
    validate(this.props.source);
    const dimensions = _.first(this.props.source);

    // dataset in map has a bug that the calcuated value in visualMap is not correct
    // so here set data in series
    const option = {
      legend: {},
      tooltip: { trigger: 'item' },
      visualMap: {
        min: 0,
        max: _.chain(this.props.source.slice(1))
          .map(data => data.slice(1))
          .map(data => _.sum(data))
          .flatten()
          .max()
          .value() + 1, // calculate max sum value in each loc
        left: 'left',
        top: 'bottom',
        text: ['高', '低'], // TODO, may need customize the text
        calculable: true,
      },
      series: _.map(dimensions.slice(1), (dimension, index) => ({
        name: dimension,
        type: 'map',
        mapType: 'china',
        roam: false,
        label: {
          normal: {
            show: true,
          },
          emphasis: {
            show: true,
          },
        },
        data: _.map(this.props.source.slice(1), data => ({
          name: data[0],
          value: data[index + 1],
        })),
      })),
    };

    return (
      <ReactEcharts option={option} {...this.props} />
    );
  }
}
