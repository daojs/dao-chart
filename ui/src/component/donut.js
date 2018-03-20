import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import ReactEcharts from 'echarts-for-react';
import _ from 'lodash';

export default class Donut extends PureComponent {
  static propTypes = {
    source: PropTypes.arrayOf(PropTypes.array),
    percent: PropTypes.number,
    title: PropTypes.objectOf(PropTypes.any),
    subTitle: PropTypes.string,
    hasLegend: PropTypes.bool,
  }

  static defaultProps = {
    source: null,
    percent: null,
    title: { text: '' },
    subTitle: '',
    hasLegend: true,
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

    const rawOption = {
      title: {
        text: title.text,
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

    const option = _.isNull(percent) ?
      _.defaultsDeep({
        dataset: {
          source,
        },
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
              .map((() => {
                const total = _.chain(source)
                  .slice(1)
                  .reduce((tot, curRow) => tot + curRow[1], 0)
                  .value();

                return row => `${row[0]} | ${_.round((row[1] / total) * 100, 2)}%    ${row[1]}`;
              })())
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
      }, rawOption) :
      _.defaultsDeep({
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
      }, rawOption);

    return (
      <ReactEcharts option={option} />
    );
  }
}
