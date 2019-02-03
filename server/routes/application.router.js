const express = require('express');
const { rejectUnauthenticated } = require('../modules/authentication-middleware');
const pool = require('../modules/pool');
const router = express.Router();

router.get('/', rejectUnauthenticated, (req, res) => {
    const query = `SELECT * FROM "application" ORDER BY "id" DESC;`;
    pool.query(query)
        .then((results) => {
            res.send(results.rows);
        }).catch((err) => {
            res.sendStatus(500);
            console.error('Error in GET /application', err);
        }
    );
});

router.get('/:id', rejectUnauthenticated, (req, res) => {
    const { id } = req.param;
    const query = `SELECT * FROM "application" WHERE "id"=$1;`;
    pool.query(query, [id])
        .then((results) => {
            res.send(results.rows);
        }).catch((err) => {
            res.sendStatus(500);
            console.error('Error in GET /application', err);
        }
    );
});

router.post('/add', rejectUnauthenticated, (req, res) => {
    const queryText =
        `INSERT INTO "application" (
            "user_id",
            "applicant_name",
            "status",
            "last_checked_date",
            "status_date",
            "application_number",
            "title",
            "inventor_name"
        )
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8);`;
    pool.query(query, [
        req.body.user_id,
        req.body.applicant_name,
        req.body.status,
        req.body.last_checked_date,
        req.body.status.date,
        req.body.application_number,
        req.body.title,
        req.body.inventor_name,
    ]).then((results) => {
        res.sendStatus(201);
    }).catch((err) => {
        res.sendStatus(500);
        console.error('Error in /application/add', err);
    });
});

router.put('/edit/:id', rejectUnauthenticated, (req, res) => {
    const { id } = req.param;
    const query =
        `UPDATE "application" SET (
        "user_id"=$2,
        "applicant_name"=$3,
        "status"=$4,
        "last_checked_date"=$5,
        "status_date"=$6,
        "application_number"=$7,
        "title"=$8,
        "inventor_name"=$9,
        "inactive=$10
        )
        WHERE "application"."id"=$1;
    `;
    pool.query(query, [
        id,
        req.body.user_id,
        req.body.applicant_name,
        req.body.status,
        req.body.last_checked_date,
        req.body.status.date,
        req.body.application_number,
        req.body.title,
        req.body.inventor_name,
        req.body.inactive,
    ]).then(results => {
        res.sendStatus(200);
    }).catch(err => {
        res.sendStatus(500);
        console.error('Error in /application/edit', err);
    });
});

router.delete('/delete/:id', rejectUnauthenticated, (req, res) => {
    const { id } = req.param;
    const query = `DELETE FROM "application" WHERE "application"."id"=$1;
    `;
    pool.query(query, [id])
        .then(results => {
            res.sendStatus(200);
        }).catch(err => {
            res.sendStatus(500);
            console.error('Error in /application/delete', err);
        }
    );
});

module.exports = router;