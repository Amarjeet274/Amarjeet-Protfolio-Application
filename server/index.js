require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
const validateEnv = require('./utils/validateEnv');
const errorHandler = require('./middleware/errorHandler');

const authRoutes = require('./routes/auth');
const profileRoutes = require('./routes/profile');
const projectRoutes = require('./routes/projects');
const skillRoutes = require('./routes/skills');
const contactRoutes = require('./routes/contact');

// Validate environment variables before starting
validateEnv();

const app = express();
const frontendUrl = (process.env.FRONTEND_URL || 'http://localhost:5173').replace(/\/$/, '');

// Middleware
app.use(cors({ origin: frontendUrl }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Reuse one connection in development and in serverless deployments.
let databaseConnection;

const connectDatabase = () => {
  if (mongoose.connection.readyState === 1) return Promise.resolve();
  if (databaseConnection) return databaseConnection;

  databaseConnection = mongoose.connect(process.env.MONGO_URI, {
    serverSelectionTimeoutMS: 10000,
  })
    .then(() => console.log('MongoDB connected'))
    .catch((err) => {
      databaseConnection = undefined;
      throw err;
    });

  return databaseConnection;
};

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/profile', profileRoutes);
app.use('/api/projects', projectRoutes);
app.use('/api/skills', skillRoutes);
app.use('/api/contact', contactRoutes);

// Error handling middleware (must be last)
app.use(errorHandler);

// Vercel imports this Express app. Locally, start the HTTP server normally.
if (require.main === module) {
  connectDatabase()
    .then(() => {
      const PORT = process.env.PORT || 5000;
      app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
    })
    .catch((err) => {
      console.error('MongoDB connection error:', err.message);
      process.exit(1);
    });
} else {
  connectDatabase().catch((err) => {
    console.error('MongoDB connection error:', err.message);
  });
}

module.exports = app;
