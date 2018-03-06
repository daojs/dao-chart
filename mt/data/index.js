const Promise = require('bluebird');
const _ = require('lodash');

async function handleSingleQuery(query) {
  const { name, parameters } = query;
  const handle = require(`./handlers/${name}.js`);

  return handle(parameters);
}

module.exports = async function(ctx, next) {
  const { body } = ctx.request;

  if (_.isArray(body)) {
    ctx.body = await Promise.map(body, async q => handleSingleQuery(q));
    await next();
  } else {
    ctx.body = await handleSingleQuery(ctx.request.body);
    await next();
  }
};
