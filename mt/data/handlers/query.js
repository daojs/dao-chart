const rp = require('request-promise');
const _ = require('lodash');
const qs = require('query-string');
const log4js = require('log4js');

log4js.configure({
  appenders: { query: { type: 'file', filename: './query.log' } },
  categories: { default: { appenders: ['query'], level: 'info' } }
});
const logger = log4js.getLogger('query');

function parseDimensions(dimensions) {
  return _.reduce(dimensions, (memo, dimension) => {
    const [operator, dimensionId, ...dimensionValues] = dimension;

    if (dimensionId === 'time') {
      const [start, end] = dimensionValues;
      return _.defaults({}, { start, end }, memo);
    }

    if (operator === 'in') {
      return _.defaults({}, {
        tagset: _.defaults({}, { [dimensionId]: _.head(dimensionValues) }, memo.tagset || {})
      }, memo);
    }

    if (operator === 'eq') {
      return _.defaults({}, {
        tagset: _.defaults({}, { [dimensionId]: [_.head(dimensionValues)] }, memo.tagset || {})
      }, memo);
    }

    return memo;
  }, {});
}

function formatResponse(response, dimensionsToCollapse = []) {
  logger.info(`[response]: ${JSON.stringify(response)}`);

  const data = _.flatMap(response, item => _.map(item.DataPoints, dataPoint => [
    dataPoint.Value,
    ..._.values(_.omit(item.SerieId.TagSet, dimensionsToCollapse)),
    dataPoint.Timestamp
  ]));

  const firstData = _.result(_.head(response), 'SerieId');

  const meta = {
    headers: [firstData.Metrics, ..._.xor(_.keys(firstData.TagSet), dimensionsToCollapse), 'time'],
    collaspsedColumns: _.map(dimensionsToCollapse, dKey => ({ [dKey]: firstData.TagSet[dKey] }))
  };

  return { data, meta };
}

const botanaApiDomain = 'botanametricsservice.kpdeus2.p.azurewebsites.net';
const botanaApiPath = 'api/Metrics/Get';

module.exports = async function(parameters) {
  const { metrics, dimensions } = parameters;
  const dimensionsParsed = parseDimensions(dimensions);
  const queryString = qs.stringify({
    metrics,
    start: dimensionsParsed.start,
    end: dimensionsParsed.end,
    tagset: JSON.stringify(dimensionsParsed.tagset)
  });
  const uri = `http://${botanaApiDomain}/${botanaApiPath}?${queryString}&fields=[]`;

  logger.info(`[request]: ${uri}`);

  const dimensionsToCollapse = _.map(_.filter(dimensions, { 0: 'eq' }), 1);
  const response = formatResponse(await rp({
    uri,
    json: true
  }), dimensionsToCollapse);

  return response;
};
