import Promise from 'bluebird';
import { fetchData, convertData, topNData } from '../src/transforms';

export default {
  parameters: {
    BranchName: { default: ['AllUp'] },
    CardType: { default: ['AllUp'] },
    MealName: { default: ['AllUp'] },
    SKUType: { default: ['AllUp'] },
    time: { default: { start: '2017-11-01', end: '2017-12-02' } },
  },
  cells: {
    branchName: {
      dependencies: ['BranchName'],
      factory: () => Promise.resolve(['AllUp', '北京小院', '员工餐厅', '咖啡厅', '咖喱屋', '意大利餐厅', '粤菜餐厅', '自助餐厅', '西餐厅']),
    },
    cardType: {
      dependencies: ['CardType'],
      factory: () => Promise.resolve(['AllUp', '员工卡', '访客卡']),
    },
    mealName: {
      dependencies: ['MealName'],
      factory: () => Promise.resolve(['AllUp', '午餐', '早餐', '晚餐']),
    },
    skuType: {
      dependencies: ['SKUType'],
      factory: () => Promise.resolve(['AllUp', '615', 'Dim Sum 小吃']),
    },
    revenue: {
      dependencies: ['BranchName', 'CardType', 'MealName', 'SKUType', 'time'],
      factory: (BranchName, CardType, MealName, SKUType, time) => fetchData({
        parameters: {
          BranchName: {
            type: 'enum',
            values: BranchName,
          },
          CardType: {
            type: 'enum',
            values: CardType,
          },
          MealName: {
            type: 'enum',
            values: MealName,
          },
          SKUType: {
            type: 'enum',
            values: SKUType,
          },
          time: {
            type: 'range',
            values: time,
          },
        },
        metric: '169feb7a-c332-4979-9c6a-377bf2d75152',
      }),
    },
    formatRevenue2Line: {
      dependencies: ['revenue'],
      factory: revenue => convertData({
        ...revenue,
        groupDimensions: ['BranchName', 'MealName', 'SKUType', 'CardType'],
        axisDimensions: ['time'],
        metricDimensions: ['169feb7a-c332-4979-9c6a-377bf2d75152'],
        serieNameTemplate: 'BranchName({{BranchName}});MealName({{MealName}});SKUType({{SKUType}});CardType({{CardType}})',
      }),
    },
    top3Revenue: {
      dependencies: ['formatRevenue2Line'],
      factory: ({ source, seriesMapper }) => topNData({
        take: 3,
        metric: '169feb7a-c332-4979-9c6a-377bf2d75152',
        axisDimensions: ['time'],
        source,
        seriesMapper,
      }),
    },
  },
  dashboard: {
    description: 'Insight dashboard drived by data atlas',
    slicers: [{
      key: 'BranchName',
      type: 'enum',
      from: 'branchName',
    }, {
      key: 'MealName',
      type: 'enum',
      from: 'mealName',
    }, {
      key: 'SKUType',
      type: 'enum',
      from: 'skuType',
    }, {
      key: 'CardType',
      type: 'enum',
      from: 'cardType',
    }, {
      key: 'time',
      type: 'range',
    }],
    sections: [{
      id: 1,
      description: 'Revenue',
      nameTemplate: '{{CardType}}:{{SKUType}}',
      from: 'formatRevenue2Line',
      chartType: 'lineWithDataZoom',
    }, {
      id: 10,
      description: 'Top Revenue',
      from: 'top3Revenue',
      chartType: 'donut',
    }],
  },
  id: 10000, // required in story
};
