const express = require('express');
const router = express.Router();
const pdfController = require('../controllers/pdfController');

router.post('/', pdfController.generateStudentPdf);

module.exports = router;