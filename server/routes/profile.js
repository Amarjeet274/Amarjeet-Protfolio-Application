const express = require('express');
const Profile = require('../models/Profile');
const auth = require('../middleware/auth');
const { validateProfile, handleValidationErrors } = require('../validation/profileValidator');
const router = express.Router();

// GET profile (public)
router.get('/', async (req, res) => {
  try {
    let profile = await Profile.findOne();
    if (!profile) profile = {};
    res.json(profile);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

// PUT update profile (admin only)
router.put('/', auth, validateProfile, handleValidationErrors, async (req, res) => {
  try {
    const profile = await Profile.findOneAndUpdate({}, req.body, { new: true, upsert: true });
    res.json(profile);
  } catch (err) {
    res.status(500).json({ error: 'Failed to update profile' });
  }
});

module.exports = router;