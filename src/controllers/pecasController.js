const Piece = require('../models/pecas');
const Assembly = require('../models/montagem');

exports.createPiece = async (req, res) => {
  try {
    const {name} = req.body;
    const userId = req.user.id;

    const newPiece = new Piece({ name, user: userId});
    await newPiece.save(); 
    res.status(201).json(newPiece);
  } catch (error) {
    if (error.name === 'ValidationError') {
      const formattedErrors = Object.values(error.errors).map(err => err.message);
      return res.status(400).json({ errors: formattedErrors });
    }
    console.error(error); 
    res.status(500).json({ error: 'Erro ao criar a peça' });
  }
};

exports.getPieces = async (req, res) => {
  try {
    const userId = req.user.id;
    const pieces = await Piece.find({ user: userId });
    res.status(200).json(pieces);
  } catch (err) {
    res.status(500).json({ error: 'Erro ao obter peças' });
  }
};

exports.updatePiece = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;

    const piece = await Piece.findOneAndUpdate(
      { _id: id, user: userId },
      { new: true }
    );

    if (!piece) {
      return res.status(404).json({ error: 'Peça não encontrada' });
    }

    res.status(200).json(piece);
  } catch (err) {
    if (error.name === 'ValidationError') {
      const formattedErrors = Object.values(error.errors).map(err => err.message);
      return res.status(400).json({ errors: formattedErrors });
    }
    console.error(error); 
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