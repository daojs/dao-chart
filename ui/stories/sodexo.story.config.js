export default {
  id: 10000,
  description: 'Sodexo data analysis story',
  slicers: {
    BranchName: { value: { type: 'enum', values: ['AllUp'] } },
    CardType: { value: { type: 'enum', values: ['访客卡'] } },
    MealName: { value: { type: 'enum', values: ['晚餐'] } },
    time: { value: { type: 'range', start: '2017-11-01', end: '2017-12-02' } },
  },
  items: [{
    description: 'Dinner in Sodexo',
    metrics: [{
      value: '169feb7a-c332-4979-9c6a-377bf2d75152',
      nameTemplate: 'All up',
    }],
    dimensions: {
      BranchName: { fromSlicer: 'BranchName' },
      CardType: { fromSlicer: 'CardType' },
      time: { fromSlicer: 'time' },
    },
    extra: {},
    chartType: 'bar', // enrich chart type
    axiesDimensions: ['SKUType'], // enrich, 直观的描述是横轴是啥
    groupDimensions: [],
    id: 1, // required in story
  }],
};
