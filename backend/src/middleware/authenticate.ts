import { verifyToken } from "../utils/auth"
import AppError from "../utils/AppError";
import { Request, Response, NextFunction } from 'express';


export function authenticate(req: Request, res: Response, next: NextFunction) {
    // 1. read req.headers.authorization
    const authHeader = req.headers.authorization;

    // 2. if missing or doesn't start with "Bearer " → 401 "No token provided"
    if (!authHeader?.startsWith('Bearer ')) {
      return next(new AppError('No token provided', 401));
    }

    // 3. extract the token (slice off "Bearer ")
    const token = authHeader.slice(7);

    // 4. try {
    //      verify token with secret → get payload
    //      attach payload to req.user
    //      call next()
    //    } catch {
    //      → 401 "Invalid or expired token"
    //    }
    try {
      const payload = verifyToken(token);
      req.user = payload;
      next();
      
    } catch {
      return next(new AppError('Invalid or expired token', 401));
    }
  }