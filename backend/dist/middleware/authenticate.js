"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticate = authenticate;
const auth_1 = require("../utils/auth");
const AppError_1 = __importDefault(require("../utils/AppError"));
function authenticate(req, res, next) {
    // 1. read req.headers.authorization
    const authHeader = req.headers.authorization;
    // 2. if missing or doesn't start with "Bearer " → 401 "No token provided"
    if (!authHeader?.startsWith('Bearer ')) {
        return next(new AppError_1.default('No token provided', 401));
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
        const payload = (0, auth_1.verifyToken)(token);
        req.user = payload;
        next();
    }
    catch {
        return next(new AppError_1.default('Invalid or expired token', 401));
    }
}
//# sourceMappingURL=authenticate.js.map