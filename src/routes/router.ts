import express from "express";
import {createTodo, deleteTodo, getAllTodos, updateTodo} from "../controllers/todo.controller.ts"
import {authenticateToken} from "../libs/auth.ts";

const router = express.Router();
/**
 * @swagger
 * /all-todos:
 *   get:
 *     summary: Barcha todolarni olish
 *     tags: [Todo]
 *     responses:
 *       200:
 *         description: Todos list
 */

router
    .get("/all-todos", getAllTodos)

/**
 * @swagger
 * /create-todo:
 *   post:
 *     summary: Todo yaratish
 *     tags: [Todo]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [name, description]
 *             properties:
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *               tags:
 *                 type: array
 *                 items:
 *                   type: string
 *     responses:
 *       201:
 *         description: Todo created
 */

router
    .post("/create-todo", authenticateToken, createTodo)

/**
 * @swagger
 * /edit/{id}:
 *   put:
 *     summary: Todo tahrirlash
 *     tags: [Todo]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *               tags:
 *                 type: array
 *                 items:
 *                   type: string
 *     responses:
 *       200:
 *         description: Todo updated
 */

router
    .put("/edit/:id", updateTodo)
/**
 * @swagger
 * /delete/{id}:
 *   delete:
 *     summary: Todo o‘chirish
 *     tags: [Todo]
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
 *         description: Todo deleted
 */

router
    .delete("/delete/:id", deleteTodo);



export default router;