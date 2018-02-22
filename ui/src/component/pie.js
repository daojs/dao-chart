import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import ReactEcharts from 'echarts-for-react';
import _ from 'lodash';

export default class Pie extends PureComponent {
  static propTypes = {
    data: PropTypes.arrayOf(PropTypes.object),
    percent: PropTypes.number,
  }

  static defaultProps = {
    data: null,
    percent: null,
  }

  render() {
    const { data, percent } = this.props;
    if (_.isEmpty(data) && _.isNull(percent)) {
      return null;
    }

    const option = {
      series: [
        {
          type: 'pie',
          radius: ['50%', '70%'],
          hoverOffset: 0,
          labelLine: {
            normal: {
              show: false,
            },
          },
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
    };

    // const option = {
    //   tooltip: {
    //     trigger: 'item',
    //     formatter: "{a} <br/>{b}: {c} ({d}%)"
    //   },
    //   legend: {
    //     orient: 'vertical',
    //     x: 'left',
    //     data: ['直接访问', '邮件营销', '联盟广告', '视频广告', '搜索引擎']
    //   },
    //   series: [
    //     {
    //       name: '访问来源',
    //       type: 'pie',
    //       radius: ['50%', '70%'],
    //       avoidLabelOverlap: false,
    //       label: {
    //         normal: {
    //           show: false,
    //           position: 'center'
    //         },
    //         emphasis: {
    //           show: true,
    //           textStyle: {
    //             fontSize: '30',
    //             fontWeight: 'bold'
    //           }
    //         }
    //       },
    //       labelLine: {
    //         normal: {
    //           show: false
    //         }
    //       },
    //       data,
    //     }
    //   ]
    // };

    return (
      <ReactEcharts option={option} />
    );
  }
}
