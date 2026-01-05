import express from "express";
import { editUserInfo, getMe, getUserAllTodos, signIn, signUp } from "../controllers/user.controller.ts";
import { authenticateToken } from "../libs/auth.ts";
import makeUploader from "../libs/utils/uploader.ts";

const router = express.Router();
/**
 * @swagger
 * /users/signup:
 *   post:
 *     summary: User signup
 *     tags:
 *       - Users
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *               profilePicture:
 *                 type: string
 *                 format: binary
 *     responses:
 *       201:
 *         description: User created successfully
 */
router.post("/signup", makeUploader("users").single("profilePicture"), signUp);

/**
 * @swagger
 * /users/login:
 *   post:
 *     summary: User login
 *     tags:
 *       - Users
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *             required:
 *               - email
 *               - password
 *     responses:
 *       200:
 *         description: Login successful, returns JWT token
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 */
router.post("/login", signIn);


/**
 * @swagger
 * /users/get-me:
 *   get:
 *     summary: Get logged-in user info
 *     tags:
 *       - Users
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Current user info
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       401:
 *         description: Unauthorized
 */
router.get("/get-me",
    authenticateToken,
    getMe
)

/**
 * @swagger
 * /users/edit:
 *   put:
 *     summary: Edit logged-in user info
 *     tags:
 *       - Users
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UserUpdateInput'
 *     responses:
 *       200:
 *         description: User info updated
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       401:
 *         description: Unauthorized
 */
router.put("/edit", authenticateToken, editUserInfo)

/**
 * @swagger
 * /users/all-todos:
 *   get:
 *     summary: Get all todos of logged-in user
 *     tags:
 *       - Users
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of todos
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Todo'
 *       401:
 *         description: Unauthorized
 */
router.get("/all-todos", authenticateToken, getUserAllTodos);

export default router;
