
const express = require('express');
require('dotenv').config();

const app = express();
const bodyParser = require('body-parser');
const sessionMiddleware = require('./modules/session-middleware');

const passport = require('./strategies/user.strategy');

// Route includes
const userRouter = require('./routes/user.router');
const applicationRouter = require('./routes/application.router');
const officeActionRouter = require('./routes/officeAction.router');
const issueRouter = require('./routes/issue.router');
const statusRouter = require('./routes/status.router');
const templateRouter = require('./routes/template.router');
const responseRouter = require('./routes/response.router');
const downloadRouter = require('./routes/download.router');

// ---- api route ----
const usptoRouter = require('./routes/uspto.router');
// ---- end of api route ----

// Body parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Passport Session Configuration //
app.use(sessionMiddleware);

// start up passport sessions
app.use(passport.initialize());
app.use(passport.session());

/* Routes */
app.use('/api/user', userRouter);
app.use('/api/uspto', usptoRouter);
app.use('/api/application', applicationRouter);
app.use('/api/office_action', officeActionRouter);
app.use('/api/issue', issueRouter);
app.use('/api/status', statusRouter);
app.use('/api/template', templateRouter);
app.use('/api/response', responseRouter);
app.use('/api/download', downloadRouter);

// Serve static files
app.use(express.static('build'));

// App Set //
const PORT = process.env.PORT || 5000;

/** Listen * */
app.listen(PORT, () => {
  console.log(`Listening on port: ${PORT}`);
});

module.exports = app; // for testing with supertest