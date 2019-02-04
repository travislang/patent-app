const app = require('../server.js');
const testServer = require('supertest');
const adminCredentials = { username: 'admin', password: 'admin' };
const user1Credentials = { username: 'user', password: 'user' };
const user2Credentials = { username: 'user2', password: 'user2' };

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
            .send(user1Credentials)
            .then( resp => {
                expect(resp.statusCode).toEqual(200);
                done();
            });
        }
    );
});

// Use .agent method to keep single session to reuse authorization
const server = testServer.agent('http://localhost:5000');
describe('GET /api/user/list', function () {
    test('login', loginAdmin());
    it('uri that requires ADMIN login', function (done) {
        server
            .get('/api/user/list')
            .expect(200)
            .end(function (err, res) {
                if (err) return done(err);
                console.log(res.body);
                done()
            });
    });
});

function loginAdmin() {
    return function (done) {
        server
            .post('/api/user/login')
            .set('Accept', 'application/json')
            .set('Content-Type', 'application/json')
            .send(adminCredentials)
            .then(resp => {
                expect(resp.statusCode).toEqual(200);
                done();
            });
        //     .expect(200)
        //     // .expect('Location', '/')
        //     .end(onResponse);

        // function onResponse(err, res) {
        //     if (err) return done(err);
        //     return done();
        // }
    };
};