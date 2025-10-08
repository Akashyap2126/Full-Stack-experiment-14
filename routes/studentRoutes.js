const express = require('express');
const router = express.Router();
const studentController = require('../controllers/studentController');

// CRUD routes
router.post('/', studentController.createStudent);           // Create
router.get('/', studentController.getStudents);             // Read all
router.get('/:id', studentController.getStudentById);       // Read one
router.put('/:id', studentController.updateStudent);        // Update
router.delete('/:id', studentController.deleteStudent);     // Delete

module.exports = router;
