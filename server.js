const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const { Pool } = require('pg');

dotenv.config();

const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT || 5432,
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
    CREATE TABLE IF NOT EXISTS studentsdb (
        id SERIAL PRIMARY KEY,
        name VARCHAR(50),
        age NUMERIC(50),
        englishgrades NUMERIC(50),
        mathsgrades NUMERIC(50),
        teachercomments VARCHAR(500),
        behaviour VARCHAR(50),
        averagegrade NUMERIC(50)
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
app.get('/api/studentsdb', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM studentsdb');
        res.json(result.rows);
    } catch (error) {
        console.error('Error fetching studentsdb:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});


// Create new user
app.post('/api/studentsdb', async (req, res) => { 
    const { name, age, englishgrades, mathsgrades, teachercomments, behaviour, averagegrade } = req.body;   
    const result = await pool.query(
        'INSERT INTO studentsdb ( name, age, englishgrades, mathsgrades, teachercomments, behaviour, averagegrade ) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *',
        [ name, age, englishgrades, mathsgrades, teachercomments, behaviour, averagegrade ]
    );
    res.status(201).json(result.rows[0]);
});

// Update user
app.put('/api/studentsdb/:id', async (req, res) => {
    const { id } = req.params;
    const { name, age, englishgrades, mathsgrades, teachercomments, behaviour, averagegrade } = req.body;
    const result = await pool.query(
        'UPDATE studentsdb SET name = $1, age = $2, englishgrades = $3, mathsgrades = $4, teachercomments = $5, behaviour = $6, averagegrade = $7 WHERE id = $8 RETURNING *', 
        [name, age, englishgrades, mathsgrades, teachercomments, behaviour, averagegrade, id]
    );
    res.json(result.rows[0]);
});

// Delete user
app.delete('/api/studentsdb/:id', async (req, res) => {
    const { id } = req.params;
    await pool.query('DELETE FROM studentsdb WHERE id = $1', [id]);
    res.sendStatus(204);
});
