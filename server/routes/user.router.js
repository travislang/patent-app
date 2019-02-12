const express = require('express');
const { rejectUnauthenticated, rejectIfNotAdmin } = require('../modules/authentication-middleware');
const encryptLib = require('../modules/encryption');
const pool = require('../modules/pool');
const userStrategy = require('../strategies/user.strategy');

const router = express.Router();

// Handles Ajax request for user information if user is authenticated
router.get('/', rejectUnauthenticated, (req, res) => {
  // Send back user object from the session (previously queried from the database)
  res.send(req.user);
});

router.get('/list', rejectIfNotAdmin, (req, res) => {
  const query = `SELECT * FROM "user" ORDER BY "user_name";`;
  pool.query(query)
    .then( (results) => {
      res.send(results.rows);
    })
    .catch( (err) => {
      res.sendStatus(500);
      console.error('Error in /user/list', err);
    }
  );
});

// Handles POST request with new user data
// The only thing different from this and every other post we've seen
// is that the password gets encrypted before being inserted
router.post('/register', rejectIfNotAdmin, (req, res) => { 
  const { username, password } = req.body;
  const hashedPassword = encryptLib.encryptPassword(req.body.password);
  const query = 
    `INSERT INTO "user" (
      "user_name", "password", "is_admin", "signature_name", 
      "registration_number", "phone_number", "firm_name", 
      "uspto_customer_number", "deposit_account_number"
      )
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
    RETURNING id;`;
  pool.query(query, [
      req.body.user_name,
      hashedPassword,
      req.body.is_admin,
      req.body.signature_name,
      req.body.registration_number,
      req.body.phone_number,
      req.body.firm_name,
      req.body.uspto_customer_number,
      req.body.deposit_account_number,
    ]).then( (results) => {
      res.sendStatus(201);
    }).catch( (err) => {
      res.sendStatus(500);
      console.error('Error in /user/register', err);
    });
});

// Handles login form authenticate/login POST
// userStrategy.authenticate('local') is middleware that we run on this route
// this middleware will run our POST if successful
// this middleware will send a 404 if not successful
router.post('/login', userStrategy.authenticate('local'), (req, res) => {
  res.sendStatus(200);
});

// clear all server session information about this user
router.post('/logout', (req, res) => {
  // Use passport's built-in method to log out the user
  req.logout();
  res.sendStatus(200);
});

router.put('/edit/:id', rejectIfNotAdmin, (req, res) => {
  const { id } = req.params;
  const userData = req.body;
  const hashedPassword = encryptLib.encryptPassword(req.body.password);
  const query = 
    `UPDATE "user" SET (
      "user_name",
      "password",
      "is_admin",
      "signature_name",
      "registration_number",
      "phone_number",
      "firm_name",
      "uspto_customer_number",
      "deposit_account_number",
      "active"
      ) = 
      ($2, $3, $4, $5, $6, $7, $8, $9, $10, $11)
    WHERE "user"."id"=$1;
  `;
  pool.query(query, [
      id,
      userData.user_name,
      hashedPassword,
      userData.is_admin,
      userData.signature_name,
      userData.registration_number,
      userData.phone_number,
      userData.firm_name,
      userData.uspto_customer_number,
      userData.deposit_account_number,
      userData.active,
    ]).then( results => {
      res.sendStatus(200);
    }).catch( err => {
      res.sendStatus(500);
      console.error('Error in /user/edit', err);
    });
});

router.put('/active/:id', rejectIfNotAdmin, (req, res) => {
  const active = !req.body.active;
  const id = req.params.id
  const queryString = ` UPDATE "user" SET ("active") = ($2) WHERE "user"."id"=$1;`;

  pool.query(queryString, [id,active]).then( results => {
    res.sendStatus(200);
  }).catch( err => {
    res.sendStatus(500);
    console.error('Error in /user/active', err);
  });
})

module.exports = router;
