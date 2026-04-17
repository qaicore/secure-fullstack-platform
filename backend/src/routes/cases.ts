import express from 'express';
import { getCase, getCases, patchCase, postCase } from '../controllers/caseController.ts';
const router = express.Router();



//health check
router.get('/health', (req, res) => {
    res.json({
        message: 'Server is running'
    });
});

//Register a new user
router.post('/auth/register', (req, res) => {

});

//Login a user
router.post('/auth/login', (req, res) => {
    
});

//Get all cases
router.get('/', getCases);

//Post a new case
router.post('/', postCase);

//Get a case by id
router.get('/:id', getCase);

//Update a case
router.patch('/:id', patchCase);

export default router;