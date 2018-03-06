const Koa = require('koa');
const serve = require('koa-static');
const Router = require('koa-router');
const graphqlHTTP = require('koa-graphql');
const Boom = require('boom');

const schema = require('./schema');

const app = new Koa();
const router = new Router();

router.all('/graphql', graphqlHTTP({
  schema: schema,
  graphiql: true
}));

app.use(router.routes()).use(router.allowedMethods({
  throw: true,
  notImplemented: () => new Boom.notImplemented(), // eslint-disable-line
  methodNotAllowed: () => new Boom.methodNotAllowed() // eslint-disable-line
}));

app.use(serve('../target'));

module.exports = app.listen(9001);
