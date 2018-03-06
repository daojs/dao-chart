import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import ReactEcharts from 'echarts-for-react';
import _ from 'lodash';
import { validate, getDataOption } from '../utils';

export default class Compare extends PureComponent {
  static propTypes = {
    source: PropTypes.arrayOf(PropTypes.array).isRequired,
  }

  render() {
    const {
      source,
    } = this.props;
    validate(source);

    const sereisTypes = _.chain(source)
      .first()
      .slice(1)
      .map(item => (item.type || 'line'))
      .value();

    const dataOption = getDataOption({
      source,
      defaultSeriesOpt: index => ({
        type: sereisTypes[index],
        xAxisIndex: _.floor(index / 2),
        yAxisIndex: index,
      }),
    });

    const option = _.defaultsDeep({
      legend: {},
      tooltip: {
        trigger: 'axis',
      },
      grid: [
        {
          top: '10%',
          height: '35%',
        },
        {
          top: '55%',
          height: '35%',
        },
      ],
      yAxis: [
        {
          gridIndex: 0,
        },
        {
          gridIndex: 0,
        },
        {
          gridIndex: 1,
          inverse: true,
        },
        {
          gridIndex: 1,
          inverse: true,
        },
      ],
      xAxis: [
        {
          type: 'category',
          boundaryGap: false,
          gridIndex: 0,
          axisLabel: {
            margin: 10,
          },
        },
        {
          gridIndex: 1,
          axisLabel: {
            show: false,
          },
        },
      ],
    }, {
      xAxis: [
        dataOption.axis,
        dataOption.axis,
      ],
      series: dataOption.series,
    });

    return (
      <ReactEcharts option={option} {...this.props} />
    );
  }
}
