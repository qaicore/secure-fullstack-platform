import express from 'express';
import { getCase, getCases, patchCase, postCase } from '../controllers/caseController.ts';
import { authenticate } from '../middleware/authenticate.ts';
const router = express.Router();

//Authenticate routes
router.use(authenticate);

//Get all cases
router.get('/', getCases);

//Post a new case
router.post('/', postCase);

//Get a case by id
router.get('/:id', getCase);

//Update a case
router.patch('/:id', patchCase);

export default router;