const Assembly = require('../models/montagem')
const Drone = require('../models/Drone')
const Piece = require('..//models/pecas')

exports.createAssembly = async (req, res) => {
    try {
      const { droneId, pieceId, quantidade } = req.body;
      const userId = req.user.id;
  
      // Verify Drone Existence
      const drone = await Drone.findById(droneId);
      if (!drone || drone.user.toString() !== userId) {
        return res.status(404).json({ error: 'Drone não encontrado' });
      }
  
      // Verify Piece Existence
      const piece = await Piece.findOne({ _id: pieceId, user: userId });
      if (!piece) {
        return res.status(404).json({ error: 'Peça não encontrada' });
      }
  
      // Validate Quantidade
      if (quantidade <= 0) {
        return res.status(400).json({ error: 'Quantidade deve ser maior que zero' });
      }
  
      // Create New Assembly
      const newAssembly = new Assembly({
        drone: droneId,
        user: userId,
        pecas: pieceId,
        quantidade,
      });
      await newAssembly.save();
  
      res.status(201).json(newAssembly);
    } catch (err) {
         console.error(err);
      res.status(500).json({ error: 'Erro ao registrar a montagem' });
    }
  };

exports.getAssemblies = async (req, res) => {
  try {
    const userId = req.user.id;
    const assemblies = await Assembly.find({ user: userId });
    res.status(200).json(assemblies);
  } catch (err) {
    res.status(500).json({ error: 'Erro ao obter montagens' });
  }
};

exports.updateAssembly = async (req, res) => {
  try {
    const { id } = req.params;
    const { pieceId, quantidade, status } = req.body;
    const userId = req.user.id;

    // Optional Piece Verification (if provided)
    if (pieceId) {
      const piece = await Piece.findOne({ _id: pieceId, user: userId });
      if (!piece) {
        return res.status(404).json({ error: 'Peça não encontrada' });
      }
    }

    // Validate Quantidade (if provided)
    if (quantidade && quantidade <= 0) {
      return res.status(400).json({ error: 'Quantidade deve ser maior que zero' });
    }

    const assembly = await Assembly.findOneAndUpdate(
      { _id: id, user: userId },
      { pieces: pieceId, quantidade, status },
      { new: true }
    );

    if (!assembly) {
      return res.status(404).json({ error: 'Montagem não encontrada' });
    }

    res.status(200).json(assembly);
  } catch (err) {
    res.status(500).json({ error: 'Erro ao atualizar a montagem' });
  }
};


exports.deleteAssembly = async (req, res) => {
    try {
      const { id } = req.params;
      const userId = req.user.id;
  
      const assembly = await Assembly.findOneAndDelete({ _id: id, user: userId });
  
      if (!assembly) {
        return res.status(404).json({ error: 'Montagem não encontrada' });
      }
  
      res.status(200).json({ message: 'Montagem eliminada com sucesso' });
    } catch (err) {
      res.status(500).json({ error: 'Erro ao eliminar montagem' });
    }
  };