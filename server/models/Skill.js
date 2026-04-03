const mongoose = require('mongoose');

const skillSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true, index: true },
  category: { type: String, index: true },
  level: { type: Number, min: 0, max: 100 },
  color: String,
}, { timestamps: true });

module.exports = mongoose.model('Skill', skillSchema);