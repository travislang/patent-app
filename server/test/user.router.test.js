const app = require('../server.js');
const testServer = require('supertest');
const adminCredentials = { username: 'admin', password: 'admin' };
const user1Credentials = { username: 'user', password: 'user' };
const user2Credentials = { username: 'user2', password: 'user2' };

const apiRoutes = [
    { route: `/api/user`, method: `get`, auth: `user`, successCode: 403 },
    { route: `/api/user/list`, method: `get`, auth: `admin`, successCode: 403 },
    { route: `/api/user/register`, method: `post`, auth: `admin`, successCode: 403 },
    { route: `/api/user/login`, method: `post`, auth: `all`, successCode: 400 },
    { route: `/api/user/logout`, method: `post`, auth: `all`, successCode: 200 },
    { route: `/api/user/edit/1`, method: `put`, auth: `admin`, successCode: 403 },
    // { route: `/api/`, method: ``, auth: ``, successCode:  },
];

describe('GET routes return 403 when not logged in', () => {
    for (let route of apiRoutes) {
        console.log(`route=${route.route}`);
        test(`${route.route} route requires authentication`, (done) => {
            let request;
            switch (route.method) {
                case 'get':
                    request = testServer(app).get(`${route.route}`);
                    break;
                case 'post':                    
                    request = testServer(app).post(`${route.route}`);
                    break;
                case 'put':
                    request = testServer(app).put(`${route.route}`);
                    break;
                case 'delete':
                    request = testServer(app).delete(`${route.route}`);
                    break;
                default:
                    console.warn('in method default');
            }
            request
                .then((resp) => {
                    expect(resp.statusCode).toEqual(route.successCode);
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