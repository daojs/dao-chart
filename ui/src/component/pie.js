import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import ReactEcharts from 'echarts-for-react';
import _ from 'lodash';

export default class Pie extends PureComponent {
  static propTypes = {
    data: PropTypes.arrayOf(PropTypes.object),
    percent: PropTypes.number,
    title: PropTypes.string,
    subTitle: PropTypes.string,
    hasLegend: PropTypes.bool,
  }

  static defaultProps = {
    data: null,
    percent: null,
    title: '',
    subTitle: '',
    hasLegend: false,
  }

  render() {
    const {
      data,
      percent,
      title,
      subTitle,
      hasLegend,
    } = this.props;
    if (_.isEmpty(data) && _.isNull(percent)) {
      return null;
    }

    let option = {
      title: {
        text: title,
        subtext: subTitle,
        x: 'center',
        y: 'center',
        textStyle: {
          fontSize: '30',
          fontWeight: 'bold',
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
      option = _.defaultsDeep({
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b}: {c} ({d}%)',
        },
        legend: hasLegend ?
          {
            orient: 'vertical',
            x: 'right',
            y: 'center',
            data: _.map(data, 'name'),
          } :
          {
            show: false,
          },
        series: [
          {
            data,
          },
        ],
      }, option);
    }

    return (
      <ReactEcharts option={option} />
    );
  }
}
