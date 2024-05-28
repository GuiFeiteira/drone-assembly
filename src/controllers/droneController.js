const Drone = require('../models/Drone');
const Montagem = require('../models/montagem')
exports.createDrone = async (req, res) => {
  const { name, type } = req.body;
  const userId = req.user.id; 
  try {
    const drone = await Drone.create({ name, type, user: userId });
    res.status(201).json(drone);
  } catch (error) {
    res.status(400).json({ error: error.message });
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
    res.status(400).json({ error: error.message });
  }
};