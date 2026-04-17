import 'dotenv/config';
import express from 'express';
import path from 'path';
import cases from './routes/cases.js';
import logger from './middleware/logger.js'
import errorHandler from './middleware/error.js';
import notFound from './middleware/notFound.js';
const port = process.env.PORT || 8000;

const app = express();

// Body parser middleware
app.use(express.json());
app.use(express.urlencoded({extended: false}));

// Logger middleware
app.use(logger);

//setup static folder
//app.use(express.static(path.join(__dirname, 'public'))); //location of the static files

// Routes
app.use('/api/cases', cases);

// Error handler
app.use(errorHandler);
app.use(notFound);

app.listen(port, () => console.log(`Server is running on port ${port}`));