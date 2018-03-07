import Promise from 'bluebird';
import _ from 'lodash';

function convertDimension(area, value) {
  const { type, values } = value;
  if (type === 'enum') {
    return ['in', area, values];
  }
  return [];
}

function convertDimensions({ slicers, dimensions }) {
  const ret = [];
  _.each(dimensions, (obj, dim) => {
    const { fromSlicer, value } = obj;
    if (fromSlicer) {
      ret.push(convertDimension(fromSlicer, slicers[fromSlicer].value));
    } else {
      ret.push(convertDimension(dim, value));
    }
  });
  return ret;
}

function generateMetricRequest({
  slicers,
  dimensions,
  metric,
}) {
  const requestDimensions = convertDimensions({ slicers, dimensions })
    .concat(convertDimensions({ slicers, dimensions: metric.dimensions }));
  return {
    name: 'query',
    parameters: {
      metrics: metric.value,
      dimensions: requestDimensions,
    },
  };
}

function generateArray({
  type,
  start,
  end,
  length = 10,
  relation = '行政区划',
  node = 'allup',
}) {
  if (type === 'range') {
    return _.range(2000, 2000 + length);
  }
  if (type === 'number') {
    return _.map(Array(length), () => _.random(start, end));
  }
  if (type === 'tree-children') {
    if (relation === '行政区划') {
      switch (node) {
        case 'allup':
          return ['北京', '江苏', '上海', '新疆', '西藏'];
        case '江苏':
          return ['南京', '苏州', '无锡', '常州', '镇江', '南通', '盐城'];
        case '苏州':
          return ['吴中区', '园区', '姑苏', '相城'];
        default:
          return [];
      }
    }
  }
  return Array(length);
}

/* eslint-disable */
function mockData({ slicers, section }) {
  const dimName = _.first(section.mainDimensions);
  const dim = _.result(section.dimensions, dimName);
  const { fromSlicer, value } = dim;
  const dimData = generateArray(fromSlicer ? slicers[fromSlicer].value : value);
  const headers = [dimName];
  const dimensionMap = { [dimName]: dim };
  const data = [dimData];
  _.each(section.metrics, (metric) => {
    const mainDimName = _.first(metric.mainDimensions);
    const mainDim = metric.dimensions[mainDimName];
    if (mainDim.fromSlicer) {
      headers.push(slicers[mainDim.fromSlicer].value.values.join(','));
    } else {
      headers.push(mainDim.value.values.join(','));
    }
    dimensionMap[_.last(headers)] = mainDim;
    data.push(generateArray({
      type: 'number',
      start: 10,
      end: 20,
      length: _.size(dimData),
    }));
  });
  return {
    source: [headers, ..._.unzip(data)],
    dimensionMap,
  };
}
/* eslint-enable */

/**
 *   slicers: {},
 *   section: {
 *     metrics: [],
 *     dimensions: {},
 *     chartType: 'line', //added
 *     mainDimensions: [], //added
 *   }
 */
export function getMetrics({
  slicers = {},
  section = {},
}) {
  const { dimensions, metrics } = section;
  const requests = metrics.map(metric => generateMetricRequest({ slicers, dimensions, metric }));
  return Promise.resolve(requests).then(() => mockData({ slicers, section }));
}
