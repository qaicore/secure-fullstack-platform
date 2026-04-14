require('dotenv').config();
const express = require('express');
const path = require('path');
const port = process.env.PORT || 8000;

const app = express();

//setup static folder
//app.use(express.static(path.join(__dirname, 'public'))); //location of the static files


//health check
app.get('/health', (req, res) => {
    res.json({
        message: 'Server is running'
    });
});

//Register a new user
app.post('/auth/register', (req, res) => {

});

//Login a user
app.post('/auth/login', (req, res) => {
    
});

//Get all cases
let cases = [
    {
        id: 1,
        name: 'Case 1',
        description: 'Description of Case 1'
    },
    {
        id: 2,
        name: 'Case 2',
        description: 'Description of Case 2'
    }
];

app.get('/api/cases', (req, res) => {
    const limit = parseInt(req.query.limit);

    if (!isNaN(limit) && limit > 0) {
        res.status(200).json(cases.slice(0, limit))
    } else {
        res.status(200).json(cases)
    }

});

app.listen(port, () => console.log(`Server is running on port ${port}`));


//Post a new case
app.post('/api/cases', (req, res) => {
    
});

//Get a case by id
app.get('/api/cases/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const post = cases.find((post) => post.id === id);

    if (!post) {
        res.status(404).json({ msg: `A case with the id of ${id} was not found`});
    } else {
        res.status(200).json({post});
    }

});

//Update a case
app.patch('/api/cases/:id/status', (req, res) => {
    
});