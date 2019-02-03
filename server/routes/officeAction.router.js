const express = require('express');
const { rejectUnauthenticated } = require('../modules/authentication-middleware');
const pool = require('../modules/pool');
const router = express.Router();

router.get('/', rejectUnauthenticated, (req, res) => {
    const query = `SELECT * FROM "office_action" ORDER BY "id" DESC;`;
    pool.query(query)
        .then((results) => {
            res.send(results.rows);
        }).catch((err) => {
            res.sendStatus(500);
            console.error('Error in GET /office_action', err);
        }
    );
});

router.get('/:id', rejectUnauthenticated, (req, res) => {
    const { id } = req.param;
    const query = `SELECT * FROM "office_action" WHERE id"=$1;`;
    pool.query(query, [id])
        .then((results) => {
            res.send(results.rows);
        }).catch((err) => {
            res.sendStatus(500);
            console.error('Error in GET /office_action', err);
        }
        );
});

router.post('/add', rejectUnauthenticated, (req, res) => {
    const queryText =
        `INSERT INTO "office_action" (
            "application_id"=$1,
            "response_due_date"=$2,
            "response_sent_date"=$3,
            "status_id"=$4
        )
        VALUES ($1, $2, $3, $4);`;
    pool.query(query, [
        req.body.application_id,
        req.body.response_due_date,
        req.body.response_sent_date,
        req.body.status_id,
    ]).then((results) => {
        res.sendStatus(201);
    }).catch((err) => {
        res.sendStatus(500);
        console.error('Error in /office_action/add', err);
    });
});

router.put('/edit/:id', rejectUnauthenticated, (req, res) => {
    const { id } = req.param;
    const query =
        `UPDATE "office_action" SET (
            "application_id"=$2,
            "response_due_date"=$3,
            "response_sent_date"=$4,
            "status_id"=$5
        )
        WHERE "office_action"."id"=$1;
    `;
    pool.query(query, [
        id,
        req.body.application_id,
        req.body.response_due_date,
        req.body.response_sent_date,
        req.body.status_id,
    ]).then(results => {
        res.sendStatus(200);
    }).catch(err => {
        res.sendStatus(500);
        console.error('Error in /office_action/edit', err);
    });
});

router.delete('/delete/:id', rejectUnauthenticated, (req, res) => {
    const { id } = req.param;
    const query = `DELETE FROM "office_action" WHERE "office_action"."id"=$1;
    `;
    pool.query(query, [id])
        .then(results => {
            res.sendStatus(200);
        }).catch(err => {
            res.sendStatus(500);
            console.error('Error in /office_action/delete', err);
        }
        );
});

module.exports = router;