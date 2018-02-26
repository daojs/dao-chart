import Promise from 'bluebird';

const pieSource = [
  ['渠道', 'value'],
  ['直接访问', 335],
  ['邮件营销', 310],
  ['联盟广告', 234],
  ['视频广告', 135],
  ['搜索引擎', 1548],
];

const drillSource = [
  ['name', 'value'],
  ['On Line', 135],
  ['Off Line', 200],
];

export function getMetrics({ selected }) {
  if (selected) {
    return Promise.resolve(drillSource);
  }
  return Promise.resolve(pieSource);
}
