const Piece = require('../models/peca');
const Assembly = require('../models/montagem');

exports.createPiece = async (req, res) => {
  try {
    const { name, assemblyId } = req.body;
    const userId = req.user.id;

    const assembly = await Assembly.findById(assemblyId);
    if (!assembly || assembly.user.toString() !== userId) {
      return res.status(404).json({ error: 'Montagem não encontrada' });
    }

    const newPiece = new Piece({ name, user: userId, assembly: assemblyId });
    await newPiece.save();

    assembly.pieces.push(newPiece._id);
    await assembly.save();

    res.status(201).json(newPiece);
  } catch (err) {
    res.status(500).json({ error: 'Erro ao criar a peça' });
  }
};

exports.getPieces = async (req, res) => {
  try {
    const userId = req.user.id;
    const pieces = await Piece.find({ user: userId }).populate('assembly');
    res.status(200).json(pieces);
  } catch (err) {
    res.status(500).json({ error: 'Erro ao obter peças' });
  }
};

exports.updatePiece = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, assemblyId } = req.body;
    const userId = req.user.id;

    const assembly = await Assembly.findById(assemblyId);
    if (!assembly || assembly.user.toString() !== userId) {
      return res.status(404).json({ error: 'Montagem não encontrada' });
    }

    const piece = await Piece.findOneAndUpdate(
      { _id: id, user: userId },
      { name, assembly: assemblyId },
      { new: true }
    );

    if (!piece) {
      return res.status(404).json({ error: 'Peça não encontrada' });
    }

    res.status(200).json(piece);
  } catch (err) {
    res.status(500).json({ error: 'Erro ao atualizar a peça' });
  }
};

exports.deletePiece = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;

    const piece = await Piece.findOneAndDelete({ _id: id, user: userId });

    if (!piece) {
      return res.status(404).json({ error: 'Peça não encontrada' });
    }

    res.status(200).json({ message: 'Peça eliminada com sucesso' });
  } catch (err) {
    res.status(500).json({ error: 'Erro ao eliminar a peça' });
  }
};
