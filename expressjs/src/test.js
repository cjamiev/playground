const request = require('supertest');
const app = require('./index.js');

const onEnd = (err, res, makeRequest, done) => {
  if (res.status === 500) {
    makeRequest();
    return;
  } else if (!!err) {
    done(err);
    return;
  }
  done();
};

describe('GET /', () => {
  it('should respond with html', done => {
    request(app)
      .get('/')
      .set('Accept', 'text/html')
      .expect('Content-Type', /html/)
      .expect(404)
      .end((err, res) => {
        if (!!err) return done(err);
        done();
      });
  });
});

describe('GET /api', () => {
  it('should respond with json', done => {
    const makeRequest = () => {
      request(app)
        .get('/api')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200)
        .end((err, res) => onEnd(err, res, makeRequest, done));
    };

    makeRequest();
  });
});

describe('POST /api', () => {
  it('should respond with 200', done => {
    const makeRequest = () => {
      request(app)
        .post('/api')
        .send({
          id: 4,
          name: 'Vuejs',
          description: 'Framework for building user interfaces',
          features: ['components', 'routing', 'reactivity'],
          libraries: [
            {
              id: 1,
              name: '',
              description: '',
              alternatives: []
            }
          ]
        })
        .expect(200)
        .end((err, res) => onEnd(err, res, makeRequest, done));
    };

    makeRequest();
  });

  it('should respond with 400 for duplicate id', done => {
    const makeRequest = () => {
      request(app)
        .post('/api')
        .send({
          id: 1,
          name: 'ReactJS',
          description: 'Library for building user interfaces',
          features: [],
          libraries: []
        })
        .expect(400)
        .end((err, res) => onEnd(err, res, makeRequest, done));
    };

    makeRequest();
  });

  it('should respond with 400 for incomplete data', done => {
    const makeRequest = () => {
      request(app)
        .post('/api')
        .send({ id: 5, name: 'D3JS' })
        .expect(400)
        .end((err, res) => onEnd(err, res, makeRequest, done));
    };

    makeRequest();
  });
});

describe('DELETE /api', () => {
  it('should respond with json', done => {
    const makeRequest = () => {
      request(app)
        .delete('/api')
        .send({ id: 1 })
        .expect(200)
        .end((err, res) => onEnd(err, res, makeRequest, done));
    };

    makeRequest();
  });

  it('should respond with 400 when no event exists with id', done => {
    const newId = 10000;
    const makeRequest = () => {
      request(app)
        .delete('/api')
        .send({ id: newId })
        .expect(400)
        .end((err, res) => onEnd(err, res, makeRequest, done));
    };

    makeRequest();
  });
});
