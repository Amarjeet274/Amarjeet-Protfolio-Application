const express = require('express');
const Skill = require('../models/Skill');
const auth = require('../middleware/auth');
const { validateSkill, handleValidationErrors } = require('../validation/skillValidator');
const router = express.Router();

// GET all skills (public)
router.get('/', async (req, res) => {
  try {
    const skills = await Skill.find();
    res.json(skills);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

// POST new skill (admin only)
router.post('/', auth, validateSkill, handleValidationErrors, async (req, res) => {
  try {
    const skill = new Skill(req.body);
    await skill.save();
    res.status(201).json(skill);
  } catch (err) {
    res.status(500).json({ error: 'Failed to create skill' });
  }
});

// PUT update skill (admin only)
router.put('/:id', auth, validateSkill, handleValidationErrors, async (req, res) => {
  try {
    const skill = await Skill.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!skill) return res.status(404).json({ error: 'Skill not found' });
    res.json(skill);
  } catch (err) {
    res.status(500).json({ error: 'Failed to update skill' });
  }
});

// DELETE skill (admin only)
router.delete('/:id', auth, async (req, res) => {
  try {
    await Skill.findByIdAndDelete(req.params.id);
    res.json({ message: 'Deleted' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete' });
  }
});

module.exports = router;