import _ from 'lodash';
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import ReactEcharts from 'echarts-for-react';
import 'echarts-wordcloud';
import { validate } from '../utils';

export default class WordCloud extends PureComponent {
  static propTypes = {
    source: PropTypes.arrayOf(PropTypes.array).isRequired,
  }

  render() {
    const { source } = this.props;
    validate(source);
    const option = {
      tooltip: {
        show: false,
      },
      legend: {},
      series: [
        {
          type: 'wordCloud',
          shape: 'circle',
          // word cloud chart does not support dataset
          data: _.chain(source).slice(1).map(row => ({
            name: row[0],
            value: row[1],
          })).value(),
          left: 'center',
          top: 'top',
          width: '100%',
          height: '100%',
          right: null,
          bottom: null,
          sizeRange: [8, 60],
          rotationRange: [0, 0],
          rotationStep: 45,
          textStyle: {
            normal: {
              fontFamily: 'sans-serif',
              // Color can be a callback function or a color string
              color: () =>
                // Random color
                `rgb(${[
                  Math.round(Math.random() * 160),
                  Math.round(Math.random() * 160),
                  Math.round(Math.random() * 160),
                ].join(',')})`,
            },
            emphasis: {
              fontWeight: 'bold',
              opacity: 0.5,
            },
          },
        },
      ],
    };

    return (
      <ReactEcharts option={option} />
    );
  }
}
