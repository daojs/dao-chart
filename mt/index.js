const Koa = require('koa');
const serve = require('koa-static');
const Router = require('koa-router');
const graphqlHTTP = require('koa-graphql');
const compress = require('koa-compress');
const Boom = require('boom');
const koaBody = require('koa-body');
const log4js = require('log4js');

const schema = require('./schema');
const errorHandler = require('./middlewares/error-handler');
const data = require('./middlewares/data');

log4js.configure({
  appenders: {
    query: { type: 'file', filename: `./logs/query-${new Date().toLocaleDateString()}.log` },
    common: { type: 'file', filename: `./logs/common-${new Date().toLocaleDateString()}.log` }
  },
  categories: {
    default: { appenders: ['common'], level: 'info' },
    common: { appenders: ['common'], level: 'info' },
    query: { appenders: ['query'], level: 'info' }
  }
});

const app = new Koa();
const router = new Router();

app.use(errorHandler());

router.all('/graphql', graphqlHTTP({
  schema: schema,
  graphiql: true
}));

router.post('/data', koaBody(), data());

app.use(router.routes()).use(router.allowedMethods({
  throw: false,
  notImplemented: () => Boom.notImplemented(), // eslint-disable-line
  methodNotAllowed: () => Boom.methodNotAllowed() // eslint-disable-line
}));

app.use(serve('../target'));

app.use(compress());

module.exports = app.listen(9001);
