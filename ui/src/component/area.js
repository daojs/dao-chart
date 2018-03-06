import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import ReactEcharts from 'echarts-for-react';
import _ from 'lodash';
import { validate, getDataOption } from '../utils';

export default class Area extends PureComponent {
  static propTypes = {
    source: PropTypes.arrayOf(PropTypes.array).isRequired,
  }

  render() {
    const { source } = this.props;
    validate(source);
    const dataOption = getDataOption({
      source,
      defaultSeriesOpt: {
        type: 'line',
        stack: 'total',
        areaStyle: { normal: {} },
      },
    });

    const option = _.defaultsDeep({
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
      },
    }, {
      xAxis: dataOption.axis,
      series: dataOption.series,
    });

    console.log(`the options is:  ${JSON.stringify(option.series)}`); //eslint-disable-line

    return (
      <ReactEcharts option={option} {...this.props} />
    );
  }
}
