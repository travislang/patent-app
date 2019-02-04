// requires
const express = require('express');
const { rejectUnauthenticated } = require('../modules/authentication-middleware'); // authentication
const router = express.Router();
const axios = require('axios');

// uspto routes

// uspto var req


// uspto POST  -- api use POST to grab information
router.post('/', rejectUnauthenticated, (req, res) => {
    const requestData = {
        "searchText": `applId:${req}`,
        "qf": "applId",
        "sort": "applId asc",
        "start": "0"
    }
    axios.post(
        {
            url: 'posturl',
            body: JSON.stringify(requestData),
            headers: { "content-type": "application/json" }
        }
    ).then(response =>{

    }).catch(error => {

    });
});

module.exports = router;