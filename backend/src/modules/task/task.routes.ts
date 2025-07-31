import { Router } from 'express';
import { TaskController } from './task.controller';

const router = Router();

const prefix = '/tasks';

/**
 * @swagger
 * components:
 *   schemas:
 *     Task:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           example: "a1b2c3d4"
 *         name:
 *           type: string
 *           example: "Comprar pan"
 *         description:
 *           type: string
 *           example: "Ir a la tienda y comprar pan para el desayuno"
 *         createdAt:
 *           type: string
 *           format: date-time
 *           example: "2025-07-31T12:34:56.789Z"
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           example: "2025-07-31T12:34:56.789Z"
 *     CreateTaskDto:
 *       type: object
 *       required:
 *         - name
 *         - description
 *       properties:
 *         name:
 *           type: string
 *           minLength: 3
 *           maxLength: 100
 *           example: "Leer un libro"
 *         description:
 *           type: string
 *           minLength: 3
 *           maxLength: 255
 *           example: "Leer 30 páginas del libro de historia"
 */

/**
 * @swagger
 * /api/v1/tasks:
 *   get:
 *     summary: Get all tasks
 *     responses:
 *       '200': 
 *         description: A list of tasks
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Task'
 */
router.get(`${prefix}`, TaskController.getAll);

/**
 * @swagger
 * /api/v1/tasks:
 *   post:
 *     summary: Create a new task
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateTaskDto'
 *     responses:
 *       '200': 
 *         description: The created task
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Task'
 */
router.post(`${prefix}`, TaskController.create);

export default router;
