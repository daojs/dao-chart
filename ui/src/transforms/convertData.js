import _ from 'lodash';

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
export function convertData({
  data,
  meta: {
    headers,
    collaspsedColumns,
  },
  groupDimensions = [],
  axisDimensions = [],
  metricDimensions,
  serieNameTemplate,
}) {
  const results = [];
  const series = [];
  const collapse = _.isArray(collaspsedColumns) ?
    _.merge(...collaspsedColumns) : collaspsedColumns;
  _.each(data, (item) => {
    const obj = { ..._.zipObject(headers, item), ...collapse };
    const axisDim = _.pick(obj, axisDimensions);
    const groupDim = _.pick(obj, [...groupDimensions, ...metricDimensions]);
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

  const nameTemplate = _.template(serieNameTemplate);
  const seriesMapper = {};

  const retData = _.map(results, (item) => {
    const axisData = _.at(item, axisDimensions);
    const metricData = _.map(series, (serie) => {
      const dataItem = _.find(item.children, serie);
      if (dataItem) {
        if (_.size(metricDimensions) === 1) {
          return dataItem[metricDimensions[0]];
        }
        return _.pick(dataItem, metricDimensions);
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
        metricDimensions,
      },
    });

    return serieName;
  })];

  return Promise.resolve({
    source: [newHeaders, ...retData],
    seriesMapper,
  });
}
