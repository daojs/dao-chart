import React, { Component } from 'react';
// import { HashRouter, Route } from 'react-router-dom';
import echarts from 'echarts';
import ReactEcharts from 'echarts-for-react';
import ReactGridLayout from 'react-grid-layout';
import daoTheme1 from './assets/DaoTheme1.json';
import daoTheme2 from './assets/DaoTheme2.json';
import daoTheme3 from './assets/DaoTheme3.json';
import Story from './story/index';
import storyConfig from '../stories/sodexo.story.config';
import AtlasStory from './story/atlas-story';
import InsightStoryConfig from '../stories/insight.story';
import './style/index.scss';

export default class App extends Component {
  constructor(props) {
    super(props);
    echarts.registerTheme('theme1', daoTheme1);
    echarts.registerTheme('theme2', daoTheme2);
    echarts.registerTheme('theme3', daoTheme3);
  }

  render() {
    const option = {
      title: {
        text: 'ECharts 入门示例',
      },
      tooltip: {},
      legend: {
        data: ['销量', '预测'],
      },
      xAxis: {
        data: ['衬衫', '羊毛衫', '雪纺衫', '裤子', '高跟鞋', '袜子'],
      },
      yAxis: {},
      series: [{
        name: '销量',
        type: 'bar',
        data: [5, 20, 36, 10, 10, 20],
      }, {
        name: '预测',
        type: 'line',
        data: [5, 20, 36, 10, 10, 20],
      }],
    };

    return (
      <div>
        <ReactGridLayout className="layout" cols={12} rowHeight={150} width={1200}>
          <div
            key="a"
            data-grid={{
              x: 0, y: 0, w: 5, h: 2,
          }}
          >
            <ReactEcharts
              option={option}
              theme="theme1"
            />
          </div>
          <div
            key="b"
            data-grid={{
              x: 6, y: 0, w: 5, h: 2,
          }}
          >
            <ReactEcharts
              option={option}
              theme="theme2"
            />
          </div>
        </ReactGridLayout>
        <Story {...storyConfig} />
        <AtlasStory story={InsightStoryConfig} />
      </div>
    );
  }
}
