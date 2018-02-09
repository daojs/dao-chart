import _ from 'lodash';

/* eslint-disable no-unused-vars, arrow-body-style */
export default function (option, meta, data) {
  return _.defaults({
    tooltip: {
      show: 'true',
      trigger: 'item',
      axisPointer: { // 坐标轴指示器，坐标轴触发有效
        // type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
      },
      formatter(params) {
        const dimName = option.dataset.dimensions[params.seriesIndex + 1];
        return `${dimName}: ${params.value[dimName]}`;
      },
    },
    legend: {
      top: 0,
      data: option.dataset.dimensions.slice(1),
    },
    yAxis: {},
    xAxis: { type: 'category' },
    series: (dimensions => dimensions.slice(1).map(dim => ({
      name: dim,
      type: 'line',
      smooth: true,
      label: {
        normal: {
          show: true,
          position: 'top',
        },
      },
      encode: {
        x: option.dataset.dimensions[0],
        y: dim,
      },
    })))(option.dataset.dimensions),
  }, option);
}
