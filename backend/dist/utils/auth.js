"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.hashPassword = hashPassword;
exports.verifyPassword = verifyPassword;
exports.signToken = signToken;
exports.verifyToken = verifyToken;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
require("dotenv/config");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const secret = process.env.JWT_SECRET;
const expiration = process.env.JWT_EXPIRES_IN || '1h';
async function hashPassword(plaintext) {
    const hash = await bcryptjs_1.default.hash(plaintext, 10);
    return hash;
}
async function verifyPassword(plaintext, hash) {
    const compare = await bcryptjs_1.default.compare(plaintext, hash);
    return compare;
}
function signToken(payload) {
    // @ts-expect-error - jsonwebtoken types incorrectly mark expiresIn as possibly undefined
    return jsonwebtoken_1.default.sign(payload, secret, { expiresIn: expiration });
}
function verifyToken(token) {
    return jsonwebtoken_1.default.verify(token, secret);
}
//# sourceMappingURL=auth.js.map