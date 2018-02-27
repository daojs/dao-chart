import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import ReactEcharts from 'echarts-for-react';
import _ from 'lodash';
import { validate } from '../utils';


const lineScale = (min, max, data) => {
  // TODO: find a better way to map a serize of data to a proper range
  const a = (50 - 10) / (max - min);
  const b = 10 - (a * min);

  return (a * data) + b;
};

const topPosition = (index, total) => `${_.round(10 + ((((index * 2) + 1) / (total * 2)) * 80), 2)}%`;

const getDataOption = ({
  source,
  titleOption = _.noop,
  axisOption = _.noop,
  seriesOption = _.noop,
}) => {
  const title = [];
  const singleAxis = [];
  const series = [];

  const groupedSource = _.chain(source)
    .slice(1)
    .groupBy(row => row[0])
    .value();
  const total = _.size(groupedSource);

  _.reduce(groupedSource, (index, group, groupName) => {
    title.push(titleOption(group, groupName, index, total));
    singleAxis.push(axisOption(group, groupName, index, total));
    series.push(seriesOption(group, groupName, index, total));
    return index + 1;
  }, 0);

  return {
    title,
    singleAxis,
    series,
  };
};

export default class CircleTimeline extends PureComponent {
  static propTypes = {
    source: PropTypes.arrayOf(PropTypes.array.isRequired).isRequired,
  }

  render() {
    const { source } = this.props;
    validate(source);

    const option = _.defaultsDeep(getDataOption({
      source,
      titleOption: (group, groupName, index, total) => ({
        text: groupName,
        textBaseline: 'middle',
        top: topPosition(index, total),
      }),
      axisOption: (group, groupName, index, total) => ({
        left: '20%',
        type: 'category',
        boundaryGap: false,
        data: _.chain(group).map(row => row[1]).uniq().value(),
        top: `${_.round(10 + ((index / total) * 80), 2)}%`,
        height: `${_.round(80 / total, 2)}%`,
        axisLine: {
          show: index === total - 1,
        },
        axisTick: {
          show: index === total - 1,
          inside: true,
        },
        axisLabel: {
          show: index === total - 1,
        },
        splitLine: {
          show: false,
        },
      }),
      seriesOption: (group, groupName, index, total) => ({
        singleAxisIndex: index,
        type: 'scatter',
        coordinateSystem: 'singleAxis',
        data: _.chain(group).map((row, idx) => ([idx, row[2]])).value(),
        symbolSize: (() => {
          const columns = _.zip(...source);
          const dataValues = columns[2].slice(1);
          const minValue = _.min(dataValues);
          const maxValue = _.max(dataValues);

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
                y: topPosition(index, total),
              },
              {
                x: '100%',
                y: topPosition(index, total),
              },
            ],
          ],
        },
      }),
    }), {
      tooltip: {
        formatter: params => `${params.name}: ${params.data[1]}`,
      },
    });

    return (
      <ReactEcharts option={option} {...this.props} />
    );
  }
}
