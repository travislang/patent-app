const express = require('express');
const { rejectUnauthenticated, rejectIfNotAdmin } = require('../modules/authentication-middleware');
const pool = require('../modules/pool');
const router = express.Router();

router.get('/:id', rejectUnauthenticated, (req, res) => {
    const { id } = req.params;
    const userId = req.user ? req.user.id : 0;
    let query = 
        `SELECT * FROM "office_action"
        LEFT JOIN "status" ON "office_action"."status_id" = "status"."id" `;
    if (req.user && req.user.is_admin) {
        query += 'WHERE "office_action"."id"=$1;';
    } else {
        query += 
            `JOIN "application" ON "office_action"."application_id"="application"."id"
            WHERE "application"."user_id"=${userId} AND "office_action"."id"=$1;`;
    }
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
    const orderClause = 'ORDER BY "uspto_mailing_date" DESC NULLS FIRST;';
    let query =
        `SELECT "office_action".*, "status".* FROM "office_action"
        LEFT JOIN "status" ON "office_action"."status_id"="status"."id"`;
    if (req.user && req.user.is_admin) {
        query += `WHERE "application_id"=$1 ${orderClause}`;
    } else {
        query += 
            `JOIN "application" ON "application"."id"="office_action"."application_id"
            WHERE 
                "application_id"=$1 AND
                "application"."user_id"=${req.user.id} 
                ${orderClause}`;
    }
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
//     "application_id" = $1,
//         "uspto_mailing_date" = $2,
//         "response_sent_date" = $3,
//         "uspto_status" = $4,
//         "status_id" = $5
//         )
// VALUES($1, $2, $3, $4, $5)
    const query =
        `INSERT INTO "office_action" (
            "application_id",
            "uspto_mailing_date",
            "response_sent_date",
            "uspto_status",
            "status_id"
            )
        SELECT $1, $2, $3, $4, $5
        WHERE EXISTS
            (SELECT * FROM "application"
            WHERE "application"."user_id"=$6 AND "application"."id"=$1)
            OR $7;`;
    pool.query(query, [
        req.body.application_id,
        req.body.uspto_mailing_date,
        req.body.response_sent_date,
        req.body.uspto_status,
        req.body.status_id,
        req.user.id,
        req.user.is_admin,
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
        `UPDATE "office_action" SET
            "application_id"=$2,
            "uspto_mailing_date"=$3,
            "response_sent_date"=$4,
            "uspto_status"=$5,
            "status_id"=$6
        WHERE "office_action"."id"=$1
            AND (EXISTS
            (SELECT * FROM "application"
            WHERE "application"."user_id"=$7 AND "application"."id"=$2)
            OR $8);`;
    pool.query(query, [
        id,
        req.body.application_id,
        req.body.uspto_mailing_date,
        req.body.response_sent_date,
        req.body.uspto_status,
        req.body.status_id,
        req.user.id,
        req.user.is_admin,
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