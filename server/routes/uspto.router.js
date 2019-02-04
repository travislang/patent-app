// requires
const express = require('express');
const { rejectUnauthenticated } = require('../modules/authentication-middleware'); // authentication
const router = express.Router();
const axios = require('axios');

// uspto routes

// GET ROUTE
router.get('/', rejectUnauthenticated, (req, res) => {

    // ---- USING USPTO API  ----
    axios.post( // USPTO use POST route to grab information
        'https://ped.uspto.gov/api/queries', // api route
        {
            "searchText": `applId:${req.body.applId}`, // search for this information / applId is the application id
            "qf": "applId", // where it is searching, in this case just the application Id of the patent
        }
        // {
        //     headers: { "content-type": "application/json" } // header set content-type as JSON not needed with axios
        // }
    ).then(response => {
        apiResponseBreakdown = response.data.queryResults.searchResponse.response // break down response to more relevant information
        res.send(apiResponseBreakdown)
    }).catch(error => {
        res.sendStatus(500);
    });
    // ---- END OF POST ----

});

module.exports = router;