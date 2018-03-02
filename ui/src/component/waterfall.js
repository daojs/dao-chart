import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import ReactEcharts from 'echarts-for-react';
import _ from 'lodash';
import { validate } from '../utils';

export default class Sankey extends PureComponent {
  static propTypes = {
    source: PropTypes.arrayOf(PropTypes.array).isRequired,
  }

  render() {
    const { source } = this.props;
    validate(source);

    const columns = _.zip(...source);
    const option = {
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'shadow',
        },
        formatter(params) {
          const target = _.get(params, '[1].value') !== '-'
            ? _.get(params, 1)
            : _.get(params, 2);
          return `${target.name}<br/>${target.seriesName} : ${target.value}`;
        },
      },
      legend: {
        show: false,
      },
      xAxis: [
        {
          type: 'category',
          splitLine: { show: false },
          data: _.chain(columns).first().slice(1).value(),
        },
      ],
      yAxis: [
        {
          type: 'value',
        },
      ],
      series: (() => {
        const assistant = [];
        const positive = [];
        const negtive = [];
        //               = tot[i-1]        (num >= 0)
        // assistant[i]
        //               = tot[i-1] + num  (num < 0)
        _.chain(columns)
          .get(1)
          .slice(1)
          .reduce((tot, num) => {
            if (num >= 0) {
              positive.push(num);
              negtive.push('-');
              assistant.push(tot);
            } else {
              positive.push('-');
              negtive.push(0 - num);
              assistant.push(tot + num);
            }
            return tot + num;
          }, 0)
          .value();

        return [
          {
            name: 'assistant',
            type: 'bar',
            stack: 'total',
            itemStyle: {
              normal: {
                barBorderColor: 'rgba(0,0,0,0)',
                color: 'rgba(0,0,0,0)',
              },
              emphasis: {
                barBorderColor: 'rgba(0,0,0,0)',
                color: 'rgba(0,0,0,0)',
              },
            },
            data: assistant,
          },
          {
            name: 'positive',
            type: 'bar',
            stack: 'total',
            itemStyle: {
              normal: {
                label: {
                  show: true,
                  position: 'top',
                },
              },
            },
            data: positive,
          },
          {
            name: 'negtive',
            type: 'bar',
            stack: 'total',
            itemStyle: {
              normal: {
                label: {
                  show: true,
                  position: 'bottom',
                },
              },
            },
            data: negtive,
          },
        ];
      })(),
    };


    return (
      <ReactEcharts option={option} {...this.props} />
    );
  }
}
