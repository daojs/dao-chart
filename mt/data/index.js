module.exports = async function(ctx, next) {
  const { name, parameters } = ctx.request.body;
  const handle = require(`./${name}-handler.js`);

  ctx.body = await handle(parameters);
  await next();
};
