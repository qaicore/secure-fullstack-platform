import 'dotenv/config';
export type JwtPayload = {
    userId: number;
    username: string;
};
export declare function hashPassword(plaintext: string): Promise<string>;
export declare function verifyPassword(plaintext: string, hash: string): Promise<boolean>;
export declare function signToken(payload: JwtPayload): string;
export declare function verifyToken(token: string): JwtPayload;
//# sourceMappingURL=auth.d.ts.map