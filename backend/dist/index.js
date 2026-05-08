"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cors_1 = __importDefault(require("cors"));
require("dotenv/config");
const express_1 = __importDefault(require("express"));
const db_js_1 = __importDefault(require("./config/db.js"));
const auth_js_1 = __importDefault(require("./routes/auth.js"));
const cases_js_1 = __importDefault(require("./routes/cases.js"));
const logger_js_1 = __importDefault(require("./middleware/logger.js"));
const error_js_1 = __importDefault(require("./middleware/error.js"));
const notFound_js_1 = __importDefault(require("./middleware/notFound.js"));
const port = process.env.PORT || 8000;
const app = (0, express_1.default)();
//CORS middleware
app.use((0, cors_1.default)({
    origin: 'http://localhost:5173',
}));
// Body parser middleware
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: false }));
// Logger middleware
app.use(logger_js_1.default);
//setup static folder
//app.use(express.static(path.join(__dirname, 'public'))); //location of the static files
app.get('/health', (req, res) => {
    res.json({ status: 'ok' });
});
// Routes
app.use('/auth', auth_js_1.default);
app.use('/api/cases', cases_js_1.default);
// Error handler
app.use(notFound_js_1.default);
app.use(error_js_1.default);
app.listen(port, () => console.log(`Server is running on port ${port}`));
// Database Test
db_js_1.default.query('SELECT NOW()')
    .then(res => console.log('DB connected:', res.rows[0].now))
    .catch(err => console.error('DB connection error:', err));
//# sourceMappingURL=index.js.map