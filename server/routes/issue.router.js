const express = require('express');
const { rejectUnauthenticated } = require('../modules/authentication-middleware');
const pool = require('../modules/pool');
const router = express.Router();

router.get('/:id', rejectUnauthenticated, (req, res) => {
    const { id } = req.param;
    const query = 
        `SELECT * FROM "issue" 
        WHERE "issue"."id"=$1
        ORDER BY "uspto_mailing_date" DESC NULLS FIRST;`;
    pool.query(query, [id])
        .then((results) => {
            res.send(results.rows);
        }).catch((err) => {
            res.sendStatus(500);
            console.error('Error in GET /issue', err);
        }
        );
});

router.post('/add', rejectUnauthenticated, (req, res) => {
    const queryText =
        `INSERT INTO "issue" (
            "office_action_id"=$1,
            "template_type_id"=$2,
            "claims"=$3,
            "template_id"=$4
        )
        VALUES ($1, $2, $3, $4);`;
    pool.query(query, [
        req.body.office_action_id,
        req.body.template_type_id,
        req.body.claims,
        req.body.template_id,
    ]).then((results) => {
        res.sendStatus(201);
    }).catch((err) => {
        res.sendStatus(500);
        console.error('Error in /issue/add', err);
    });
});

router.put('/edit/:id', rejectUnauthenticated, (req, res) => {
    const { id } = req.param;
    const query =
        `UPDATE "issue" SET (
            "office_action_id"=$2,
            "template_type_id"=$3,
            "claims"=$4,
            "template_id"=$5
        )
        WHERE "issue"."id"=$1;
    `;
    pool.query(query, [
        id,
        req.body.office_action_id,
        req.body.template_type_id,
        req.body.claims,
        req.body.template_id,
    ]).then(results => {
        res.sendStatus(200);
    }).catch(err => {
        res.sendStatus(500);
        console.error('Error in /issue/edit', err);
    });
});

router.delete('/delete/:id', rejectUnauthenticated, (req, res) => {
    const { id } = req.param;
    const query = `DELETE FROM "issue" WHERE "issue"."id"=$1;
    `;
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