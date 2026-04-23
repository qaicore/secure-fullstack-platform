import { hashPassword } from "../utils/auth";
import pool from "../config/db";
import AppError from "../utils/AppError";
import { Request, Response, NextFunction } from 'express';

export async function register(req: Request, res: Response, next: NextFunction) {
    try {
        //retrieve username and password from req.body
        const { username, password } = req.body as { username: string; password: string };
        if (!username || !password) {
            throw new AppError('No username or password entered', 400)
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