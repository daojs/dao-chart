import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import ReactEcharts from 'echarts-for-react';
import _ from 'lodash';
import { validate, getDataSeries } from '../utils';

export default class Area extends PureComponent {
  static propTypes = {
    source: PropTypes.arrayOf(PropTypes.array).isRequired,
  }

  render() {
    validate(this.props.source);
    const dimensions = _.first(this.props.source);
    const source = _.slice(this.props.source, 1);
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
      series: getDataSeries({
        source,
        type: 'line',
        defaultSeriesOpt: {
          stack: 'total',
          areaStyle: { normal: {} },
        },
      }),
    };

    console.log(`the options is:  ${JSON.stringify(option.series)}`); //eslint-disable-line

    return (
      <ReactEcharts option={option} {...this.props} />
    );
  }
}
