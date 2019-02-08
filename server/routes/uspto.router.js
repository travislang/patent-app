// requires
const express = require('express');
const { rejectUnauthenticated } = require('../modules/authentication-middleware'); // authentication
const router = express.Router();
const axios = require('axios');


const changeToNumber = (str) => {
    let num = +str.replace(/[^0-9.]/g,"");
    return num
}

// uspto routes
// POST ROUTE
router.post('/', rejectUnauthenticated, (req, res) => {
    const filterId = changeToNumber(req.body.applId);
    // ---- USING USPTO API  ---- 
    axios.post( // USPTO use POST route to grab information
        'https://ped.uspto.gov/api/queries', // api route
        {
            "searchText": `applId:${filterId}`, // search for this information / applId is the application id
            "qf": "applId", // where it is searching, in this case just the application Id of the patent
        }
        // {
        //     headers: { "content-type": "application/json" } // header set content-type as JSON not needed with axios
        // }
    ).then(response => {
        apiResponseBreakdown = response.data.queryResults.searchResponse.response.docs[0] // break down response to more relevant information
        res.send(apiResponseBreakdown)
    }).catch(error => {
        res.sendStatus(500);
    });
    // ---- END OF POST ----

    /* ---- extracting data ----

    .appEntityStatus // status
    .appExamName // examiner name
    .inventorName // inventor name
    .transactions // list of action response in array
    .transactions[0] // latest action response
    .appStatus // latest status of the application // IE.  "Abandoned  --  Failure to Respond to an Office Action"
    .appFilingDate // application filing date
    .patentTitle // patent title


     ---- end of data info ---- */
});

module.exports = router;