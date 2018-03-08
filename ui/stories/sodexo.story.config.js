export default {
  id: 10000,
  description: 'Sodexo data analysis story',
  slicers: {
    BranchName: { value: { type: 'enum', values: ['AllUp'] } },
    CardType: { value: { type: 'enum', values: ['访客卡'] } },
    MealName: { value: { type: 'enum', values: ['晚餐'] } },
    SKUType: { value: { type: 'enum', values: ['凉菜'] } },
    time: { value: { type: 'range', start: '2017-11-01', end: '2017-12-02' } },
  },
  items: [{
    description: 'Dinner in Sodexo',
    metrics: [{
      value: '169feb7a-c332-4979-9c6a-377bf2d75152',
      nameTemplate: '{{SKUType}}',
      id: 10,
    }, {
      value: '169feb7a-c332-4979-9c6a-377bf2d75152',
      nameTemplate: '{{SKUType}}',
      id: 11,
      dimensions: {
        SKUType: { value: { type: 'enum', values: ['AllUp'] } },
      },
    }],
    dimensions: {
      BranchName: { fromSlicer: 'BranchName' },
      CardType: { fromSlicer: 'CardType' },
      time: { fromSlicer: 'time' },
      SKUType: { fromSlicer: 'SKUType' },
    },
    extra: {},
    chartType: 'line', // enrich chart type
    axisDimensions: ['time'], // enrich, 直观的描述是横轴是啥
    groupDimensions: ['SKUType'], // enrich, select the dimension we want to group, sometimes we ignore some dimension to group, like age between 20 and 30, we don't want to group by age while age is not axisDeimension
    id: 1, // required in story
  }],
};
