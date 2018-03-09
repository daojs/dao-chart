const Koa = require('koa');
const serve = require('koa-static');
const Router = require('koa-router');
const graphqlHTTP = require('koa-graphql');
const compress = require('koa-compress');
const Boom = require('boom');
const koaBody = require('koa-body');

const schema = require('./schema');
const getConfig = require('./utils/get-config');

// middlewares
const errorHandler = require('./middlewares/error-handler');
const data = require('./middlewares/data');
const logger = require('./middlewares/logger');

const app = new Koa();
const router = new Router();

app.use(logger());
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

module.exports = app.listen(getConfig('port'));
