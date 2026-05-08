"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const AppError_1 = __importDefault(require("../utils/AppError"));
const notFound = (req, res, next) => {
    next(new AppError_1.default(`Route not found: ${req.method} ${req.originalUrl}`, 404));
};
exports.default = notFound;
//# sourceMappingURL=notFound.js.map