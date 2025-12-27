import express from "express";
import {createTodo, deleteTodo, getAllTodos, updateTodo} from "../controllers/todo.controller.ts"
import {getMe, getUserAllTodos, signIn, signUp} from "../controllers/user.controller.ts";
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


//  ===== USER =====
/**
 * @swagger
 * /signup:
 *   post:
 *     summary: Foydalanuvchini ro‘yxatdan o‘tkazish
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [email, password, name]
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       201:
 *         description: User created
 */
router.post("/signup", signUp);
/**
 * @swagger
 * /login:
 *   post:
 *     summary: Login qilish (JWT olish)
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [email, password]
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: JWT token
 */

router.post("/login", signIn);
/**
 * @swagger
 * /get-me:
 *   get:
 *     summary: Login bo‘lgan user ma’lumotlari
 *     tags: [User]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: User info
 */

router.get("/get-me",
    authenticateToken,
    getMe
)
/**
 * @swagger
 * /user/all-todos:
 *   get:
 *     summary: Login bo‘lgan userning todolari
 *     tags: [User]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: User todos
 */

router.get("/user/all-todos", authenticateToken,getUserAllTodos);

export default router;