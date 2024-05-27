const Peças = require('../models/Peças');



exports.createPeças = async (req, res) => {
    const { name, description, quantity } = req.body;

    try {
        const Peças = new Peças({ name, description, quantity });
        const createdPeças = await Peças.save();
        res.status(201).json(createdPeças);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.getPeças = async (req, res) => {
    try {
        const Peças = await Peças.find({});
        res.json(Peças);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Additional methods for updating and deleting Peças can be added here
