require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');  // For CORS support
const userRoutes = require('./routes/user');
const workoutRoutes = require('./routes/workout');

const app = express();

// Middleware
app.use(express.json()); // Parse JSON requests
app.use(cors()); // Enable CORS for cross-origin requests

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected successfully'))
  .catch(err => {
    console.error('MongoDB connection error:', err.message);
    process.exit(1); // Exit if unable to connect to the database
  });

// Routes
app.use('/api/users', userRoutes);
app.use('/api/workouts', workoutRoutes);

// Error Handling Middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'An internal server error occurred.' });
});

// Server Listening
const PORT = process.env.PORT || 4000;
const APP_NAME = process.env.APP_NAME || 'Fitness Tracker App';

app.listen(PORT, () => {
  console.log(`${APP_NAME} server running on port ${PORT}`);
});
