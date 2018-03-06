module.exports = async function(ctx, next) {
  const { name, parameters } = ctx.request.body;
  const handle = require(`./handlers/${name}.js`);

  ctx.body = await handle(parameters);
  await next();
};
