import { hashPassword } from "../utils/auth";
import { verifyPassword } from "../utils/auth";
import { signToken } from "../utils/auth";
import pool from "../config/db";
import AppError from "../utils/AppError";
import { Request, Response, NextFunction } from 'express';

export async function register(req: Request, res: Response, next: NextFunction) {
    try {
        //retrieve username and password from req.body
        const { username, password } = req.body as { username: string; password: string };
        if (!username || !password) {
            throw new AppError('Username and password required', 400)
        };

        //check if username is already in database
        const existing = await pool.query(
            'SELECT id from users WHERE username = $1',
            [username]
        );

        if (existing.rows.length > 0) {
            throw new AppError('Username already exists', 409)
        };

        //hash and store password
        const hashed = await hashPassword(password)
        const result = await pool.query(
            'INSERT INTO users (username, password) VALUES ($1, $2) RETURNING id, username',
            [username, hashed]
          );

        res.status(201).json(result.rows[0]);
    } catch (err) {
      next(err);
    }
  }

export async function login(req: Request, res: Response, next: NextFunction) {
  try {
    // 1. pull username and password off req.body
    const { username, password } = req.body as { username: string; password: string };

    // 2. validate both present — 400 "username and password required"
    if (!username || !password) {
      throw new AppError('Username and password required', 400)
    };

    // 3. query users table by username
    const result = await pool.query(
      'SELECT id, username, password from users WHERE username = $1',
      [username]
    );

    // 4. if no row found → 401 "Invalid credentials" (NOT "user not found")
    if (result.rows.length === 0) {
      throw new AppError('Invalid credentials', 401)
    };

    // 5. verify password with verifyPassword(plaintext, user.password)
    const user = result.rows[0]
    const isValid = await verifyPassword(password, user.password)

    // 6. if verification fails → 401 "Invalid credentials" (same message)
    if (!isValid) {
      throw new AppError('Invalid credentials', 401)
    };

    // 7. sign JWT with { userId: user.id, username: user.username }
    const token = signToken({ userId: user.id, username: user.username });

    // 8. respond 200 with { token }
    res.status(200).json({ token });

  } catch (err) {
    next(err);
  }
}