const User = require('../models/User');
const jwt = require('jsonwebtoken');

exports.register = async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await User.create({ username, password });
    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    // Access specific validation errors
    if (error.name === 'ValidationError') {
      const errors = [];
      for (const field in error.errors) {
        errors.push(error.errors[field].message);
      }
      return res.status(400).json({ errors });
    }
    console.error(error); 
    res.status(500).json({ error: 'Internal server error' });
  }
};

exports.login = async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await User.findOne({ username });
    if (user && await user.matchPassword(password)) {
      const token = jwt.sign({ id: user._id }, '1234567894125', { expiresIn: '1h' });
      res.json({ token });
      
    } else {
      res.status(401).json({ message: 'Invalid credentials' });
    }
  } catch (error) {
    if (error.name === 'ValidationError') {
      const errors = [];
      for (const field in error.errors) {
        errors.push(error.errors[field].message);
      }
      return res.status(400).json({ errors });
    }
  }
};
