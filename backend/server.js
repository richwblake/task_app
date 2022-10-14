// Import express and create instance
const express = require('express');
const app = express();

// Import cors
const cors = require('cors');

// server-side session and request information logging middleware
const session = require('express-session');
const logger = require('./middleware/logger');

// Port constant TODO: Move to config/.env file
const port = 3000;

// use built-in body parsing middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Trust localhost proxy as https request
// app.set('trust proxy', true);

// Configure app to use session cookies. Data is stored server-side, with session id stored on cookie
app.use(session({
    name: 'server_side_cookie',
    secret: 'secret_string',
    path: '/',
    saveUninitialized: false,
    resave: false,
    cookie: { maxAge: 60 * 60 * 1000, sameSite: 'lax' }
}));

// Use cors for all endpoints
app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
}));

// Use custom logging middleware
app.use(logger.log);

// Use routes defined in routes folder
app.use('/api/tasks', require('./routes/taskRoutes'));
app.use('/api', require('./routes/sessionRoutes'));


app.listen(port, () => {
    console.log(`Example app started on port ${port}`);
});
