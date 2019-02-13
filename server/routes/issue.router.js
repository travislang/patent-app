const express = require('express');
const { rejectUnauthenticated, rejectIfNotAdmin } = require('../modules/authentication-middleware');
const pool = require('../modules/pool');
const router = express.Router();

router.get('/by_office_action/:officeActionId', rejectUnauthenticated, (req, res) => {
    const { officeActionId } = req.params;
    const orderClause = 'ORDER BY "issue"."id" ASC;';
    let query = `SELECT 
                    "issue".*, "template_type"."type", "template_type"."section", 
                    "response_text"."id" AS "resp_id", "response_text"."text"
                FROM "issue"
                LEFT JOIN "template" ON "issue"."template_id"="template"."id"
                LEFT JOIN "response_text" ON "response_text"."issue_id"="issue"."id"
                LEFT JOIN "template_type" ON "template_type"."id"="issue"."template_type_id" `;
    if (req.user && req.user.is_admin) {
        query += `WHERE "office_action_id"=$1 ${orderClause}`;
    } else {
        query +=
            `JOIN "office_action" ON "issue"."office_action_id"="office_action"."id"
            JOIN "application" ON "application"."id"="office_action"."application_id"
            WHERE 
                "office_action_id"=$1 AND
                "application"."user_id"=${req.user.id} 
                ${orderClause}`;
    }
    pool.query(query, [officeActionId])
        .then((results) => {
            res.send(results.rows);
        }).catch((err) => {
            res.sendStatus(500);
            console.error('Error in GET /issue/by_office_action', err);
        }
    );
});

router.post('/add', rejectUnauthenticated, (req, res) => {
    console.log('post /api/issue/add:',req.user, req.body);
    const query =
        `INSERT INTO "issue" (
            "office_action_id",
            "template_type_id",
            "claims",
            "template_id"
        )
        SELECT $1, $2, $3, $4
        WHERE EXISTS
            (SELECT * FROM "application"
            JOIN "office_action" ON "office_action"."application_id"="application"."id"
            LEFT JOIN "issue" ON "issue"."office_action_id"="office_action"."id"
            WHERE "application"."user_id"=$5 AND "office_action"."id"=$1)
            OR $6;`;
    pool.query(query, [
        req.body.office_action_id,
        req.body.template_type_id,
        req.body.claims,
        req.body.template_id,
        req.user.id,
        req.user.is_admin,
    ]).then((results) => {
        res.sendStatus(201);
    }).catch((err) => {
        res.sendStatus(500);
        console.error('Error in /issue/add', err);
    });
});

router.put('/edit/:id', rejectUnauthenticated, (req, res) => {
    const { id } = req.params;
    console.log('in put', req.user, req.body);
    const query =
        `UPDATE "issue" SET
            "office_action_id"=$2,
            "template_type_id"=$3,
            "claims"=$4,
            "template_id"=$5
        WHERE "issue"."id"=$1
        AND (EXISTS
            (SELECT * FROM "application"
            JOIN "office_action" ON "office_action"."application_id"="application"."id"
            JOIN "issue" ON "issue"."office_action_id"="office_action"."id"
            WHERE "application"."user_id"=$6 AND "office_action"."id"=$2)
            OR $7);
    `;
    pool.query(query, [
        id,
        req.body.office_action_id,
        req.body.template_type_id,
        req.body.claims,
        req.body.template_id,
        req.user.id,
        req.user.is_admin,
    ]).then(results => {
        res.sendStatus(200);
    }).catch(err => {
        res.sendStatus(500);
        console.error('Error in /issue/edit', err);
    });
});

router.delete('/delete/:id', rejectIfNotAdmin, (req, res) => {
    const { id } = req.params;
    const query = `DELETE FROM "issue" WHERE "issue"."id"=$1;`;
    pool.query(query, [id])
        .then(results => {
            res.sendStatus(200);
        }).catch(err => {
            res.sendStatus(500);
            console.error('Error in /issue/delete', err);
        }
    );
});

module.exports = router;