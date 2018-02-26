import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import ReactEcharts from 'echarts-for-react';
import _ from 'lodash';
import { validate, getDataSeries, transpose } from '../utils';

export default class Area extends PureComponent {
  static propTypes = {
    source: PropTypes.arrayOf(PropTypes.array).isRequired,
  }

  render() {
    const { source } = this.props;
    validate(source);

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
        data: _.chain(transpose(source)).first().slice(1).value(),
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
