import 'dotenv/config';
import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import AppError from './utils/AppError.js';
import pool from './config/db.js';
import authRouter from './routes/auth';
import cases from './routes/cases.js';
import logger from './middleware/logger.js'
import errorHandler from './middleware/error.js';
import notFound from './middleware/notFound.js';
const port = process.env.PORT || 8000;

// Get the directory name
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// Body parser middleware
app.use(express.json());
app.use(express.urlencoded({extended: false}));

// Logger middleware
app.use(logger);

//setup static folder
//app.use(express.static(path.join(__dirname, 'public'))); //location of the static files
app.get('/health', (req, res) => {
    res.json({ status: 'ok' });
  });
// Routes
app.use('/auth', authRouter);
app.use('/api/cases', cases);

// Error handler
app.use(notFound);
app.use(errorHandler);


app.listen(port, () => console.log(`Server is running on port ${port}`));

// Database Test

pool.query('SELECT NOW()')
    .then(res => console.log('DB connected:', res.rows[0].now))
    .catch(err => console.error('DB connection error:', err));