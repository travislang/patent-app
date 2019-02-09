const express = require('express');
const { rejectUnauthenticated } = require('../modules/authentication-middleware');
const pool = require('../modules/pool');
const router = express.Router();

router.get('/:typeId', rejectUnauthenticated, (req, res) => {
    const { typeId } = req.params;
    const query =
        `SELECT * FROM "template"
        WHERE "type_id"=$1 AND ("user_id" IS NULL OR "user_id"=$2)
        ORDER BY "id";`;
    pool.query(query, [typeId, req.user.id])
        .then((results) => {
            res.send(results.rows);
        }).catch((err) => {
            res.sendStatus(500);
            console.error('Error in GET /template', err);
        }
    );
});

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

module.exports = router;