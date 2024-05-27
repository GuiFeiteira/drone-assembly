const express = require('express');
const { createPeças, getPeças } = require('../controllers/PeçasController');
const { protect } = require('../middleware/authMiddle');
const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Peças
 *   description: Peças management
 */

/**
 * @swagger
 * /Peças/novapeca:
 *   post:
 *     summary: Create a new Peças
 *     tags: [Peças]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - quantity
 *             properties:
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *               quantity:
 *                 type: integer
 *     responses:
 *       201:
 *         description: Peças created successfully
 *       400:
 *         description: Invalid input
 */
router.post('/novapeca', protect, createPeças);

/**
 * @swagger
 * /Peças:
 *   get:
 *     summary: Get all Peças
 *     tags: [Peças]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Peças retrieved successfully
 *       400:
 *         description: Error retrieving Peças
 */
router.get('/', protect, getPeças);

module.exports = router;
