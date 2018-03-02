export default {
  id: 12345678,
  description: '2017年白菜售价',
  slicers: {
    商品: { hidden: true, value: { type: 'enum', values: ['白菜'] } },
    特定日期: { value: { type: 'enum', values: ['day-2017-01-01'] } },
    特定地区: { value: { type: 'enum', values: ['苏州'] } },
  },
  items: [{
    description: '指定地区与全国白菜售价对比',
    metrics: [{
      value: '售价',
      dimensions: {
        地区: { fromSlicer: '特定地区' },
      },
      mainDimensions: ['地区'], // enrich, used to figure which dimensions' value not used to extend data
    }, {
      value: '售价',
      dimensions: {
        地区: { value: { type: 'enum', values: ['allup'] } },
      },
      mainDimensions: ['地区'], // enrich
    }],
    dimensions: {
      商品: { fromSlicer: '商品' },
      日期: { toSlicer: '特定日期', value: { type: 'range', start: 'day-2017-01-01', end: 'day-2017-12-31' } },
    },
    extra: {},
    chartType: 'line', // enrich chart type
    mainDimensions: ['日期'], // enrich, 直观的描述是横轴是啥
    id: 1, // required in story
  }, {
    description: '指定日期与2017全年白菜售价对比',
    metrics: [{
      value: '售价',
      dimensions: {
        日期: { fromSlicer: '特定日期' },
      },
      mainDimensions: ['日期'], // enrich
    }, {
      value: '售价',
      dimensions: {
        日期: { value: { type: 'enum', values: ['year-2017'] } },
      },
      mainDimensions: ['日期'], // enrich
    }],
    dimensions: {
      商品: { fromSlicer: '商品' },
      地区: { toSlicer: '特定地区', value: { type: 'tree-children', node: '江苏', relation: '行政区划' } },
    },
    extra: {},
    chartType: 'spin', // enrich chart type
    mainDimensions: ['地区'], // enrich
    id: 2, // required in story
  }],
  extra: {},
};
