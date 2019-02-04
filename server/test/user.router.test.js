const app = require('../server.js');
const testServer = require('supertest');

describe('GET routes return 403 when not logged in', () => {
    const apiRoutes = [
        `user`,
    ];
    for (let route of apiRoutes) {
        console.log(`route=/api/${route}`);
        test(`/api/${route} route requires authentication`, (done) => {
            testServer(app).get(`/api/${route}`)
                .then((resp) => {
                    expect(resp.statusCode).toEqual(403);
                    done();
                }
            );
        });
    }
});

describe('Login API', function () {
    test('Success if credential is valid', done => {
        testServer(app)
            .post('/api/user/login')
            .set('Accept', 'application/json')
            .set('Content-Type', 'application/json')
            .send({ username: 'dpm', password: 'dpm' })
            .then( resp => {
                expect(resp.statusCode).toEqual(200);
                done();
            });
        }
    );
});