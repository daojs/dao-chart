import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import ReactEcharts from 'echarts-for-react';
import _ from 'lodash';
import { validate, getDataOption } from '../utils';

export default class Bullet extends PureComponent {
  static propTypes = {
    source: PropTypes.arrayOf(PropTypes.array).isRequired,
  }

  render() {
    const { source } = this.props;
    validate(this.props.source);
    const dataOption = getDataOption({
      source,
      defaultSeriesOpt: (() => {
        const map = {
          0: {
            type: 'bar',
            barGap: '-300%',
            barWidth: 6,
            z: 10,
            itemStyle: {
              normal: {
                color: '#4682b4',
              },
            },
          },
          1: {
            type: 'scatter',
            symbol: 'rect',
            silent: true,
            itemStyle: {
              normal: {
                color: '#333',
              },
            },
            symbolSize: [20, 3],
            symbolOffset: ['-30%', 0],
            z: 20,
          },
          default: (idx, tot) => ({
            type: 'bar',
            stack: 'total',
            barWidth: 30,
            color: (rgb => `rgb(${rgb}, ${rgb}, ${rgb})`)(_.round((idx - 2) / (tot - 2) * (255 - 153) + 153)), // eslint-disable-line
          }),
        };

        return (index, total) => map[index] || map.default(index, total);
      })(),
    });

    const option = _.defaultsDeep({
      legend: {},
      tooltip: {},
      yAxis: {},
      xAxis: { type: 'category' },
    }, {
      xAxis: dataOption.axis,
      series: dataOption.series,
    });

    return (
      <ReactEcharts option={option} {...this.props} />
    );
  }
}
