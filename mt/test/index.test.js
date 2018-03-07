// const assert = require('assert');
const request = require('supertest');
const app = require('../index');

describe('Data Query', () => {
  afterEach(done => {
    app.close();
    done();
  });

  it('should work for single query', done => {
    const requestBody = `
    {
      "name": "query",
      "parameters": {
        "metrics": "169feb7a-c332-4979-9c6a-377bf2d75152",
        "dimensions": [["between", "time", "2017-12-01", "2017-12-02"], ["in", "BranchName", ["AllUp"]], ["in", "CardType", ["访客卡"]], ["eq", "MealName", "晚餐"]]}
    }
    `;

    request(app)
      .post('/graphql')
      .send(requestBody)
      .set('Accept', 'application/json')
      .expect(200)
      .end(() => {
        done();
      });
  });

  it('should work for batch query', done => {
    const requestBody = `
    [
      {
        "name": "query",
        "parameters": {
          "metrics": "169feb7a-c332-4979-9c6a-377bf2d75152",
          "dimensions": [["between", "time", "2017-12-01", "2017-12-02"], ["in", "BranchName", ["AllUp"]], ["in", "CardType", ["访客卡"]], ["eq", "MealName", "晚餐"]]}
      },
      {
        "name": "query",
        "parameters": {
          "metrics": "169feb7a-c332-4979-9c6a-377bf2d75152",
          "dimensions": [["between", "time", "2017-12-01", "2017-12-02"], ["in", "BranchName", ["AllUp"]], ["in", "CardType", ["访客卡"]], ["eq", "MealName", "晚餐"]]}
      }
    ]
    `;

    request(app)
      .post('/graphql')
      .send(requestBody)
      .set('Accept', 'application/json')
      .expect(200)
      .end(() => {
        done();
      });
  });
});

describe('GraphQL', () => {
  afterEach(done => {
    app.close();
    done();
  });

  it('should have expected response', done => {
    const query = `{
      enumType(id: "3") {
        id
        name
        relation {
          id
          name
        }
        parent {
          name
        }
      }
    }`;

    request(app)
      .post('/graphql')
      .send({ query })
      .set('Accept', 'application/json')
      .expect(200)
      .end(() => {
        done();
      });
  });
});
