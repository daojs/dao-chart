import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import ReactEcharts from 'echarts-for-react';
import _ from 'lodash';
import { validate } from '../utils';

export default class Pie extends PureComponent {
  static propTypes = {
    source: PropTypes.arrayOf(PropTypes.array),
    onSlicerChange: PropTypes.func,
    dimensions: PropTypes.objectOf(PropTypes.object),
  }

  static defaultProps = {
    source: null,
    onSlicerChange: _.noop,
    dimensions: {},
  }

  render() {
    const {
      source,
      onSlicerChange,
      dimensions,
    } = this.props;
    validate(source);

    const slicerDim = _.chain(source)
      .first()
      .filter(dim => _.get(dimensions, `${dim}.toSlicer`))
      .first()
      .value();

    const total = _.chain(source)
      .slice(1)
      .reduce((tot, row) => tot + row[1], 0)
      .value();

    const option = {
      dataset: {
        source,
      },
      series: [
        {
          type: 'pie',
          top: 'center',
          left: 'center',
          hoverOffset: 0,
          label: {
            normal: {
              show: false,
            },
          },
          labelLine: {
            normal: {
              show: false,
            },
          },
        },
      ],
      legend: {
        orient: 'vertical',
        top: 'middle',
        right: '0',
        formatter: name => _.chain(source)
          .filter(row => row[0] === name)
          .map(row => `${row[0]} | ${_.round((row[1] / total) * 100, 2)}%    ${row[1]}`)
          .first()
          .value(),
        data: source.slice(1).map(row => ({
          name: row[0],
          icon: 'circle',
        })),
      },
      tooltip: {
        trigger: 'item',
        formatter: '{b}: {d}%',
      },
    };

    let onEvents = { click: _.noop }; // work around for the bug in ReactEcharts
    if (slicerDim) {
      onEvents = {
        click: args => onSlicerChange(_.defaults({}, { slicer: dimensions[slicerDim] }, args)),
      };
    }

    return (
      <ReactEcharts option={option} onEvents={onEvents} />
    );
  }
}
