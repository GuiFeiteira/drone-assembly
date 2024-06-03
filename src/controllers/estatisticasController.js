const Drone = require('../models/Drone');
const Piece = require('../models/pecas');
const Assembly = require('../models/montagem');

exports.getStats = async (req, res) => {
  try {
    const userId = req.user.id;

    // Total de Drones, Peças e Montagens
    const totalDrones = await Drone.countDocuments({ user: userId });
    const totalPieces = await Piece.countDocuments({ user: userId });
    const totalAssemblies = await Assembly.countDocuments({ user: userId });

    // Peças Mais Utilizadas
    const mostUsedPieces = await Assembly.aggregate([
      { $match: { user: userId } },
      { $unwind: "$pecas" },
      { $group: { _id: "$pecas", count: { $sum: 1 } } },
      { $sort: { count: -1 } },
      { $limit: 5 } // Top 5 peças mais usadas
    ]);

    // Drones com Mais Montagens
    const dronesWithMostAssemblies = await Assembly.aggregate([
      { $match: { user: userId } },
      { $group: { _id: "$drone", count: { $sum: 1 } } },
      { $sort: { count: -1 } },
      { $lookup: { from: "drones", localField: "_id", foreignField: "_id", as: "drone" } },
      { $unwind: "$drone" },
      { $project: { _id: 0, drone: "$drone.name", count: 1 } },
      { $limit: 5 } // Top 5 drones com mais montagens
    ]);

    // Média de Peças por Montagem
    const avgPiecesPerAssembly = await Assembly.aggregate([
      { $match: { user: userId } },
      { $group: { _id: null, avgPieces: { $avg: "$quantidade" } } }
    ]);
    const avgPieces = avgPiecesPerAssembly.length > 0 ? avgPiecesPerAssembly[0].avgPieces : 0;

    res.json({
      totalDrones,
      totalPieces,
      totalAssemblies,
      mostUsedPieces,
      dronesWithMostAssemblies,
      avgPiecesPerAssembly: avgPieces
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao obter estatísticas' });
  }
};
