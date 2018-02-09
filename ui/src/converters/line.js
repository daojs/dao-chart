import Promise from 'bluebird';

export default function (/* meta */) {
  // fetch data from server side and convert
  return Promise.resolve({
    title: {
      text: 'Title from converter',
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
      type: 'line',
      data: [5, 20, 36, 10, 10, 20],
    }, {
      name: '预测',
      type: 'line',
      data: [15, 30, 46, 20, 20, 30],
    }],
  });
}
