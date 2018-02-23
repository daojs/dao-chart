import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import ReactEcharts from 'echarts-for-react';
import _ from 'lodash';

export default class Donut extends PureComponent {
  static propTypes = {
    source: PropTypes.arrayOf(PropTypes.array),
    percent: PropTypes.number,
    title: PropTypes.string,
    subTitle: PropTypes.string,
    hasLegend: PropTypes.bool,
  }

  static defaultProps = {
    source: null,
    percent: null,
    title: '',
    subTitle: '',
    hasLegend: false,
  }

  render() {
    const {
      source,
      percent,
      title,
      subTitle,
      hasLegend,
    } = this.props;
    if (_.isEmpty(source) && _.isNull(percent)) {
      return null;
    }

    let option = {
      title: {
        text: title,
        subtext: subTitle,
        x: 'center',
        y: 'center',
        textStyle: {
          fontSize: '26',
        },
        subtextStyle: {
          fontSize: '16',
        },
      },
      series: [
        {
          type: 'pie',
          radius: ['50%', '70%'],
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
    };
    if (!_.isNull(percent)) {
      option = _.defaultsDeep({
        series: [
          {
            data: [
              {
                value: percent,
                itemStyle: {
                  normal: {
                    color: '#58afff',
                  },
                },
              },
              {
                value: _.max([100 - percent, 0]),
                itemStyle: {
                  normal: {
                    color: '#f2f4f6',
                  },
                  emphasis: {
                    color: '#f8f8f8',
                  },
                },
              },
            ],
          },
        ],
      }, option);
    } else {
      const total = _.chain(source)
        .slice(1)
        .reduce((tot, row) => tot + row[1], 0)
        .value();
      option = _.defaultsDeep({
        tooltip: {
          trigger: 'item',
          formatter: '{b}: {d}%',
        },
        legend: hasLegend ?
          {
            orient: 'vertical',
            top: 'middle',
            right: '5%',
            formatter: name => _.chain(source)
              .filter(row => row[0] === name)
              .map(row => `${row[0]} | ${_.round((row[1] / total) * 100, 2)}%    ${row[1]}`)
              .first()
              .value(),
            data: source.slice(1).map(row => ({
              name: row[0],
              value: row.join(':'),
              icon: 'circle',
            })),
          } :
          {
            show: false,
          },
        series: [
          {
            data: source.slice(1).map(row => ({
              name: row[0],
              value: row[1],
            })),
          },
        ],
      }, option);
    }

    return (
      <ReactEcharts option={option} />
    );
  }
}
