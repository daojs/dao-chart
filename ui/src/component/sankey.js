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

    const option = {
      tooltip: {
        trigger: 'item',
        triggerOn: 'mousemove',
      },
      series: {
        type: 'sankey',
        layout: 'none',
        data: _.chain(source)
          .first()
          .slice(1)
          .map(name => ({ name }))
          .value(),
        links: (() => {
          const links = [];

          for (let i = 1; i < source.length; i += 1) {
            for (let j = 1; j < source.length; j += 1) {
              if (source[i][j] > 0) {
                links.push({
                  source: source[0][i],
                  target: source[0][j],
                  value: source[i][j],
                });
              }
            }
          }
          return links;
        })(),
      },
    };

    return (
      <ReactEcharts option={option} {...this.props} />
    );
  }
}
