// TODO: Yu Zhong: remove eslint-disable

/* eslint-disable */

import _ from 'lodash';


export default function dataConverter(option, meta, data) {
  const priDimIndex = (
    _.indexOf(data.dimensions, data.primaryDim) + 1 ||
    _.size(data.dimensions)
  ) - 1;
  const priDim = data.dimensions[priDimIndex];
  let subDim = [];

  const source = _.chain(data.value)
    .groupBy(vector => vector[_.size(data.metrics) + priDimIndex])
    .mapValues((vectors, groupName) => {
      const result = {};
      _.each(vectors, (vector) => {
        const metricValues = vector.slice(0, _.size(data.metrics));
        const dimensionValues = _.chain(vector)
          .slice(_.size(data.metrics))
          .reject((value, index) => index === priDimIndex)
          .value();

        _.each(metricValues, (metricValue, index) => {
          const key = [...dimensionValues, data.metrics[index]].join('-');
          result[key] = metricValue;
        });
      });
      subDim = _.union(subDim, _.keys(result));

      return _.defaults({
        [priDim]: groupName,
      }, result);
    })
    .values()
    .value();

  return _.defaults({
    dataset: {
      sourceHeader: false,
      dimensions: [priDim, ...subDim],
      source,
    },
  }, option);
}

