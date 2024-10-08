const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const { Pool } = require('pg');

dotenv.config();

const pool = new Pool({
    user: process.env.DB_USER || 'user_management_42qd_user',
    host: process.env.DB_HOST || 'dpg-cs2jb3btq21c73fgakkg-a',
    database: process.env.DB_NAME || 'user_management_42qd',
    password: process.env.DB_PASSWORD || 'W7ywDjtJeRXXIlGaId7dGPglhviLAlBp',
    port: 5432, // Default PostgreSQL port
  });

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json()); // For parsing application/json

//Initialise server
const initialiseDb = async () => {
    const query = `
    CREATE TABLE IN NOT EXISTS users (
    is SERIAL PRIMARY KEY,
    surname VARCHAR(50),
    firstname VARCHAR(50),
    id VARCHAR(50),
    title VARCHAR(50),
    salary VARCHAR(50),
    department VARCHAR(50)
    );
    `;

    try {
        await pool.query(query);
    } catch (error) {
        console.log(error); //Change this to a more user friendly message
    }
};

//Calling initialise function to create table
const startServer = async () => {
    try {
        await initialiseDb();
        app.listen(port, () => {
            console.log(`Server is running on http://localhost:${port}`);
        });
    } catch (error) {
        console.log(error);
    }
}

startServer();

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

//Get ALL users
app.get('/api/users', async (req, res) => {
    const result = await pool.query('SELECT * FROM users');
    res.json(result.rows);
});

//Create new user
app.post('api/users', async (req, res) => { 
    const { surname, firstname, id, title, salary, department } = req.body;   
    const result = await pool.query(
        'INSERT INTO users (surname, firstname, id, title, salary, department) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
        [surname, firstname, id, title, salary, department]
    );
    res.status(201).json(result.rows[0]);
});

//Update user
app.put('api/users/:id', async (req, res) => {
    const {id} = req.params;
    const { surname, firstname, title, salary, department } = req.body;
    const result = await pool.query('UPDATE users SET surname = $1, firstname = $2, title = $3, salary = $4, department = $5 WHERE id = $3 RETURNING *', [surname, firstname, title, salary, department, id]);
    res.json(result.rows[0]);
});

//Delete user
app.delete('api/users/:id', async (req, res) => {
    const {id} = req.params;
    await pool.query('DELETE FROM users WHERE id = $3', [id]); //Might need to change this to $1
    res.sendStatus(204);
})


// Display the users in a list/table.
// Have the ability to create users.
// Have the ability to update users.
// Have the ability to delete users.

//User info: Surname, firstmane, id, title, salary, department 