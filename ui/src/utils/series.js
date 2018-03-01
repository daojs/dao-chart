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
  defaultSeriesOpt = {},
  defaultSeriesDataOpt = {},
}) {
  const columns = _.zip(...source);
  const seriesLength = columns.length - 1;

  return {
    axis: {
      data: _.chain(columns)
        .first()
        .slice(1)
        .value(),
    },
    series: _.chain(columns)
      .slice(1)
      .map((column, seriesIndex) => _.defaults(
        {},
        _.isFunction(defaultSeriesOpt)
          ? defaultSeriesOpt(seriesIndex, seriesLength)
          : defaultSeriesOpt,
        {
          name: _.isObject(column[0]) ? column[0].name : column[0],
          data: _.chain(column)
            .slice(1)
            .map(value => _.defaults(
              { value },
              _.isFunction(defaultSeriesDataOpt)
                ? defaultSeriesDataOpt(value)
                : defaultSeriesDataOpt,
            ))
            .value(),
        },
      ))
      .value(),
  };
}
