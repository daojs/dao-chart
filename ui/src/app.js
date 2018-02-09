import React, { Component } from 'react';
import { HashRouter, Route } from 'react-router-dom';
import echarts from 'echarts';
import ReactEcharts from 'echarts-for-react';
import daoTheme1 from './assets/DaoTheme1.json';
import daoTheme2 from './assets/DaoTheme2.json';
import daoTheme3 from './assets/DaoTheme3.json';
import Hello from './component/hello';
import DaoChart from './component/dao-chart';


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
      <HashRouter>
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            position: 'fixed',
            height: '100%',
            width: '100%',
            marginTop: '20px',
            overflow: 'auto',
          }}
        >
          <div
            style={{ flexBasis: 0, flexGrow: 1, width: '100%' }}
          >
            <Route exact path="/" component={Hello} />
          </div>

          <div
            style={{ flexBasis: 0, flexGrow: 1, width: '100%' }}
          >
            <ReactEcharts
              option={option}
              theme="theme1"
              style={{ height: '400px', width: '100%' }}
            />
          </div>
          <div
            style={{ flexBasis: 0, flexGrow: 1, width: '100%' }}
          >
            <ReactEcharts
              option={option}
              theme="theme3"
              style={{ height: '400px', width: '100%' }}
            />
          </div>
          <div
            style={{ flexBasis: 0, flexGrow: 1, width: '100%' }}
          >
            <DaoChart
              meta={{ chartType: 'line', brief: 'blah blah' }}
              theme="theme3"
              style={{ height: '400px', width: '100%' }}
            />
          </div>
        </div>
      </HashRouter>
    );
  }
}
