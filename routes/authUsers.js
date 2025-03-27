import express from "express";
import { register, login } from "../controllers/user-controller.js";

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: User authentication and registration
 */

/**
 * @swagger
 * /auth/register:
 *   post:
 *     summary: Register a new user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - username
 *               - email
 *               - password
 *             properties:
 *               username:
 *                 type: string
 *                 default: rahul
 *               email:
 *                 type: string
 *                 default: rahul@grover.com
 *               password:
 *                 type: string
 *                 default: hello123
 *     responses:
 *       201:
 *         description: User created successfully
 *       400:
 *         description: Missing or invalid input
 *       500:
 *         description: Internal server error
 */

router.post("/register", register);

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Login user and return JWT token
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 default: rahul@grover.com
 *               password:
 *                 type: string
 *                 default: hello123
 *     responses:
 *       200:
 *         description: Login successful
 *       400:
 *         description: Invalid credentials
 */

router.post("/login", login);

export default router;
