import _ from 'lodash';
import { transpose } from './transpose';

// The serieses for data set
export function getDimensionSeries({
  dimensions = [],
  type,
  defaultSeriesOpt = {},
}) {
  let typeObj = { type };

  if (!type) {
    typeObj = {};
  }

  return _.map(dimensions.slice(1), (name) => {
    let dim = name;
    if (_.isString(name)) {
      dim = { name };
    }
    return _.defaults({}, typeObj, defaultSeriesOpt, dim);
  });
}

// For legacy series for the chart not support data set
export function getDataSeries({
  source = [],
  type,
  defaultSeriesOpt = {},
}) {
  let typeObj = { type };

  if (!type) {
    typeObj = {};
  }
  return _.chain(transpose(source))
    .slice(1)
    .map(column => _.defaults({}, typeObj, defaultSeriesOpt, {
      name: _.first(column),
      data: _.slice(column, 1),
    }))
    .value();
}
