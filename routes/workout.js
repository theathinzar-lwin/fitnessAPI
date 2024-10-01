const express = require('express');
const { addWorkout, getMyWorkouts, updateWorkout, deleteWorkout, completeWorkoutStatus } = require('../controllers/workout');
const auth = require('../auth');
const router = express.Router();

router.post('/add', auth, addWorkout);
router.get('/', auth, getMyWorkouts);
router.patch('/:id', auth, updateWorkout);
router.delete('/:id', auth, deleteWorkout);
router.patch('/:id/complete', auth, completeWorkoutStatus);

module.exports = router;
