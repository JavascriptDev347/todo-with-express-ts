import express from "express";
import {createTodo, deleteTodo, getAllTodos, updateTodo} from "../controllers/todo.controller.ts"
import {getMe, signIn, signUp} from "../controllers/user.controller.ts";
import {authenticateToken} from "../libs/auth.ts";
import type {UserRequest} from "../interfaces/IUser.ts";

const router = express.Router();
/**
 * @swagger
 * /all-todos:
 *   get:
 *     summary: Get all todos
 *     responses:
 *       200:
 *         description: Success
 */
router
    .get("/all-todos",getAllTodos)

/**
 * @swagger
 * /create-todo:
 *   post:
 *     summary: Create new todo
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *     responses:
 *       201:
 *         description: Created
 */
router
    .post("/create-todo",createTodo)


/**
 * @swagger
 * /edit/{id}:
 *   put:
 *     summary: Update todo
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *     responses:
 *       200:
 *         description: Updated
 */
router
    .put("/edit/:id",updateTodo)

/**
 * @swagger
 * /delete/{id}:
 *   delete:
 *     summary: Delete todo
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *     responses:
 *       200:
 *         description: Deleted
 */
router
    .delete("/delete/:id",deleteTodo);


//  ===== USER =====
router.post("/signup",signUp);
router.post("/login",signIn);
router.get("/get-me",
    authenticateToken,
    getMe
)

export default router;