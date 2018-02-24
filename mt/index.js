
const Koa = require('koa');
const serve = require('koa-static');
const Router = require('koa-router');
const graphqlHTTP = require('koa-graphql');

const schema = require('./schema');

const app = new Koa();
const router = new Router();

router.all('/graphql', graphqlHTTP({
  schema: schema,
  graphiql: true
}));

app.use(router.routes()).use(router.allowedMethods());

app.use(serve('../target'));

app.listen(9001);
