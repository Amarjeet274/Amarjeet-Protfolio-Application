const mongoose = require('mongoose');

const profileSchema = new mongoose.Schema({
  name: String,
  role: String,
  bio: String,
  email: String,
  profilePhoto: String,
  socialLinks: {
    github: String,
    linkedin: String,
    twitter: String,
  },
}, { timestamps: true });

module.exports = mongoose.model('Profile', profileSchema);