const express = require('express');
const router = express.Router();
const academicController = require('../controllers/academicController');

router.post('/', academicController.createAcademicData);

module.exports = router;