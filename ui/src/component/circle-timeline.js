import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import ReactEcharts from 'echarts-for-react';
import _ from 'lodash';
import { validate, lineScale as lineScaleFactory } from '../utils';

const lineScale = _.partial(lineScaleFactory, 10, 50);

const offsetTop = 10;
const offsetBottom = 10;
const chartHeight = 100 - offsetTop - offsetBottom;

const axisTop = (index, total) => {
  const position = offsetTop + ((index / total) * chartHeight);
  return `${_.round(position, 2)}%`;
};

const axisHeight = (total) => {
  const height = chartHeight / total;
  return `${_.round(height, 2)}%`;
};

const axisMiddle = (index, total) => {
  const position = offsetTop + ((((index * 2) + 1) / (total * 2)) * chartHeight);
  return `${_.round(position, 2)}%`;
};


export default class CircleTimeline extends PureComponent {
  static propTypes = {
    source: PropTypes.arrayOf(PropTypes.array.isRequired).isRequired,
  }

  render() {
    const { source } = this.props;
    validate(source);

    const columns = _.zip(...source);

    const seriesColumns = _.slice(columns, 1);
    const seriesLength = _.size(seriesColumns);
    const seriesData = _.map(seriesColumns, column => _.slice(column, 1));

    const axisColumn = _.first(columns);
    const axisData = _.slice(axisColumn, 1);

    const option = _.defaultsDeep(
      _.chain(seriesColumns)
        .reduce((memo, column, index) => {
          memo.title.push({
            text: column[0],
            textBaseline: 'middle',
            top: axisMiddle(index, seriesLength),
          });
          memo.singleAxis.push({
            left: '20%',
            type: 'category',
            boundaryGap: false,
            data: axisData,
            top: axisTop(index, seriesLength),
            height: axisHeight(seriesLength),
            axisLine: {
              show: index === seriesLength - 1,
            },
            axisTick: {
              show: index === seriesLength - 1,
              inside: true,
            },
            axisLabel: {
              show: index === seriesLength - 1,
            },
            splitLine: {
              show: false,
            },
          });
          memo.series.push({
            singleAxisIndex: index,
            type: 'scatter',
            coordinateSystem: 'singleAxis',
            data: _.zip(axisData, seriesData[index]),
            symbolSize: (() => {
              const flattenData = _.flatten(seriesData);
              const minValue = _.min(flattenData);
              const maxValue = _.max(flattenData);

              return dataItem => lineScale(minValue, maxValue, dataItem[1]);
            })(),
            markLine: {
              silent: true,
              symbol: '',
              lineStyle: {
                color: '#000',
                type: 'solid',
              },
              data: [
                [
                  {
                    x: '15%',
                    y: axisMiddle(index, seriesLength),
                  },
                  {
                    x: '100%',
                    y: axisMiddle(index, seriesLength),
                  },
                ],
              ],
            },
          });
          return memo;
        }, {
          title: [],
          singleAxis: [],
          series: [],
        })
        .value(),
      {
        tooltip: {
          formatter: params => `${params.name}: ${params.data[1]}`,
        },
      },
    );

    return (
      <ReactEcharts option={option} {...this.props} />
    );
  }
}
