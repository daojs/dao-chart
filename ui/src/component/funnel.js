import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import ReactEcharts from 'echarts-for-react';
import _ from 'lodash';
import { validate } from '../utils';

export default class Funnel extends PureComponent {
  static propTypes = {
    source: PropTypes.arrayOf(PropTypes.array).isRequired,
  }

  render() {
    const { source } = this.props;
    validate(this.props.source);

    const [name, value] = _.first(source);
    const keyValueSource = _.map(source.slice(1), item => _.zipObject([name, value], item));
    // sort the data descending first so that legends could start from highest to lowest
    const sortedSource = _.reverse(_.sortBy(keyValueSource, value));
    const newSource = [[name, value], ..._.map(sortedSource, items => _.values(items))];

    const option = {
      legend: {},
      tooltip: {},
      dataset: {
        source: newSource,
      },
      calculable: true,
      series: {
        name: '漏斗图',
        type: 'funnel',
        sort: 'none',
        label: {
          normal: {
            show: true,
            position: 'inside',
          },
        },
        itemStyle: {
          normal: {
            borderColor: '#fff',
            borderWidth: 1,
          },
        },
      },
    };

    return (
      <ReactEcharts option={option} {...this.props} />
    );
  }
}
