export default {
  id: 10000,
  description: 'Sodexo data analysis story',
  slicers: {
    BranchName: { value: { type: 'enum', values: ['AllUp'] }, enums: ['AllUp', '北京小院', '员工餐厅', '咖啡厅', '咖喱屋', '意大利餐厅', '粤菜餐厅', '自助餐厅', '西餐厅'] },
    CardType: { value: { type: 'enum', values: ['AllUp'] }, enums: ['AllUp', '员工卡', '访客卡'] },
    MealName: { value: { type: 'enum', values: ['AllUp'] }, enums: ['AllUp', '午餐', '早餐', '晚餐'] },
    SKUType: { value: { type: 'enum', values: ['AllUp'] }, enums: ['AllUp', '2016圣诞集市', '2017圣诞集市', '615', 'A la carte (Pork&None- Pork) 中式零点与无猪肉零点', 'Dim Sum 小吃'] },
    time: { value: { type: 'range', start: '2017-11-01', end: '2017-12-02' } },
  },
  slicerMeta: { // put in slicers as meta?
    slicers: ['BranchName', 'MealName', 'SKUType', 'time'],
    metric: '169feb7a-c332-4979-9c6a-377bf2d75152', // metric to fetch dimensions available values
  },
  items: [{
    description: '员工卡 vs. 访客卡',
    metrics: [{
      value: '169feb7a-c332-4979-9c6a-377bf2d75152',
      nameTemplate: '{{CardType}}:{{SKUType}}',
      id: 10,
      dimensions: {
        CardType: { value: { type: 'enum', values: ['访客卡'] } },
      },
    }, {
      value: '169feb7a-c332-4979-9c6a-377bf2d75152',
      nameTemplate: '{{CardType}}:{{SKUType}}',
      id: 11,
      dimensions: {
        CardType: { value: { type: 'enum', values: ['员工卡'] } },
      },
    }],
    dimensions: {
      BranchName: { fromSlicer: 'BranchName' },
      CardType: { fromSlicer: 'CardType' },
      time: { fromSlicer: 'time' },
      SKUType: { fromSlicer: 'SKUType' },
      MealName: { fromSlicer: 'MealName' },
    },
    extra: {},
    chartType: 'lineWithDataZoom', // enrich chart type
    axisDimensions: ['time'], // enrich, 直观的描述是横轴是啥
    groupDimensions: ['BranchName', 'MealName', 'SKUType'], // enrich, select the dimension we want to group, sometimes we ignore some dimension to group, like age between 20 and 30, we don't want to group by age while age is not axisDeimension
    id: 1, // required in story
  }],
};
