"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const colors_1 = __importDefault(require("colors"));
const logger = (req, res, next) => {
    const methodColors = {
        GET: 'green',
        POST: 'blue',
        PATCH: 'yellow'
    };
    const color = methodColors[req.method] || white;
    console.log(`${req.method} ${req.protocol}://${req.get('host')}${req.originalUrl}`[color]);
    next();
};
exports.default = logger;
//# sourceMappingURL=logger.js.map