const express = require('express');
const { rejectUnauthenticated } = require('../modules/authentication-middleware');
const encryptLib = require('../modules/encryption');
const pool = require('../modules/pool');
const userStrategy = require('../strategies/user.strategy');

const router = express.Router();

// Handles Ajax request for user information if user is authenticated
router.get('/', rejectUnauthenticated, (req, res) => {
  // Send back user object from the session (previously queried from the database)
  res.send(req.user);
});

router.get('/list', rejectUnauthenticated, (req, res) => {
  if (!req.user.is_admin) {
    res.sendStatus(403);
  } else {
    const query = `SELECT * FROM "user" ORDER BY "user_name";`;
    pool.query(query)
      .then( (results) => {
        res.send(results.rows);
      }).catch( (err) => {
        res.sendStatus(500);
        console.error('Error in /user/list', err);
      })
  }
});

// Handles POST request with new user data
// The only thing different from this and every other post we've seen
// is that the password gets encrypted before being inserted
router.post('/register', rejectUnauthenticated, (req, res) => { 
  const { user_name, role } = req.body;
  const hashedPassword = encryptLib.encryptPassword(req.body.password);
  const queryText = 
    `INSERT INTO "user" (
      "user_name", "password", "role", "is_admin", "signature_name", 
      "registration_number", "phone_number", "firm_name", 
      "uspto_customer_number", "deposit_account_number", "active"
      )
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)
    RETURNING id;`;
  pool.query(query, [
      userData.user_name,
      hashedPassword,
      userData.role,
      userData.is_admin,
      userData.signature_name,
      userData.registration_number,
      userData.phone_number,
      userData.firm_name,
      userData.uspto_customer_number,
      userData.deposit_account_number,
      userData.active,
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

router.put('/edit/:id', (req, res) => {
  const { id } = req.param;
  const userData = req.body;
  if (!req.user.is_admin) {
    res.sendStatus(403);
  } else {
    const hashedPassword = encryptLib.encryptPassword(req.body.password);
    const query = 
      `UPDATE "user" SET (
        "user_name"=$2, 
        "password"=$3,
        "role"=$4,
        "is_admin"=$5,
        "signature_name"=$6, 
        "registration_number"=$7, 
        "phone_number"=$8,
        "firm_name"=$9,
        "uspto_customer_number"=$10,
        "deposit_account_number"=$11,
        "active"=$12
      )
      WHERE "user"."id"=$1;
    `;
    pool.query(query, [
        id,
        userData.user_name,
        hashedPassword,
        userData.role,
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
  }
});

module.exports = router;
