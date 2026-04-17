import AppError from "../utils/AppError";
import { Request, Response, NextFunction } from 'express';
import pool from "../config/db";

let cases = [
    {
        id: 1,
        name: 'Case 1',
        description: 'Description of Case 1',
        severity: 'Severity of Case 1',
        createdAt: 'Timestamp of Case 1 Creation',
        updatedAt: 'Timestamp of Case 1 Last Modification',
        status: 'Status of Case 1'
    },
    {
        id: 2,
        name: 'Case 2',
        description: 'Description of Case 2',
        severity: 'Severity of Case 2',
        createdAt: 'Timestamp of Case 2 Creation',
        updatedAt: 'Timestamp of Case 2 Last Modification',
        status: 'Status of Case 2'
    }
];

// @desc  Get all cases
// @route  GET /api/cases
export const getCases = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const result = await pool.query('SELECT * FROM cases ORDER BY created_at DESC');
        res.status(200).json(result.rows);
    } catch (err) {
        next(err);
    }
};

// @desc  Get case by id
// @route  GET /api/case/:id
export const getCase = async (req: Request, res: Response, next: NextFunction) => {
    try{
        const id = parseInt(req.params.id as string);
        const result = await pool.query('SELECT * FROM cases WHERE id = $1', [id]);

        if (result.rows.length === 0) {
            return next(new AppError('Not found', 404));
        } 

        res.status(200).json(result.rows[0]);
    } catch (err) {
        next(err);
    }    
};

// @desc  Start a case
// @route  POST /api/cases
export const postCase = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { name, description, severity } = req.body;

        if (!name) {
            return next(new AppError('Please include a case name', 400));
        }

        const validSeverities = ['low', 'medium', 'high', 'critical'];
        if (severity && !validSeverities.includes(severity)) {
            return next(new AppError('Severity must be low, medium, high, or critical', 400));
        }

        const result = await pool.query(
            'INSERT INTO cases (name, description, severity) VALUES ($1, $2, $3) RETURNING *',
            [name, description || '', severity || 'low']
        );

        res.status(201).json(result.rows[0]);
    } catch (err) {
        next(err);
    }
};

// @desc  Update a case
// @route  PATCH /api/cases/:id
export const patchCase = async (req: Request, res: Response, next: NextFunction) => {
    try{
        const id = parseInt(req.params.id as string);
        const { name, description, severity, status } = req.body;
        const result = await pool.query(
        `UPDATE cases SET 
            name = COALESCE($1, name),
            description = COALESCE($2, description),
            severity = COALESCE($3, severity),
            status = COALESCE($4, status),
            updated_at = NOW()
    WHERE id = $5 
    RETURNING *`,
    [name, description, severity, status, id]);

        if (result.rows.length === 0) {
            return next(new AppError('Not found', 404));
        } 

        res.status(200).json(result.rows[0]);
    } catch (err) {
        next(err);
    }
    
    
};