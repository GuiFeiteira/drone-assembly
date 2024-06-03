const express = require('express');
const router = express.Router();
const estatisticasController = require('../controllers/estatisticasController');
const authenticateJWT = require('../midlleware/authMiddle');

// Rota protegida para obter estatísticas (requer autenticação)
router.get('/', authenticateJWT, estatisticasController.getStats);

module.exports = router;
