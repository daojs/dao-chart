import Promise from 'bluebird';
import _ from 'lodash';
import axios from 'axios';

const mtUrl = 'http://localhost:9001/data';

function dimension2Filter(area, value) { // convert dimension to filter
  const {
    type,
    values,
    start,
    end,
  } = value;
  if (type === 'enum') {
    if (values.length === 1) {
      return ['eq', area, values[0]];
    }
    return ['in', area, values];
  }
  if (type === 'range') {
    return ['between', area, start, end];
  }
  return [];
}

function convertDimensions({ slicers, dimensions }) {
  const filters = [];
  _.each(dimensions, (obj, dim) => {
    const { fromSlicer, value } = obj;
    if (fromSlicer) {
      filters.push(dimension2Filter(fromSlicer, slicers[fromSlicer].value));
    } else {
      filters.push(dimension2Filter(dim, value));
    }
  });
  return filters;
}

/**
 * convert data and compute dimension info
 * sample parameters:
 * {
 *  data: [[], [], []],
 *  meta: {
 *    headers: [], // list of header ids
 *    collapsedColumns: [],
 *  }
 * }
 * return new grouped data and header->dimension
 */
function convertData({
  data,
  meta: {
    headers,
    collaspsedColumns,
  },
  groupDimensions = [],
  axisDimensions = [],
  metric,
}) {
  const results = [];
  const series = [];
  const collapse = _.isArray(collaspsedColumns) ?
    _.merge(...collaspsedColumns) : collaspsedColumns;
  _.each(data, (item) => {
    const obj = { ..._.zipObject(headers, item), ...collapse };
    const axisDim = _.pick(obj, axisDimensions);
    const groupDim = _.pick(obj, [...groupDimensions, metric.value]);
    const result = _.find(results, axisDim);
    const serie = _.pick(obj, groupDimensions);
    if (!_.find(series, serie)) {
      series.push(serie);
    }
    if (result) {
      result.children.push(groupDim);
    } else {
      results.push({
        ...axisDim,
        children: [groupDim],
      });
    }
  });

  const nameTemplate = _.template(metric.nameTemplate);
  const seriesMapper = {};

  const retData = _.map(results, (item) => {
    const axisData = _.at(item, axisDimensions);
    const metricData = _.map(series, (serie) => {
      const dataItem = _.find(item.children, serie);
      if (dataItem) {
        return dataItem[metric.value];
      }
      return undefined;
    });
    return [...axisData, ...metricData];
  });

  const newHeaders = [...axisDimensions, ..._.map(series, (serie) => {
    const enrichedSerie = { ...serie, ...collapse };
    // Translate enum id to string here and then get newHeaders
    const name = nameTemplate(enrichedSerie);
    const serieName = _.has(seriesMapper, name) ? _.uniqueId(name) : name;

    _.extend(seriesMapper, {
      [serieName]: {
        serie: enrichedSerie,
        metric,
      },
    });

    return serieName;
  })];

  return Promise.resolve({
    source: [newHeaders, ...retData],
    seriesMapper,
  });
}

function joinResults({
  results,
  axisDimensions,
}) {
  const concatHeaders = _.map(results, ({ source }) => _.slice(source[0], axisDimensions.length));
  const counter = _.countBy(concatHeaders);
  // update serieName for duplicate
  _.each(results, ({ source, seriesMapper }) => {
    _.each(_.slice(source[0], axisDimensions.length), (header, index) => {
      if (_.get(counter, header) > 1) {
        const name = _.uniqueId(header);
        source[0][index + axisDimensions.length] = name; //eslint-disable-line
        seriesMapper[name] = seriesMapper[header]; // eslint-disable-line
        delete seriesMapper[header]; //eslint-disable-line
      }
    });
  });

  // merge results
  const mergedResult = _.reduce(results, (memo, result) => {
    if (_.isEmpty(memo)) {
      return result;
    }

    const { source, seriesMapper } = result;
    const { source: memoSource, seriesMapper: memoSeriesMapper } = memo;
    const headers = source[0].concat(memoSource[0].slice(axisDimensions.length));
    const srcIndexTag = 'indextag#1';
    const memoIndexTag = 'indextag#2';
    const srcObj = _.map(source.slice(1), (item, index) =>
      _.zipObject([...source[0], srcIndexTag], [...item, index / source.length]));
    const memoSrcObj = _.map(memoSource.slice(1), (item, index) =>
      _.zipObject([...memoSource[0], memoIndexTag], [...item, index / memoSource.length]));
    const groupedObjs = _.groupBy(
      memoSrcObj.concat(srcObj),
      item => JSON.stringify(_.pick(item, axisDimensions)),
    );
    const list = _.map(_.values(groupedObjs), items => _.merge(...items));
    const sortedList = list.sort((item1, item2) => {
      const index1 = _.at(item1, [srcIndexTag, memoIndexTag]);
      const index2 = _.at(item2, [srcIndexTag, memoIndexTag]);
      if (!_.isUndefined(index1[0]) && !_.isUndefined(index2[0])) {
        return index1[0] > index2[0] ? 1 : -1;
      }
      if (!_.isUndefined(index1[1]) && !_.isUndefined(index2[1])) {
        return index1[1] > index2[1] ? 1 : -1;
      }
      return 0;
    });
    const retData = _.map(sortedList, item => _.at(item, headers));
    return {
      source: [headers, ...retData],
      seriesMapper: {
        ...seriesMapper,
        ...memoSeriesMapper,
      },
    };
  }, {});

  return mergedResult;
}

function fetchData({
  slicers,
  dimensions,
  metrics,
  groupDimensions,
  axisDimensions,
}) {
  return axios.post(mtUrl, _.map(metrics, (metric) => {
    const mergedDimensions = { ...dimensions, ...metric.dimensions };
    return {
      name: 'query',
      parameters: {
        metrics: metric.value,
        dimensions: convertDimensions({ slicers, dimensions: mergedDimensions }),
      },
    };
  })).then(({ data = [] }) => Promise.map(data, (response, index) => convertData({
    ...response,
    groupDimensions,
    axisDimensions,
    metric: metrics[index],
  }))).then(results => joinResults({ results, axisDimensions }));
}

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
  return fetchData({
    slicers,
    ...section,
  });
}
