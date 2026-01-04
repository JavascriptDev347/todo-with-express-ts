import express from "express";
import {getMe, getUserAllTodos, signIn, signUp} from "../controllers/user.controller.ts";
import {authenticateToken} from "../libs/auth.ts";

const router = express.Router();
//  ===== USER =====
/**
 * @swagger
 * /user/signup:
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
 * /user/login:
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
 * /user/get-me:
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

router.get("/all-todos", authenticateToken,getUserAllTodos);

export default router;
