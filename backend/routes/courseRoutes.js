// backend/routes/courseRoutes.js

const express = require('express');
const router = express.Router();
const Course = require('../models/Course');

// GET all courses
router.get('/', (req, res) => {
  Course.findAll((err, courses) => {
    if (err) {
      res.status(500).json({ message: err.message });
    } else {
      res.json(courses);
    }
  });
});

// GET a specific course by ID
router.get('/:id', (req, res) => {
  const courseId = req.params.id;
  Course.findById(courseId, (err, course) => {
    if (err) {
      res.status(500).json({ message: err.message });
    } else if (!course) {
      res.status(404).json({ message: 'Course not found' });
    } else {
      res.json(course);
    }
  });
});

// POST a new course
router.post('/', (req, res) => {
  const newCourse = req.body;
  Course.create(newCourse, (err, result) => {
    if (err) {
      res.status(400).json({ message: err.message });
    } else {
      res.status(201).json(result);
    }
  });
});

// PUT (update) an existing course
router.put('/:id', (req, res) => {
  const courseId = req.params.id;
  const updatedCourse = req.body;
  Course.update(courseId, updatedCourse, (err, result) => {
    if (err) {
      res.status(400).json({ message: err.message });
    } else if (result.affectedRows === 0) {
      res.status(404).json({ message: 'Course not found' });
    } else {
      res.json(result);
    }
  });
});

// DELETE a course
router.delete('/:id', (req, res) => {
  const courseId = req.params.id;
  Course.delete(courseId, (err, result) => {
    if (err) {
      res.status(500).json({ message: err.message });
    } else if (result.affectedRows === 0) {
      res.status(404).json({ message: 'Course not found' });
    } else {
      res.json({ message: 'Course deleted successfully' });
    }
  });
});

module.exports = router;
