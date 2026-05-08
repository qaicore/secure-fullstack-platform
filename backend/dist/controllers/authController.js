"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.register = register;
exports.login = login;
const auth_1 = require("../utils/auth");
const auth_2 = require("../utils/auth");
const auth_3 = require("../utils/auth");
const db_1 = __importDefault(require("../config/db"));
const AppError_1 = __importDefault(require("../utils/AppError"));
async function register(req, res, next) {
    try {
        //retrieve username and password from req.body
        const { username, password } = req.body;
        if (!username || !password) {
            throw new AppError_1.default('Username and password required', 400);
        }
        ;
        //check if username is already in database
        const existing = await db_1.default.query('SELECT id from users WHERE username = $1', [username]);
        if (existing.rows.length > 0) {
            throw new AppError_1.default('Username already exists', 409);
        }
        ;
        //hash and store password
        const hashed = await (0, auth_1.hashPassword)(password);
        const result = await db_1.default.query('INSERT INTO users (username, password) VALUES ($1, $2) RETURNING id, username', [username, hashed]);
        res.status(201).json(result.rows[0]);
    }
    catch (err) {
        next(err);
    }
}
async function login(req, res, next) {
    try {
        // 1. pull username and password off req.body
        const { username, password } = req.body;
        // 2. validate both present — 400 "username and password required"
        if (!username || !password) {
            throw new AppError_1.default('Username and password required', 400);
        }
        ;
        // 3. query users table by username
        const result = await db_1.default.query('SELECT id, username, password from users WHERE username = $1', [username]);
        // 4. if no row found → 401 "Invalid credentials" (NOT "user not found")
        if (result.rows.length === 0) {
            throw new AppError_1.default('Invalid credentials', 401);
        }
        ;
        // 5. verify password with verifyPassword(plaintext, user.password)
        const user = result.rows[0];
        const isValid = await (0, auth_2.verifyPassword)(password, user.password);
        // 6. if verification fails → 401 "Invalid credentials" (same message)
        if (!isValid) {
            throw new AppError_1.default('Invalid credentials', 401);
        }
        ;
        // 7. sign JWT with { userId: user.id, username: user.username }
        const token = (0, auth_3.signToken)({ userId: user.id, username: user.username });
        // 8. respond 200 with { token }
        res.status(200).json({ token });
    }
    catch (err) {
        next(err);
    }
}
//# sourceMappingURL=authController.js.map