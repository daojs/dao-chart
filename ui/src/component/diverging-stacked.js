import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import ReactEcharts from 'echarts-for-react';
import _ from 'lodash';
import { validate } from '../utils';

export default class DivergingStacked extends PureComponent {
  static propTypes = {
    source: PropTypes.arrayOf(PropTypes.array.isRequired).isRequired,
  }

  render() {
    // e.g. [ Date, Negative, Neutral, Positive ]
    const { source } = this.props;
    validate(source);

    const dimensions = _.first(source);
    if (_.size(dimensions) !== 4) {
      throw new Error('DivergingStacked chart data source should have 4 columns, e.g. Date, Negative, Neutral, Positive');
    }

    // Add a transparent series so that the center points of neutral could be at same x value
    const dummySeries = _.map(source.slice(1), row => (_.nth(row, 1) + (_.nth(row, 2) / 2)));
    const maxDummy = _.max(dummySeries) + 5; // 5 is the minimum transparent bar value

    const transparentColumn = _.map(dummySeries, value => (maxDummy - value));
    // Insert transparent series at 2nd column of source,
    // so the stack bar starts from transparent series
    const newSource = _.map(source, (item, index) =>
      [_.first(item), index === 0 ? 'dummy' : _.nth(transparentColumn, index - 1), ...item.slice(1)]);

    // transpose 2d-array, so the first row is Y, the other rows are series
    const transposedData = _.zip(...newSource);
    const option = {
      legend: {
        data: dimensions.slice(1),
      },
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'shadow',
        },
        formatter: () => '',
      },
      xAxis: {
        show: false,
      },
      yAxis: {
        type: 'category',
        data: _.first(transposedData).slice(1),
        axisTick: {
          alignWithLabel: true,
        },
      },
      series: _.map(transposedData.slice(1), (series, index) => (_.defaults(
        {
          name: series[0],
          type: 'bar',
          stack: 'total',
          data: series.slice(1),
        },
        // if it is transparent series, set color as transparent, otherwise show label
        index === 0 ?
          {
            itemStyle: {
              normal: {
                barBorderColor: 'rgba(0,0,0,0)',
                color: 'rgba(0,0,0,0)',
              },
              emphasis: {
                barBorderColor: 'rgba(0,0,0,0)',
                color: 'rgba(0,0,0,0)',
              },
            },
          } :
          {
            label: {
              normal: {
                show: true,
                position: 'inside',
              },
            },
          },
      ))),
    };

    return (
      <ReactEcharts option={option} {...this.props} />
    );
  }
}
