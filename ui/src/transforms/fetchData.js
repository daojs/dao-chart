import _ from 'lodash';
import axios from 'axios';

const mtUrl = 'http://localhost:9001/data';

function dimension2Filter(area, obj) {
  const {
    type,
    values,
  } = obj;
  if (type === 'enum') {
    if (values.length === 1) {
      return ['eq', area, values[0]];
    }
    return ['in', area, values];
  }
  if (type === 'range') {
    const { start, end } = values;
    return ['between', area, start, end];
  }
  return [];
}

function convertParameters(parameters) {
  const filters = [];
  _.each(parameters, (obj, dim) => {
    filters.push(dimension2Filter(dim, obj));
  });
  return filters;
}

export function fetchData({
  parameters,
  metric,
}) {
  return axios.post(mtUrl, {
    name: 'query',
    parameters: {
      metrics: metric,
      dimensions: convertParameters(parameters),
    },
  }).then(({ data }) => data);
}
