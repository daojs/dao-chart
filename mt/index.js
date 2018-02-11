const Koa = require('koa');
const serve = require('koa-static');
const Router = require('koa-router');

const app = new Koa();
const router = new Router();

router.get('/line/mock', (ctx, next) => {
  const mockLineData = require('../mocks/line');

  ctx.body = mockLineData;
  return next();
});

app.use(router.prefix('/api').routes());
app.use(serve('../target'));

app.listen(9001);