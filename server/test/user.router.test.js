const app = require('../server.js');
const testServer = require('supertest');
const adminCredentials = { username: 'admin', password: 'admin' };
const user1Credentials = { username: 'user', password: 'user' };
const user2Credentials = { username: 'user2', password: 'user2' };
const noCredentials = { username: '', password: '' };
const testRegistrationBody = { 
    user_name: `fromTestSuite${Math.floor((Math.random() * 1000) + 1)}`, 
    password: '123' };
const testEditBody = { 
    user_name: 'alsoFromTestSuite', 
    password: '123',
    is_admin: true,
    signature_name: 'sig name',
    registration_number: 'reg number',
    phone_number: '123-456-7890',
    firm_name: 'the firm',
    uspto_customer_number: '13579',
    deposit_account_number: 'ACCT999',
    active: false,
};
const userRoutes = [
    { route: `/api/user`, method: `get`, passingResult: 403 },
    { route: `/api/user/list`, method: `get`, passingResult: 403 },
    { route: `/api/user/register`, method: `post`, passingResult: 403 },
    { route: `/api/user/login`, method: `post`, passingResult: 400 },
    { route: `/api/user/logout`, method: `post`, passingResult: 200 },
    { route: `/api/user/edit/1`, method: `put`, passingResult: 403 },
];

describe('User routes without login', () => {
    for (let route of userRoutes) {
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
                    expect(resp.statusCode).toEqual(route.passingResult);
                    done();
                }
            );
        });
    }
});

const userLoggedInRoutes = [
    { route: `/api/user`, method: `get`, loginAs: `user`, successCode: 200 },
    { route: `/api/user/list`, method: `get`, loginAs: `user`, successCode: 403 },
    { route: `/api/user/list`, method: `get`, loginAs: `admin`, successCode: 200 },
    { route: `/api/user/register`, method: `post`, loginAs: `user`, successCode: 403 },
    { route: `/api/user/register`, method: `post`, loginAs: `admin`, successCode: 201 },
    { route: `/api/user/edit/1`, method: `put`, loginAs: `user`, successCode: 403 },
    { route: `/api/user/edit/1`, method: `put`, loginAs: `admin`, successCode: 200 },
    // { route: `/api/`, method: ``, auth: ``, successCode:  },
];

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
describe('Routes should require correct login type', function () {
    for (let route of userLoggedInRoutes) {
        let credentials;
        switch (route.loginAs) {
            case 'admin':
                credentials = adminCredentials;
                break;
            case 'user':
                credentials = user1Credentials;
                break;
            case 'none':
                credentials = noCredentials;
                break;
            default:
                console.warn('in default switch');
        }
        test(`login user ${credentials.username}`, login(credentials));
        it(`Endpoint ${route.route}, logged in as ${route.loginAs}`, function (done) {
            let request;
            switch (route.method) {
                case 'get':
                    request = server.get(`${route.route}`);
                    break;
                case 'post':
                    request = server
                                .post(`${route.route}`)
                                .send(testRegistrationBody);
                    break;
                case 'put':
                    request = server
                                .put(`${route.route}`)
                                .send(testEditBody);
                    break;
                case 'delete':
                    request = server.delete(`${route.route}`);
                    break;
                default:
                    console.warn('in method default');
            }
            request
                .expect(route.successCode)
                .end(function (err, res) {
                    if (err) {
                        return done(err);
                    }
                    done()
                });
        });
    }
});

function login(credentials) {
    return function (done) {
        server
            .post('/api/user/login')
            .set('Accept', 'application/json')
            .set('Content-Type', 'application/json')
            .send(credentials)
            .then(resp => {
                expect(resp.statusCode).toEqual(200);
                done();
            }
        );
    };
};