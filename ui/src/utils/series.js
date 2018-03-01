import _ from 'lodash';

// The serieses for data set
export function getDimensionSeries({
  dimensions = [],
  type,
  defaultSeriesOpt = {},
}) {
  const typeObj = _.isString(type) ? { type } : {};

  return _.map(dimensions.slice(1), (name) => {
    const dim = _.isString(name) ? { name } : name;

    return _.defaults({}, typeObj, defaultSeriesOpt, dim);
  });
}

// For legacy series for the chart not support data set
export function getDataOption({
  source = [],
  type,
  defaultSeriesOpt = {},
}) {
  const typeObj = type ? { type } : {};
  const columns = _.zip(...source);

  return {
    axis: {
      data: _.chain(columns)
        .first()
        .slice(1)
        .value(),
    },
    series: _.chain(columns)
      .slice(1)
      .map(column => _.defaults({}, typeObj, defaultSeriesOpt, {
        name: _.first(column),
        data: _.slice(column, 1),
      }))
      .value(),
  };
}
