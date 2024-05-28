const express = require('express');
const { createAssembly, getAssemblies, updateAssembly, deleteAssembly } = require('../controllers/montagemController');
const { protect } = require('../midlleware/authMiddle');

const router = express.Router();

router.use(protect);

/**
 * @swagger
 * tags:
 *   name: Montagens
 *   description: Gestão de montagens de drones
 */

/**
 * @swagger
 * /montagens:
 *   post:
 *     summary: Criar uma nova montagem de drone
 *     tags: [Montagens]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - droneId
 *               - pieceIds
 *             properties:
 *               droneId:
 *                 type: string
 *               pieceIds:
 *                 type: array
 *                 items:
 *                   type: string
 *     responses:
 *       201:
 *         description: Montagem criada com sucesso
 *       400:
 *         description: Entrada inválida
 */
router.post('/', createAssembly);

/**
 * @swagger
 * /montagens:
 *   get:
 *     summary: Obter todas as montagens do usuário autenticado
 *     tags: [Montagens]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de montagens
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Montagem'
 *       400:
 *         description: Entrada inválida
 */
router.get('/', getAssemblies);

/**
 * @swagger
 * /montagens/{id}:
 *   put:
 *     summary: Atualizar uma montagem
 *     tags: [Montagens]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID da montagem
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               pieceIds:
 *                 type: array
 *                 items:
 *                   type: string
 *               status:
 *                 type: string
 *                 enum: [in-progress, completed]
 *     responses:
 *       200:
 *         description: Montagem atualizada com sucesso
 *       400:
 *         description: Entrada inválida
 */
router.put('/:id', updateAssembly);

/**
 * @swagger
 * /montagens/{id}:
 *   delete:
 *     summary: Deletar uma montagem
 *     tags: [Montagens]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID da montagem
 *     responses:
 *       200:
 *         description: Montagem deletada com sucesso
 *       400:
 *         description: Entrada inválida
 */
router.delete('/:id', deleteAssembly);

module.exports = router;