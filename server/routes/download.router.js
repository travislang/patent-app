const express = require('express');
const { rejectUnauthenticated } = require('../modules/authentication-middleware');
const pool = require('../modules/pool');
const router = express.Router();

const fs = require("fs");
const docx = require("docx");

const { Document, Paragraph, Packer } = docx;

router.get('/', rejectUnauthenticated, async (req, res) => {
    // Create document
    var doc = new docx.Document();

    // Add some content in the document
    var paragraph = new docx.Paragraph("sweet its working.");
    // Add more text into the paragraph if you wish
    paragraph.addRun(new docx.TextRun("Lorem Ipsum Foo Bar"));
    doc.addParagraph(paragraph);

    // Used to export the file into a .docx file
    var packer = new docx.Packer();

    const b64string = await packer.toBase64String(doc);
    res.setHeader('Content-Disposition', 'attachment; filename=My Doc.docx');
    res.send(Buffer.from(b64string, 'base64'));
    // res.download(Buffer.from(b64string))
})


module.exports = router;