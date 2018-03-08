const Boom = require('boom');
const log4js = require('log4js');

module.exports = () => async(ctx, next) => {
  try {
    await next();
  } catch (err) {
    const logger = log4js.getLogger('common');

    logger.error(`[context] ${JSON.stringify(ctx)}`);
    logger.error(`[detail] ${err.toString()}`);

    if (Boom.isBoom(err)) {
      const { output } = err;
      const { payload } = output;

      ctx.status = payload.statusCode || err.status || 500;
      ctx.body = payload || err.message;
      ctx.app.emit('error', err, ctx);
    } else {
      ctx.status = err.status || 500;
      ctx.body = err.message;
      ctx.app.emit('error', err, ctx);
    }
  }
};
