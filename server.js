const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const { Pool } = require('pg');

dotenv.config();

const pool = new Pool({
    user: 'user_management_42qd_user',
    host: 'dpg-cs2jb3btq21c73fgakkg-a.oregon-postgres.render.com', 
    database: 'user_management_42qd',
    password: 'W7ywDjtJeRXXIlGaId7dGPglhviLAlBp',
    port: 5432,
    ssl: {
        rejectUnauthorized: false,
    },
});

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Initialize database
const initialiseDb = async () => {
    console.log('Initialising database');
    const query = `
    CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        surname VARCHAR(50),
        firstname VARCHAR(50),
        title VARCHAR(50),
        salary VARCHAR(50),
        department VARCHAR(50)
    );
    `;

    try {
        await pool.query(query);
        console.log('Table "users" created or already exists.');
    } catch (error) {
        console.log('Error creating table:', error);
    }
};

// Start server
const startServer = async () => {
    try {
        await initialiseDb();
        app.listen(port, () => {
            console.log(`Server is running on http://localhost:${port}`);
        });
    } catch (error) {
        console.log('Error starting server:', error);
    }
};

startServer();

// Get ALL users
app.get('/api/users', async (req, res) => {
    const result = await pool.query('SELECT * FROM users');
    res.json(result.rows);
});

// Create new user
app.post('/api/users', async (req, res) => { 
    const { surname, firstname, title, salary, department } = req.body;   
    const result = await pool.query(
        'INSERT INTO users (surname, firstname, title, salary, department) VALUES ($1, $2, $3, $4, $5) RETURNING *',
        [surname, firstname, title, salary, department]
    );
    res.status(201).json(result.rows[0]);
});

// Update user
app.put('/api/users/:id', async (req, res) => {
    const { id } = req.params;
    const { surname, firstname, title, salary, department } = req.body;
    const result = await pool.query(
        'UPDATE users SET surname = $1, firstname = $2, title = $3, salary = $4, department = $5 WHERE id = $6 RETURNING *', 
        [surname, firstname, title, salary, department, id]
    );
    res.json(result.rows[0]);
});

// Delete user
app.delete('/api/users/:id', async (req, res) => {
    const { id } = req.params;
    await pool.query('DELETE FROM users WHERE id = $1', [id]);
    res.sendStatus(204);
});
