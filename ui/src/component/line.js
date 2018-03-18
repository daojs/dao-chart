import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import ReactEcharts from 'echarts-for-react';
import _ from 'lodash';
import { validate, getDataOption } from '../utils';

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

  getSource() {
    return this.props.source;
  }

  getOption() {
    const dataOption = getDataOption({
      source: this.getSource(),
      defaultSeriesOpt: {
        type: 'line',
      },
    });

    return _.defaultsDeep({
      title: this.props.title,
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
    }, {
      xAxis: dataOption.axis,
      series: dataOption.series,
    });
  }

  render() {
    const source = this.getSource();

    validate(source);
    const onEvents = {
      click: args =>
        this.props.onSlicerChange(_.defaults(
          {}, { dataObj: _.zipObject(_.first(source), args.data) },
          args,
        )),
    };

    return (
      <ReactEcharts
        option={this.getOption()}
        notMerge={true} //eslint-disable-line
        onEvents={onEvents}
        {...this.props}
      />
    );
  }
}
