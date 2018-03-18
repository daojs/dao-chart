import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import ReactEcharts from 'echarts-for-react';
import _ from 'lodash';
import { validate, getDataOption } from '../utils';

export default class TargetLine extends PureComponent {
  static propTypes = {
    source: PropTypes.arrayOf(PropTypes.array).isRequired,
    target: PropTypes.number.isRequired,
  }

  getOption() {
    const {
      source,
      target,
    } = this.props;
    const dataOption = getDataOption({
      source,
      defaultSeriesOpt: (index) => {
        const opt = {
          type: 'line',
        };
        if (index === 0) {
          return _.defaults(opt, {
            markLine: {
              silent: true,
              symbol: '',
              lineStyle: {
                type: 'solid',
              },
              label: {
                show: false,
              },
              data: [
                {
                  yAxis: target,
                },
              ],
            },
          });
        }
        return opt;
      },
      defaultSeriesDataOpt: (value) => {
        const opt = {
          symbolSize: 6,
        };
        if (value > target) {
          return _.defaults(opt, {
            symbol: 'circle',
            itemStyle: {
              color: 'green',
            },
          });
        }
        if (value < target) {
          return _.defaults(opt, {
            symbol: 'rect',
            symbolRotate: 45,
            itemStyle: {
              color: 'orange',
            },
          });
        }
        return opt;
      },
    });

    return _.defaultsDeep({
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
  }

  render() {
    validate(this.props.source);

    return (
      <ReactEcharts option={this.getOption()} {...this.props} />
    );
  }
}
