const express = require('express');
const { rejectUnauthenticated } = require('../modules/authentication-middleware');
const pool = require('../modules/pool');
const router = express.Router();

// Results are all applications left-joined to office_action row 
// with most recent response due date.
// Office action table is joined to status table so that the
// status is available.
router.get('/status', rejectUnauthenticated, (req, res) => {
    const orderClause = ' ORDER BY "max_dates"."uspto_mailing_date" DESC NULLS LAST, "app_table_id";';
    let query = 
        `WITH "max_dates" AS (
            SELECT DISTINCT ON ("application_id") * FROM "office_action"
            LEFT JOIN "status" ON "status_id"="status"."id"
            ORDER BY "application_id", "uspto_mailing_date" DESC
        )
        SELECT *, "application"."id" AS "app_table_id" FROM "application"
        LEFT JOIN "max_dates" ON "application"."id"="max_dates"."application_id"
    `;
    if (req.user && req.user.is_admin) { 
        query += orderClause;
    } else {
        query += `WHERE "application"."user_id"=${req.user.id} ${orderClause}`;
    }
    console.log('query:', query);
    pool.query(query)
        .then((results) => {
            res.send(results.rows);
        })
        .catch((err) => {
            res.sendStatus(500);
            console.error('Error in GET /application/status', err);
        }
    );
});

router.get('/:id', rejectUnauthenticated, (req, res) => {
    const { id } = req.params;
    const userId = req.user ? req.user.id : 0;
    console.log('userId:', userId);
    let query = `SELECT * FROM "application" `;
    if (req.user && req.user.is_admin) {
        query += 'WHERE "id" = $1;';
    } else {
        query += `WHERE "application"."user_id"=${userId} AND "id" = $1;`;
    }
    pool.query(query, [id])
        .then((results) => {
            res.send(results.rows);
        }).catch((err) => {
            res.sendStatus(500);
            console.error('Error in GET /application by id', err);
        }
        );
});

router.get('/', rejectUnauthenticated, (req, res) => {
    const userId = req.user ? req.user.id : 0;
    let query = `SELECT * FROM "application"`;
    if (req.user && req.user.is_admin) {
        query += 'ORDER BY "id" DESC;';
    } else {
        query += `
            WHERE "application"."user_id"=${userId} 
            ORDER BY "id" DESC;`;
    }
    pool.query(query)
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