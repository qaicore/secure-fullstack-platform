import express from 'express';
const router = express.Router();

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
router.get('/', (req, res, next) => {
    const limit = parseInt(req.query.limit);

    if (!isNaN(limit) && limit > 0) {
        return res.status(200).json(cases.slice(0, limit))
    } 

    res.status(200).json(cases)
});

//Post a new case
router.post('/', (req, res, next) => {
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

    if (severity && !validSeverities.includes(severity)) {
        return res.status(400).json({ msg: 'Severity must be low, medium, high, or critical' });
    }

    if (!newCase.name) {
        const error = new Error(`Please include a case name`)
        error.status = 404;
        return next(error);
    }

   

    cases.push(newCase);

    res.status(201).json(cases);
});

//Get a case by id
router.get('/:id', (req, res, next) => {
    const id = parseInt(req.params.id);
    const foundCase = cases.find((c) => c.id === id);

    if (!foundCase) {
        const error = new Error(`A case with the id of ${id} was not found`)
        error.status = 404;
        return next(error);
    } 

    res.status(200).json({foundCase});
});

//Update a case
router.patch('/:id', (req, res, next) => {
    console.log('PATCH body:', req.body);
    console.log('PATCH params:', req.params);
    const id = parseInt(req.params.id);
    const foundCase = cases.find((c) => c.id == id);

    if (!foundCase) {
        const error = new Error(`A case with the id of ${id} was not found`)
        error.status = 404;
        return next(error);
    }

    if (req.body.name) foundCase.name = req.body.name;
    if (req.body.description) foundCase.description = req.body.description;
    if (req.body.severity) foundCase.severity = req.body.severity;
    if (req.body.status) foundCase.status = req.body.status;
    foundCase.updatedAt = new Date().toISOString();

    res.status(200).json(cases)
});

export default router;