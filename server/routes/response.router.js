const express = require('express');
const { rejectUnauthenticated } = require('../modules/authentication-middleware');
const pool = require('../modules/pool');
const router = express.Router();

router.get('/:issueId', rejectUnauthenticated, (req, res) => {
    const { issueId } = req.params;
    let query;
    if (req.user && req.user.is_admin) {
        query = 
            `SELECT "response_text".* FROM "response_text"
            WHERE "issue_id"=$1
            ORDER BY "id";`;
    } else {
        query =
            `SELECT "response_text".* FROM "response_text"
            JOIN "issue" ON "issue"."id"="response_text"."issue_id"
            JOIN "office_action" ON "office_action"."id"="issue"."office_action_id"
            JOIN "application" ON "office_action"."application_id"="application"."id"
            WHERE "issue_id"=$1 AND "application"."user_id"=${req.user.id}
            ORDER BY "id";`;
    }  
    pool.query(query, [issueId])
        .then((results) => {
            res.send(results.rows);
        }).catch((err) => {
            res.sendStatus(500);
            console.error('Error in GET /response_text', err);
        }
    );
});

router.post('/', rejectUnauthenticated, (req, res) => {
    const query = 
        `DO $$
        BEGIN
            IF (SELECT "user_id" FROM "application"
                JOIN "office_action" ON "application"."id"="office_action"."application_id"
                JOIN "issue" ON "issue"."office_action_id"="office_action"."id"
                WHERE "issue"."id"=11)=${req.user_id}
                OR ${req.user.is_admin}
            THEN
                INSERT INTO "response_text" ("issue_id", "text")
                VALUES ($1, $2);
            ELSE
                RAISE NOTICE 'attempted insert into response_text';
            END IF;
        END $$;
    `;
    pool.query(query, [req.body.issue_id, req.body.text])
        .then((results) => {
            res.sendStatus(201);
        }).catch((err) => {
            res.sendStatus(500);
            console.error('Error in POST /response_text', err);
        }
    );
});

router.put('/', rejectUnauthenticated, (req, res) => {
    `DO $$
        BEGIN
            IF (SELECT "user_id" FROM "application"
                JOIN "office_action" ON "application"."id"="office_action"."application_id"
                JOIN "issue" ON "issue"."office_action_id"="office_action"."id"
                WHERE "issue"."id"=11)=${req.user_id}
                OR ${req.user.is_admin}
            THEN
                UPDATE "response_text" SET 
                "issue_id"=$1, "text"=$2;
            ELSE
                RAISE NOTICE 'attempted update of response_text';
            END IF;
        END $$;
    `;
    pool.query(query, [req.body.issue_id, req.body.text])
        .then((results) => {
            res.sendStatus(201);
        }).catch((err) => {
            res.sendStatus(500);
            console.error('Error in POST /response_text', err);
        }
    );
});

module.exports = router;