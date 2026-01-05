import express from "express";
import { createTodo, deleteTodo, getAllTodos, updateTodo, updateTodoStatus } from "../controllers/todo.controller.ts"
import { authenticateToken } from "../libs/auth.ts";

const router = express.Router();


/**
 * @swagger
 * /todos/all-todos:
 *   get:
 *     summary: Get all todos
 *     tags:
 *       - Todos
 *     responses:
 *       200:
 *         description: List of all todos
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Todo'
 */
router
    .get("/all-todos", getAllTodos)

/**
 * @swagger
 * /todos/create-todo:
 *   post:
 *     summary: Create a todo
 *     tags:
 *       - Todos
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/TodoInput'
 *     responses:
 *       201:
 *         description: Todo created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Todo'
 *       401:
 *         description: Unauthorized
 */
router
    .post("/create-todo", authenticateToken, createTodo)


/**
 * @swagger
 * /todos/edit/{id}:
 *   put:
 *     summary: Update a todo
 *     tags:
 *       - Todos
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Todo ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/TodoInput'
 *     responses:
 *       200:
 *         description: Todo updated
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Todo'
 *       404:
 *         description: Todo not found
 */
router
    .put("/edit/:id", updateTodo)

/**
 * @swagger
 * /todos/delete/{id}:
 *   delete:
 *     summary: Delete a todo
 *     tags:
 *       - Todos
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Todo ID
 *     responses:
 *       200:
 *         description: Todo deleted successfully
 *       404:
 *         description: Todo not found
 */
router
    .delete("/delete/:id", deleteTodo);
/**
 * @swagger
 * /todos/status/{id}:
 *   patch:
 *     summary: Update status of a todo
 *     tags:
 *       - Todos
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Todo ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               status:
 *                 type: string
 *                 enum: [ACTIVE, EXPIRED, DONE]
 *     responses:
 *       200:
 *         description: Todo status updated
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Todo'
 *       400:
 *         description: Invalid ID or status
 *       404:
 *         description: Todo not found
 *       401:
 *         description: Unauthorized
 */
router.patch("/status/:id", authenticateToken, updateTodoStatus)

export default router;