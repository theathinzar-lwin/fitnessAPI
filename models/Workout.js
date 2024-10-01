const mongoose = require('mongoose');

const workoutSchema = new mongoose.Schema({
  name: { type: String, required: true },
  duration: { type: Number, required: true },
  dateAdded: { type: Date, default: Date.now },
  status: { type: String, enum: ['incomplete', 'complete'], default: 'incomplete' },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
});

const Workout = mongoose.model('Workout', workoutSchema);
module.exports = Workout;
