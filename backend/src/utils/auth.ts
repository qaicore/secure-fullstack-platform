import bcrypt from "bcryptjs";
import 'dotenv/config';
import jwt, { SignOptions } from "jsonwebtoken";

export type JwtPayload = {
  userId: number;
  username: string;
};

const secret: string = process.env.JWT_SECRET!;
const expiration: string = process.env.JWT_EXPIRES_IN || '1h';

export async function hashPassword(plaintext: string): Promise<string> {
  const hash = await bcrypt.hash(plaintext, 10);
  return hash;
}

export async function verifyPassword(plaintext: string, hash: string): Promise<boolean> {
  const compare = await bcrypt.compare(plaintext, hash);
  return compare;
}

export function signToken(payload: JwtPayload): string {
  // @ts-expect-error - jsonwebtoken types incorrectly mark expiresIn as possibly undefined
  return jwt.sign(payload, secret, { expiresIn: expiration });
}

export function verifyToken(token: string): JwtPayload {
  return jwt.verify(token, secret) as JwtPayload;
}