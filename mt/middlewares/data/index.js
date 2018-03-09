const Promise = require('bluebird');
const Boom = require('boom');
const _ = require('lodash');

async function handleSingleRequest(query) {
  const { name, parameters } = query;

  if (_.isEmpty(name) || !_.isString(name)) {
    throw Boom.badRequest('Missing "name"');
  }

  if (_.isEmpty(parameters) || !_.isObject(parameters)) {
    throw Boom.badRequest('Missing "parameters"');
  }

  try {
    const handle = require(`./handlers/${name}.js`);

    return handle(parameters);
  } catch (err) {
    throw Boom.notImplemented(`The handler for name: ${name} is not implemented yet.`);
  }
}

module.exports = () => async function(ctx, next) {
  const { body } = ctx.request;

  if (_.isArray(body)) {
    ctx.body = await Promise.map(body, async q => handleSingleRequest(q));
    await next();
  } else {
    ctx.body = await handleSingleRequest(ctx.request.body);
    await next();
  }
};
