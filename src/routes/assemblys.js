const express = require('express');
const { createAssembly, getAssemblies } = require('../controllers/assemblyController');
const { protect } = require('../middleware/authMiddle');
const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Assemblies
 *   description: Assemblies management
 */

/**
 * @swagger
 * /assemblies/novamontagem:
 *   post:
 *     summary: Create a new assembly
 *     tags: [Assemblies]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - Peças
 *               - assemblyDate
 *             properties:
 *               Peças:
 *                 type: array
 *                 items:
 *                   type: string
 *               assemblyDate:
 *                 type: string
 *                 format: date-time
 *     responses:
 *       201:
 *         description: Assembly created successfully
 *       400:
 *         description: Invalid input
 */
router.post('/novamontagem', protect, createAssembly);

/**
 * @swagger
 * /assemblies:
 *   get:
 *     summary: Get all assemblies for the authenticated user
 *     tags: [Assemblies]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Assemblies retrieved successfully
 *       400:
 *         description: Error retrieving assemblies
 */
router.get('/', protect, getAssemblies);

module.exports = router;
