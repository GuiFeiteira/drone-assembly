const express = require('express');
const { getStats } = require('../controllers/estatisticasController')
const router = express.Router();
const { protect } = require('../midlleware/authMiddle');

router.use(protect);
/**
 * @swagger
 * /drones/stats:
 *   get:
 *     summary: Get drone statistics for the authenticated user
 *     tags: [Drones]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Drone statistics
 *       500:
 *         description: Error fetching statistics
 */
router.get('/',  getStats);


module.exports = router;
