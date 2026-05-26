import cors from 'cors';
import 'dotenv/config';
import express from 'express';
import pool from './config/db.js';
import authRouter from './routes/auth.js';
import cases from './routes/cases.js';
import logger from './middleware/logger.js'
import errorHandler from './middleware/error.js';
import notFound from './middleware/notFound.js';
const port = process.env.PORT || 8000;

const app = express();

//CORS middleware
app.use(cors({
  origin: 'http://localhost:5173',
}));

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

async function start() {
  try {
    const result = await pool.query('SELECT NOW()');
    console.log('DB connected:', result.rows[0].now);
  } catch (err) {
    console.error('DB connection failed:', err);
    process.exit(1);
  }

  app.listen(port, () => console.log(`Server is running on port ${port}`));
}

start();