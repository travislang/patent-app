const express = require('express');
const { rejectUnauthenticated, rejectIfNotAdmin } = require('../modules/authentication-middleware');
const pool = require('../modules/pool');
const router = express.Router();

router.get('/:id', rejectUnauthenticated, (req, res) => {
    const { id } = req.params;
    const query = 
        `SELECT * FROM "office_action" 
        LEFT JOIN "status" ON "office_action"."status_id"="status"."id"
        WHERE "office_action"."id"=$1;`;
    pool.query(query, [id])
        .then((results) => {
            res.send(results.rows);
        }).catch((err) => {
            res.sendStatus(500);
            console.error('Error in GET /office_action', err);
        }
    );
});

router.get('/by_app/:app_id', rejectUnauthenticated, (req, res) => {
    const { app_id } = req.params;
    const query = 
        `SELECT * FROM "office_action"
        LEFT JOIN "status" ON "office_action"."status_id"="status"."id"
        WHERE "application_id"=$1 
        ORDER BY "uspto_mailing_date" DESC NULLS FIRST;`;
    pool.query(query, [app_id])
        .then((results) => {
            res.send(results.rows);
        }).catch((err) => {
            res.sendStatus(500);
            console.error('Error in GET /office_action/by_app', err);
        }
    );
});

router.post('/add', rejectUnauthenticated, (req, res) => {
    const query =
        `INSERT INTO "office_action" (
            "application_id"=$1,
            "uspto_mailing_date"=$2,
            "response_sent_date"=$3,
            "uspto_status"=$4,
            "status_id"=$5
        )
        VALUES ($1, $2, $3, $4, $5);`;
    pool.query(query, [
        req.body.application_id,
        req.body.response_due_date,
        req.body.response_sent_date,
        req.body.uspto_status,
        req.body.status_id,
    ]).then((results) => {
        res.sendStatus(201);
    }).catch((err) => {
        res.sendStatus(500);
        console.error('Error in /office_action/add', err);
    });
});

router.put('/edit/:id', rejectUnauthenticated, (req, res) => {
    const { id } = req.params;
    const query =
        `UPDATE "office_action" SET (
            "application_id"=$2,
            "uspto_mailing_date"=$3,
            "response_due_date"=$4,
            "response_sent_date"=$5,
            "status_id"=$6
        )
        WHERE "office_action"."id"=$1;
    `;
    pool.query(query, [
        id,
        req.body.application_id,
        req.body.uspto_mailing_date,
        req.body.response_sent_date,
        req.body.uspto_status,
        req.body.status_id,
    ]).then(results => {
        res.sendStatus(200);
    }).catch(err => {
        res.sendStatus(500);
        console.error('Error in /office_action/edit', err);
    });
});

router.delete('/delete/:id', rejectIfNotAdmin, (req, res) => {
    const { id } = req.params;
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