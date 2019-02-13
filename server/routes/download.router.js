const express = require('express');
const { rejectUnauthenticated } = require('../modules/authentication-middleware');
const pool = require('../modules/pool');
const router = express.Router();

const fs = require("fs");
const docx = require("docx");

const { Document, Paragraph, Packer } = docx;

router.get('/:officeActionId', rejectUnauthenticated, async (req, res) => {
    const { officeActionId } = req.params;
    
    const query =
        `SELECT "response_text".*, "issue"."claims", "template_type"."type", "template_type"."section" FROM "response_text"
            JOIN "issue" ON "issue"."id"="response_text"."issue_id"
            JOIN "template_type" ON "issue"."template_type_id"="template_type"."id"
            JOIN "office_action" ON "office_action"."id"="issue"."office_action_id"
            JOIN "application" ON "office_action"."application_id"="application"."id"
            WHERE "issue"."office_action_id"=$1 AND "application"."user_id"=${req.user.id}
            ORDER BY "id";`;

    // create the docx and when done send back to client
    let docx = new Promise(function (resolve, reject) {
        resolve(createDocx(query, officeActionId))
    })
    docx.then(doc => {
        res.setHeader('Content-Disposition', 'attachment; filename=My Document.docx');
        res.send(Buffer.from(doc, 'base64'));
    })
})



async function createDocx(query, officeActionId) {
    try {
        let responseText = await pool.query(query, [officeActionId])
        console.log('this is responses', responseText.rows);
        // Create document
        let doc = new docx.Document();

        //document styles
        doc.Styles.createParagraphStyle('Heading1', 'Heading 1')
            .basedOn("Normal")
            .next("Normal")
            .quickFormat()
            .size(35)
            .bold()
            .center()
            .spacing({ after: 120 });

        doc.Styles.createParagraphStyle('para', 'para')
            .basedOn("Normal")
            .next("Normal")
            .quickFormat()
            .size(24)
            .spacing({ after: 80 });

        for (let response of responseText.rows) {
            // Add some content in the document
            doc.createParagraph(`${response.type} claims ${response.claims}`).heading1();
            doc.createParagraph(response.text).style("para");
        }

        // Used to export the file into a .docx file
        var packer = new docx.Packer();

        const b64string = await packer.toBase64String(doc);
        return b64string;
    }
    catch( err ) {
        console.log('error getting responses in download route', err);
    }
}



module.exports = router;