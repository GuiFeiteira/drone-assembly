const Drone = require('../models/Drone');

exports.createDrone = async (req, res) => {
  const { name, type } = req.body;
  const userId = req.user.id; 
  try {
    const drone = await Drone.create({ name, type, user: userId });
    res.status(201).json(drone);
  } catch (error) {
    if (error.name === 'ValidationError') {
      const formattedErrors = Object.values(error.errors).map(err => err.message);
      return res.status(400).json({ errors: formattedErrors });
    }
    res.status(500).json({ error: 'An error occurred while creating the drone' });
  }
};

exports.getDrones = async (req, res) => {
  try {
    const drones = await Drone.find({ user: req.user.id });
    res.json(drones);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.updateDrone = async (req, res) => {
  const { id } = req.params;
  try {
    const drone = await Drone.findByIdAndUpdate(id, req.body, { new: true });
    res.json(drone);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.deleteDrone = async (req, res) => {
  const { id } = req.params;
  try {
    await Drone.findByIdAndDelete(id);
    res.json({ message: 'Drone deleted' });
  } catch (error) {
    if (error.name === 'ValidationError') {
      const formattedErrors = Object.values(error.errors).map(err => err.message);
      return res.status(400).json({ errors: formattedErrors });
    }
    res.status(500).json({ error: 'An error occurred while updating the drone' });
  }
};