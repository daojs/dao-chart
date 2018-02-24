import _ from 'lodash';

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
  return _.map(source, row =>
    _.defaults({}, typeObj, defaultSeriesOpt, {
      name: row[0],
      data: row.slice(1),
    }));
}
