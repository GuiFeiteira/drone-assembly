const Assembly = require('../models/Assembly');

exports.createAssembly = async (req, res) => {
    const { Peças, assemblyDate } = req.body;

    try {
        const assembly = new Assembly({
            user: req.user._id,
            Peças,
            assemblyDate,
            //id do drone? porque um id de user pode ter varios drones
        });
        const createdAssembly = await assembly.save();
        res.status(201).json(createdAssembly);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.getAssemblies = async (req, res) => {
    try {
        const assemblies = await Assembly.find({ user: req.user._id }).populate('Peças');
        res.json(assemblies);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Additional methods for updating and deleting assemblies can be added here
