/* eslint-disable fp/no-let, fp/no-mutation */
const _ = require('lodash');
const fs = require('fs');
const os = require('os');
const path = require('path');
const mkdirp = require('mkdirp');
const jsonfile = require('jsonfile');
const nodeCleanup = require('node-cleanup');
const log4js = require('log4js');
const logger = log4js.getLogger('layout');

const storeDir = path.resolve(os.homedir(), '.dao-chart');
const storePath = path.resolve(storeDir, 'layout.json');

const layoutStore = (() => {
  try {
    mkdirp.sync(storeDir);
    return JSON.parse(fs.readFileSync(storePath, {
      flag: 'a+',
      encoding: 'utf8'
    }));
  } catch (err) {
    logger.error(err);
    return {};
  }
})();

nodeCleanup(() => {
  jsonfile.writeFileSync(storePath, layoutStore);
});

const colsInRow = 12;
const chartsInRow = 2;
const colsOfChart = _.floor(colsInRow / chartsInRow);
const rowsOfChart = 10;

const getLayout = ({
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
  jsonfile.writeFile(storePath, layoutStore, err => {
    if (err) {
      logger.error(err);
    }
  });
  return newStoryLayout;
};

const setLayout = ({
  storyId,
  storyLayout
}) => {
  layoutStore[storyId] = storyLayout;
  jsonfile.writeFile(storePath, layoutStore, err => {
    if (err) {
      logger.error(err);
    }
  });
  return true;
};

module.exports = {
  getLayout,
  setLayout
};
