import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import ReactEcharts from 'echarts-for-react';
import _ from 'lodash';
import { lineScale as lineScaleFactory } from '../utils';

// TODO: find a better way to map a serize of data to a proper range
const lineScale = _.partial(lineScaleFactory, 10, 80);

export default class Bubble extends PureComponent {
  static propTypes = {
    source: PropTypes.arrayOf(PropTypes.array.isRequired).isRequired,
  }

  render() {
    const { source } = this.props;
    const newSource = Array.isArray(_.first(_.first(source))) ? source : [source];

    const sizeData = _.chain(newSource)
      .map(data => data.slice(1))
      .flatten()
      .map(row => _.nth(row, 2))
      .value();

    // [x, y, size, label, legend], has label info
    // [x, y, size, legend], doesn't have label info
    const hasLabelInfo = _.chain(newSource)
      .first()
      .first()
      .size()
      .value() > 4;

    const maxSize = _.max(sizeData);
    const minSize = _.min(sizeData);

    const option = {
      legend: {
        right: 10,
        data: _.chain(newSource)
          .map(data => _.nth(data, 1))
          .map(row => _.last(row))
          .filter(Boolean)
          .map(data => data.toString())
          .value(),
      },
      tooltip: {},
      xAxis: {
        splitLine: {
          lineStyle: {
            type: 'dashed',
          },
        },
      },
      yAxis: {
        splitLine: {
          lineStyle: {
            type: 'dashed',
          },
        },
        scale: true,
      },
      series: _.map(newSource, (items) => {
        const data = _.slice(items, 1);

        return _.defaults({
          name: _.last(_.first(data)),
          data,
          type: 'scatter',
          symbolSize: row => lineScale(minSize, maxSize, _.nth(row, 2)),
          itemStyle: {
            normal: {
              shadowBlur: 10,
              shadowColor: 'rgba(120, 36, 50, 0.5)',
              shadowOffsetY: 5,
            },
          },
        }, hasLabelInfo ? {
          label: {
            emphasis: {
              show: true,
              formatter: param => _.nth(param.data, 3),
              position: 'top',
            },
          },
        } : {});
      }),
    };

    return (
      <ReactEcharts option={option} {...this.props} />
    );
  }
}
