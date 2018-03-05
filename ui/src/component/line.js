import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import ReactEcharts from 'echarts-for-react';
import _ from 'lodash';
import { validate, getDimensionSeries } from '../utils';

export default class Line extends PureComponent {
  static propTypes = {
    source: PropTypes.arrayOf(PropTypes.array).isRequired,
    title: PropTypes.objectOf(PropTypes.any),
    onSlicerChange: PropTypes.func,
  }

  static defaultProps = {
    onSlicerChange: _.noop,
    title: {},
  }

  render() {
    validate(this.props.source);
    const dimensions = _.first(this.props.source);
    const option = {
      title: this.props.title,
      legend: {},
      tooltip: {
        trigger: 'axis',
      },
      dataset: {
        source: this.props.source,
        dimensions,
      },
      yAxis: {
        type: 'value',
      },
      xAxis: {
        type: 'category',
        boundaryGap: false,
      },
      series: getDimensionSeries({
        dimensions,
        type: 'line',
      }),
    };

    const onEvents = {
      click: args =>
        this.props.onSlicerChange(_.defaults(
          {}, { dataObj: _.zipObject(_.first(this.props.source), args.data) },
          args,
        )),
    };

    return (
      <ReactEcharts option={option} onEvents={onEvents} {...this.props} />
    );
  }
}
