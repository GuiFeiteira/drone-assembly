const Assembly = require('../models/montagem');
const Drone = require('../models/Drone');
const Piece = require('../models/peca');

exports.createAssembly = async (req, res) => {
  try {
    const { droneId, pieceIds } = req.body;
    const userId = req.user.id;

    const drone = await Drone.findById(droneId);
    if (!drone || drone.user.toString() !== userId) {
      return res.status(404).json({ error: 'Drone não encontrado' });
    }

    const pieces = await Piece.find({ _id: { $in: pieceIds }, user: userId });
    if (pieces.length !== pieceIds.length) {
      return res.status(404).json({ error: 'Algumas peças não foram encontradas' });
    }

    const newAssembly = new Assembly({ drone: droneId, user: userId, pieces: pieceIds });
    await newAssembly.save();

    res.status(201).json(newAssembly);
  } catch (err) {
    res.status(500).json({ error: 'Erro ao registrar a montagem' });
  }
};

exports.getAssemblies = async (req, res) => {
  try {
    const userId = req.user.id;
    const assemblies = await Assembly.find({ user: userId }).populate('drone pieces');
    res.status(200).json(assemblies);
  } catch (err) {
    res.status(500).json({ error: 'Erro ao obter montagens' });
  }
};

exports.updateAssembly = async (req, res) => {
  try {
    const { id } = req.params;
    const { pieceIds, status } = req.body;
    const userId = req.user.id;

    const pieces = await Piece.find({ _id: { $in: pieceIds }, user: userId });
    if (pieces.length !== pieceIds.length) {
      return res.status(404).json({ error: 'Algumas peças não foram encontradas' });
    }

    const assembly = await Assembly.findOneAndUpdate(
      { _id: id, user: userId },
      { pieces: pieceIds, status },
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
