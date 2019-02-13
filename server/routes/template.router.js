const express = require('express');
const { rejectUnauthenticated } = require('../modules/authentication-middleware');
const pool = require('../modules/pool');
const router = express.Router();

router.get('/types', rejectUnauthenticated, (req, res) => {
    const query =
        `SELECT * FROM "template_type" 
        ORDER BY "id";`;
    pool.query(query)
        .then((results) => {
            res.send(results.rows);
        }).catch((err) => {
            res.sendStatus(500);
            console.error('Error in GET /template/types', err);
        }
    );
});

router.get('/all', rejectUnauthenticated, (req, res) => {
    const query =
        `SELECT "template".*, "template_type"."type" FROM "template"
        RIGHT JOIN "template_type" ON "template"."type_id"="template_type"."id"
        WHERE "template"."user_id"=$1 OR "template"."user_id" IS NULL OR $2=TRUE
        ORDER BY "template_type"."id";`;
    pool.query(query, [req.user.id, req.user.is_admin])
        .then((results) => {
            res.send(results.rows);
        }).catch((err) => {
            res.sendStatus(500);
            console.error('Error in GET /template/all', err);
        }
    );
});

router.get('/:typeId', rejectUnauthenticated, (req, res) => {
    const { typeId } = req.params;
    const query =
        `SELECT "template".*, "template_type"."type" FROM "template"
        JOIN "template_type" ON "template"."type_id"="template_type"."id"
        WHERE "type_id"=$1 AND ("user_id" IS NULL OR "user_id"=$2)
        ORDER BY "id";`;
    pool.query(query, [typeId, req.user.id])
        .then((results) => {
            res.send(results.rows);
        }).catch((err) => {
            res.sendStatus(500);
            console.error('Error in GET /template/types', err);
        }
    );
});

router.post('/add', rejectUnauthenticated, (req, res) => {
    // assume that admin user will be inserting for use by all users, thus user_id is null
    let userIdToInsert;
    if (req.user.is_admin) {
        userIdToInsert = null;
    } else {
        userIdToInsert = req.user.id;
    }
    const query =
        `INSERT INTO "template"
            ("type_id", "template_name", "content", "user_id")
         VALUES ($1, $2, $3, $4);`;
    pool.query(query, [
        req.body.type_id,
        req.body.template_name,
        req.body.content,
        userIdToInsert,
        ]).then((results) => {
            res.send(results.rows);
        }).catch((err) => {
            res.sendStatus(500);
            console.error('Error in POST /template/add', err);
        }
    );
});

router.put('/edit/:id', rejectUnauthenticated, (req, res) => {
    console.log('user:', req.user);
    if (!req.user.is_admin && req.body.user_id !== req.user.id) {
        res.sendStatus(403);
    } else {
        const { id } = req.params;
        const query =
            `UPDATE "template" SET
                "type_id"=$2, "template_name"=$3, "content"=$4, "user_id"=$5
            WHERE "id"=$1;`;
        pool.query(query, [
            id,
            req.body.type_id,
            req.body.template_name,
            req.body.content,
            req.body.user_id,
        ]).then((results) => {
            res.send(results.rows);
        }).catch((err) => {
            res.sendStatus(500);
            console.error('Error in PUT /template/edit', err);
            }
        );
    }
});

module.exports = router;