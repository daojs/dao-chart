// const assert = require('assert');
const request = require('supertest');
const app = require('../index');

describe('App', () => {
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
      .post('/api')
      .send({ query })
      .set('Accept', 'application/json')
      .expect(200)
      .end(() => {
        done();
      });
  });
});
