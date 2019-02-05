const server = require('./supertestServer');

const adminCredentials = { username: 'admin', password: 'admin' };
const user1Credentials = { username: 'user', password: 'user' };
const user2Credentials = { username: 'user2', password: 'user2' };
const noCredentials = { username: '', password: '' };

const applicationLoggedInRoutes = [
    { route: `/api/application/1`, method: `get`, loginAs: `none`, successCode: 403 },
    { route: `/api/application/1`, method: `get`, loginAs: `user`, successCode: 200 },
    { route: `/api/application/1`, method: `get`, loginAs: `admin`, successCode: 200 },
    { route: `/api/user/logout`, method: `post`, loginAs: 'admin', successCode: 200 }, 
    { route: `/api/application`, method: `get`, loginAs: `none`, successCode: 403 },
    { route: `/api/application`, method: `get`, loginAs: `user`, successCode: 200 },
    { route: `/api/application`, method: `get`, loginAs: `admin`, successCode: 200 },
    
];

describe('Routes should require correct login type', function () {
    for (let route of applicationLoggedInRoutes) {
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
                    break;
                case 'put':
                    request = server
                        .put(`${route.route}`)
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
        let expectedResponseCode
        if (credentials.username === '') { // expected to fail login
            expectedResponseCode = 400;
        } else {
            expectedResponseCode = 200;
        }
        server
            .post('/api/user/login')
            .set('Accept', 'application/json')
            .set('Content-Type', 'application/json')
            .send(credentials)
            .then(resp => {
                expect(resp.statusCode).toEqual(expectedResponseCode);
                done();
            }
            );
    };
};