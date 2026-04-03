const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
  title: { type: String, required: true, index: true },
  description: { type: String, required: true },
  tech: [String],
  category: { type: String, index: true },
  image: String,
  demoLink: String,
  githubLink: String,
  featured: { type: Boolean, default: false, index: true },
}, { timestamps: true });

// Index for frequently queried combinations
projectSchema.index({ featured: 1, createdAt: -1 });

module.exports = mongoose.model('Project', projectSchema);