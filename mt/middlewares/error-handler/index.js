const Boom = require('boom');

module.exports = () => async(ctx, next) => {
  try {
    await next();
  } catch (err) {
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
