const _ = require('lodash');
const rp = require('request-promise');
const log4js = require('log4js');
const Boom = require('boom');
const getConfig = require('../../../utils/get-config');

module.exports = async function(parameters) {
  const logger = log4js.getLogger('metrics');

  logger.info(`[parameters] ${JSON.stringify(parameters)}`);

  const { metrics: MetricsGuid, conditions: Conditions } = parameters;

  if (_.isEmpty(MetricsGuid)) {
    throw Boom.badRequest(`Missing metrics in your parameters(${JSON.stringify(parameters)}`);
  }

  const isAll = Conditions === 'all' || _.isEmpty(Conditions);
  const uri = isAll
    ? 'https://kenshofrontdooraad-dev.azurewebsites.net/api/frontdoor/GetMetricsMeta'
    : 'https://kenshofrontdooraad-dev.azurewebsites.net/api/frontdoor/GetMetricsAvailableDimensions';

  const requestBody = _.defaults({ MetricsGuid }, isAll ? {} : { Conditions });

  const response = await rp.post({
    uri,
    json: true,
    body: requestBody,
    auth: {
      'bearer': getConfig('kensho.token')
    }
  }).catch(err => {
    logger.error(`[errored request] ${uri}`);
    logger.error(`[errored detail] ${err.toString()}`);
    throw Boom.serverUnavailable('Error from Botana service', {
      data: err
    });
  });

  logger.info(`[response] ${JSON.stringify(response)}`);

  return response;
};
