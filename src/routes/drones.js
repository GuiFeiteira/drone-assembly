const express = require('express');
const { createDrone, getDrones, updateDrone, deleteDrone } = require('../controllers/droneController');
const { protect } = require('../midlleware/authMiddle');

const router = express.Router();

router.use(protect); // Aplicar o middleware de proteção a todas as rotas abaixo

/**
 * @swagger
 * tags:
 *   name: Drones
 *   description: Drone management
 */

/**
 * @swagger
 * /drones:
 *   post:
 *     summary: Create a new drone
 *     tags: [Drones]
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
 *               - type
 *             properties:
 *               name:
 *                 type: string
 *               type:
 *                 type: string
 *     responses:
 *       201:
 *         description: Drone created successfully
 *       400:
 *         description: Invalid input
 */
router.post('/', createDrone);

/**
 * @swagger
 * /drones:
 *   get:
 *     summary: Get all drones for the authenticated user
 *     tags: [Drones]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: A list of drones
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Drone'
 *       400:
 *         description: Invalid input
 */
router.get('/', getDrones);


/**
 * @swagger
 * /drones/{id}:
 *   put:
 *     summary: Update a drone
 *     tags: [Drones]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The drone ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               type:
 *                 type: string
 *               status:
 *                 type: string
 *                 enum: [assembled, disassembled, in-progress]
 *     responses:
 *       200:
 *         description: Drone updated successfully
 *       400:
 *         description: Invalid input
 */
router.put('/:id', updateDrone);

/**
 * @swagger
 * /drones/{id}:
 *   delete:
 *     summary: Delete a drone
 *     tags: [Drones]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The drone ID
 *     responses:
 *       200:
 *         description: Drone deleted successfully
 *       400:
 *         description: Invalid input
 */
router.delete('/:id', deleteDrone);

module.exports = router;