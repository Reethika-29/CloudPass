const express = require('express');
const router = express.Router();
const Project = require('../models/project');

// Read (List all projects)
router.get('/', async (req, res) => {
  const projects = await Project.find();
  res.render('index', { projects });
});

// Create (Show form & Save new project)
router.get('/create', (req, res) => {
  res.render('create');
});

router.post('/', async (req, res) => {
  const { title, description } = req.body;
  await Project.create({ title, description });
  res.redirect('/');
});

// Update (Show edit form & Update project)
router.get('/edit/:id', async (req, res) => {
  const project = await Project.findById(req.params.id);
  res.render('edit', { project });
});

router.post('/edit/:id', async (req, res) => {
  const { title, description } = req.body;
  await Project.findByIdAndUpdate(req.params.id, { title, description });
  res.redirect('/');
});

// Delete
router.post('/delete/:id', async (req, res) => {
  await Project.findByIdAndDelete(req.params.id);
  res.redirect('/');
});

module.exports = router;
