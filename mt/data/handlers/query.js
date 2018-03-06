const rp = require('request-promise');
const _ = require('lodash');
const qs = require('query-string');

function parseDimensions(dimensions) {
  return _.reduce(dimensions, (memo, dimension) => {
    const [operator, dimensionId, ...dimensionValues] = dimension;

    if (dimensionId === 'time') {
      const [start, end] = dimensionValues;
      return _.defaults({}, { start, end }, memo);
    }

    if (operator === 'in') {
      return _.defaults({}, {
        tagset: _.defaults({}, { [dimensionId]: _.first(dimensionValues) }, memo.tagset || {})
      }, memo);
    }

    if (operator === 'eq') {
      return _.defaults({}, {
        tagset: _.defaults({}, { [dimensionId]: [_.first(dimensionValues)] }, memo.tagset || {})
      }, memo);
    }

    return memo;
  }, {});
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

  const response = (await rp({
    uri,
    json: true
  }));

  return { response, dimensions };
};
