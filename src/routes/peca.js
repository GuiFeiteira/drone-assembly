const express = require('express');
const { createPiece, getPieces, updatePiece, deletePiece } = require('../controllers/pecaController');
const { protect } = require('../midlleware/authMiddle');

const router = express.Router();

router.use(protect);

/**
 * @swagger
 * tags:
 *   name: Pecas
 *   description: Gestão de peças
 */

/**
 * @swagger
 * /pecas:
 *   post:
 *     summary: Criar uma nova peça
 *     tags: [Pecas]
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
 *         description: Peça criada com sucesso
 *       400:
 *         description: Entrada inválida
 */
router.post('/', createPiece);

/**
 * @swagger
 * /pecas:
 *   get:
 *     summary: Obter todas as peças do usuário autenticado
 *     tags: [Pecas]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de peças
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Peca'
 *       400:
 *         description: Entrada inválida
 */
router.get('/', getPieces);

/**
 * @swagger
 * /pecas/{id}:
 *   put:
 *     summary: Atualizar uma peça
 *     tags: [Pecas]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID da peça
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
 *     responses:
 *       200:
 *         description: Peça atualizada com sucesso
 *       400:
 *         description: Entrada inválida
 */
router.put('/:id', updatePiece);

/**
 * @swagger
 * /pecas/{id}:
 *   delete:
 *     summary: Deletar uma peça
 *     tags: [Pecas]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID da peça
 *     responses:
 *       200:
 *         description: Peça deletada com sucesso
 *       400:
 *         description: Entrada inválida
 */
router.delete('/:id', deletePiece);

module.exports = router;
