const Student = require('../models/Student');
const mongoose = require('mongoose');

const isValidObjectId = id => mongoose.Types.ObjectId.isValid(id);

exports.createStudent = async (req, res, next) => {
  try {
    const { name, age, course } = req.body;
    const student = new Student({ name, age, course });
    const saved = await student.save();
    res.status(201).json(saved);
  } catch (err) {
    // Mongoose validation errors come in err.errors
    if (err.name === 'ValidationError') {
      const messages = Object.values(err.errors).map(e => e.message);
      return res.status(400).json({ message: 'Validation Error', errors: messages });
    }
    next(err);
  }
};

exports.getStudents = async (req, res, next) => {
  try {
    // optional: paging, filtering can be added
    const students = await Student.find().sort({ createdAt: -1 });
    res.json(students);
  } catch (err) {
    next(err);
  }
};

exports.getStudentById = async (req, res, next) => {
  try {
    const { id } = req.params;
    if (!isValidObjectId(id)) return res.status(400).json({ message: 'Invalid student id' });

    const student = await Student.findById(id);
    if (!student) return res.status(404).json({ message: 'Student not found' });

    res.json(student);
  } catch (err) {
    next(err);
  }
};

exports.updateStudent = async (req, res, next) => {
  try {
    const { id } = req.params;
    if (!isValidObjectId(id)) return res.status(400).json({ message: 'Invalid student id' });

    const { name, age, course } = req.body;
    const updated = await Student.findByIdAndUpdate(
      id,
      { name, age, course },
      { new: true, runValidators: true }
    );

    if (!updated) return res.status(404).json({ message: 'Student not found' });
    res.json(updated);
  } catch (err) {
    if (err.name === 'ValidationError') {
      const messages = Object.values(err.errors).map(e => e.message);
      return res.status(400).json({ message: 'Validation Error', errors: messages });
    }
    next(err);
  }
};

exports.deleteStudent = async (req, res, next) => {
  try {
    const { id } = req.params;
    if (!isValidObjectId(id)) return res.status(400).json({ message: 'Invalid student id' });

    const deleted = await Student.findByIdAndDelete(id);
    if (!deleted) return res.status(404).json({ message: 'Student not found' });

    res.json({ message: 'Student deleted successfully' });
  } catch (err) {
    next(err);
  }
};
