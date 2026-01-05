import express from 'express';
import { createCategory, deleteCategory, editCategory, getAllCategories, getCategoryTodos } from '../controllers/category.controller.ts';
import { authenticateToken, isAdmin } from '../libs/auth.ts';

const router = express.Router();

/**
 * @swagger
 * /categories/all:
 *   get:
 *     summary: Get all categories
 *     tags:
 *       - Categories
 *     responses:
 *       200:
 *         description: List of categories
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Category'
 */
router.get("/all", getAllCategories)

/**
 * @swagger
 * /categories/{id}:
 *   get:
 *     summary: Get todos in a category
 *     tags:
 *       - Categories
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Category ID
 *     responses:
 *       200:
 *         description: List of todos in the category
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Todo'
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Category not found
 */
router.get("/:id", authenticateToken, getCategoryTodos)

/**
 * @swagger
 * /categories/create:
 *   post:
 *     summary: Create a category
 *     tags:
 *       - Categories
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CategoryInput'
 *     responses:
 *       201:
 *         description: Category created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Category'
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden. Not admin
 */
router.post("/create", authenticateToken, isAdmin, createCategory);

/**
 * @swagger
 * /categories/{id}:
 *   put:
 *     summary: Edit a category
 *     tags:
 *       - Categories
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CategoryInput'
 *     responses:
 *       200:
 *         description: Category updated
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Category'
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden. Not admin
 *       404:
 *         description: Category not found
 */
router.put("/:id", authenticateToken, isAdmin, editCategory);

/**
 * @swagger
 * /categories/{id}:
 *   delete:
 *     summary: Delete a category
 *     tags:
 *       - Categories
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Category deleted successfully
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden. Not admin
 *       404:
 *         description: Category not found
 */
router.delete("/:id", authenticateToken, isAdmin, deleteCategory)
export default router;