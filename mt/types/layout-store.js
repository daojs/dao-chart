const _ = require('lodash');

const colsInRow = 12;
const chartsInRow = 2;
const colsOfChart = _.floor(colsInRow / chartsInRow);
const rowsOfChart = 10;

const layoutStore = {
  12345678: [
    {
      i: '1', x: 0, y: 0, w: 6, h: 10
    },
    {
      i: '2', x: 6, y: 0, w: 6, h: 10
    }
  ]
};

const fetchLayout = ({
  storyId,
  sectionIds
}) => {
  const storyLayout = layoutStore[storyId] || [];
  const newSectionIds = _.difference(sectionIds, _.map(storyLayout, 'i'));
  let nextY = _.max(_.map(storyLayout, ({y, h}) => y + h)) || 0;
  let nextX = 0;
  const newSectionLayouts = _.map(newSectionIds, id => {
    const result = {
      i: id,
      x: nextX,
      y: nextY,
      w: colsOfChart,
      h: rowsOfChart
    };
    nextX = (nextX + colsOfChart);
    if (nextX >= colsInRow) {
      nextX = 0;
      nextY += rowsOfChart;
    }
    return result;
  });
  const newStoryLayout = _.union(storyLayout, newSectionLayouts);
  layoutStore[storyId] = newStoryLayout;
  return newStoryLayout;
};

module.exports = {
  fetchLayout
};
