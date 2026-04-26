import bcrypt from "bcryptjs";
import 'dotenv/config';
import jwt, { SignOptions } from "jsonwebtoken";


const secret = process.env.JWT_SECRET!;
const expiration: SignOptions["expiresIn"] = process.env.JWT_EXPIRES_IN as SignOptions["expiresIn"] || '1h';


export async function hashPassword(plaintext: string): Promise<string> {
  const hash = await bcrypt.hash(plaintext,10);
  return hash;
  }

export async function verifyPassword(plaintext: string, hash: string): Promise <boolean> {
  const compare = await bcrypt.compare(plaintext, hash);
  return compare;
  }

export function signToken(payload: { userId: number; username: string}): string {
  return jwt.sign(
        payload,
        secret,
        {expiresIn: expiration});
  }

  export function verifyToken(token: string): { userId: number; username: string } {
    return jwt.verify(token, secret) as { userId: number; username: string };
  }