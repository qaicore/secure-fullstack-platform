"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.patchCase = exports.postCase = exports.getCase = exports.getCases = void 0;
const AppError_1 = __importDefault(require("../utils/AppError"));
const express_1 = require("express");
const db_1 = __importDefault(require("../config/db"));
// @desc  Get all cases
// @route  GET /api/cases
const getCases = async (req, res, next) => {
    try {
        const result = await db_1.default.query('SELECT * FROM cases ORDER BY created_at DESC');
        res.status(200).json(result.rows);
    }
    catch (err) {
        next(err);
    }
};
exports.getCases = getCases;
// @desc  Get case by id
// @route  GET /api/case/:id
const getCase = async (req, res, next) => {
    try {
        const id = parseInt(req.params.id);
        const result = await db_1.default.query('SELECT * FROM cases WHERE id = $1', [id]);
        if (result.rows.length === 0) {
            return next(new AppError_1.default('Not found', 404));
        }
        res.status(200).json(result.rows[0]);
    }
    catch (err) {
        next(err);
    }
};
exports.getCase = getCase;
// @desc  Start a case
// @route  POST /api/cases
const postCase = async (req, res, next) => {
    try {
        const { name, description, severity } = req.body;
        const userId = req.user.userId;
        if (!name) {
            return next(new AppError_1.default('Please include a case name', 400));
        }
        const validSeverities = ['low', 'medium', 'high', 'critical'];
        if (severity && !validSeverities.includes(severity)) {
            return next(new AppError_1.default('Severity must be low, medium, high, or critical', 400));
        }
        const result = await db_1.default.query('INSERT INTO cases (name, description, severity, created_by) VALUES ($1, $2, $3, $4) RETURNING *', [name, description, severity, userId]);
        res.status(201).json(result.rows[0]);
    }
    catch (err) {
        next(err);
    }
};
exports.postCase = postCase;
// @desc  Update a case
// @route  PATCH /api/cases/:id
const patchCase = async (req, res, next) => {
    try {
        const id = parseInt(req.params.id);
        const { name, description, severity, status } = req.body;
        const result = await db_1.default.query(`UPDATE cases SET 
            name = COALESCE($1, name),
            description = COALESCE($2, description),
            severity = COALESCE($3, severity),
            status = COALESCE($4, status),
            updated_at = NOW()
    WHERE id = $5 
    RETURNING *`, [name, description, severity, status, id]);
        if (result.rows.length === 0) {
            return next(new AppError_1.default('Not found', 404));
        }
        res.status(200).json(result.rows[0]);
    }
    catch (err) {
        next(err);
    }
};
exports.patchCase = patchCase;
//# sourceMappingURL=caseController.js.map