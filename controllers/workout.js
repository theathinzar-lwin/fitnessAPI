const Workout = require('../models/Workout');

exports.addWorkout = async (req, res) => {
  const { name, duration } = req.body;
  try {
    const workout = new Workout({ name, duration, user: req.userId });
    await workout.save();
    res.status(201).json(workout);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getMyWorkouts = async (req, res) => {
  try {
    const workouts = await Workout.find({ user: req.userId });
    res.status(200).json(workouts);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateWorkout = async (req, res) => {
  const { id } = req.params;
  const { name, duration, status } = req.body;
  try {
    const workout = await Workout.findOneAndUpdate({ _id: id, user: req.userId }, { name, duration, status }, { new: true });
    if (!workout) return res.status(404).json({ message: 'Workout not found' });
    res.status(200).json(workout);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.deleteWorkout = async (req, res) => {
  const { id } = req.params;
  try {
    const workout = await Workout.findOneAndDelete({ _id: id, user: req.userId });
    if (!workout) return res.status(404).json({ message: 'Workout not found' });
    res.status(200).json({ message: 'Workout deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.completeWorkoutStatus = async (req, res) => {
  const { id } = req.params;
  try {
    const workout = await Workout.findOneAndUpdate({ _id: id, user: req.userId }, { status: 'complete' }, { new: true });
    if (!workout) return res.status(404).json({ message: 'Workout not found' });
    res.status(200).json(workout);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
