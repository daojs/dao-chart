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
    hasDataZoom: PropTypes.bool,
  }

  static defaultProps = {
    onSlicerChange: _.noop,
    title: {},
    hasDataZoom: false,
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
      dataZoom: this.props.hasDataZoom ? [{
        type: 'slider',
        showDataShadow: false,
        bottom: 10,
        height: 20,
        borderColor: 'transparent',
        backgroundColor: '#e2e2e2',
        handleSize: 20,
        handleStyle: {
          shadowBlur: 6,
          shadowOffsetX: 1,
          shadowOffsetY: 2,
          shadowColor: '#aaa',
        },
        labelFormatter: '',
      }, {
        type: 'inside',
      }] : [],
    };

    const onEvents = {
      click: args =>
        this.props.onSlicerChange(_.defaults(
          {}, { dataObj: _.zipObject(_.first(this.props.source), args.data) },
          args,
        )),
    };

    return (
      <ReactEcharts
        option={option}
        notMerge={true} //eslint-disable-line
        onEvents={onEvents}
        {...this.props}
      />
    );
  }
}
