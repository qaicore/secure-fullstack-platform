import AppError from "../utils/AppError";
import { Request, Response, NextFunction } from 'express';

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
export const getCases = (req: Request, res: Response, next: NextFunction) => {
    const limit = parseInt(req.query.limit as string);

    if (!isNaN(limit) && limit > 0) {
        return res.status(200).json(cases.slice(0, limit))
    } 

    res.status(200).json(cases)
};

// @desc  Get case by id
// @route  GET /api/case/:id
export const getCase = (req: Request, res: Response, next: NextFunction) => {
    const id = parseInt(req.params.id as string);
    const foundCase = cases.find((c) => c.id === id);

    if (!foundCase) {
        return next(new AppError('Not found', 404));
    } 

    res.status(200).json({foundCase});
};

// @desc  Start a case
// @route  POST /api/cases
export const postCase = (req: Request, res: Response, next: NextFunction) => {
    const newCase = {
        id: cases.length + 1,
        name: req.body.name,
        description: req.body.description,
        severity: req.body.severity || 'low',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        status: 'open'
    };

    const validSeverities = ['low', 'medium', 'high', 'critical'];

    if (req.body.severity && !validSeverities.includes(req.body.severity)) {
        return res.status(400).json({ msg: 'Severity must be low, medium, high, or critical' });
    }

    if (!newCase.name) {
        return next(new AppError('Not found', 404));
    }

    cases.push(newCase);

    res.status(201).json(cases);
};

// @desc  Update a case
// @route  PATCH /api/cases/:id
export const patchCase = (req: Request, res: Response, next: NextFunction) => {
    console.log('PATCH body:', req.body);
    console.log('PATCH params:', req.params);
    const id = parseInt(req.params.id as string);
    const foundCase = cases.find((c) => c.id == id);

    if (!foundCase) {
        return next(new AppError('Not found', 404));
    }

    if (req.body.name) foundCase.name = req.body.name;
    if (req.body.description) foundCase.description = req.body.description;
    if (req.body.severity) foundCase.severity = req.body.severity;
    if (req.body.status) foundCase.status = req.body.status;
    foundCase.updatedAt = new Date().toISOString();

    res.status(200).json(cases)
};