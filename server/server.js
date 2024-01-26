const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 3001;

app.use(cors());
app.use(bodyParser.json());

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'crud_nodejs_react'
});

db.connect((err) => {
    if (err) {
        console.error('Error connection to database');
    } else {
        console.log('Connected to database');
    }
});

app.get('/api/employees', (req, res) => {
    const sql = `SELECT * FROM employees`;
    db.query(sql,(err, result) => {
        if (err) throw err;
        res.send(result);
    });
});

app.post('/api/employees', (req, res) => {
    const { name, position, salary } = req.body;
    const sql = `INSERT INTO employees (name, position, salary) VALUES (?, ?, ?)`;
    db.query(sql, [name, position, salary], (err, result) => {
        if (err) throw err;
        res.send('Employees addded successfully');
    });
});

app.put('api/employees/:id', (req, res) => {
    const id = req.params.id;
    const { name, position, salary } = req.body;
    const sql = `UPDATE employees SET name = ?, position = ?, salary = ? WHERE id = ?`;
    db.query(sql, [name, position, salary, id], (err, result) => {
        if (err) throw err;
        res.send('Employees updated successfully');
    });
});

app.delete('/api/employees/:id', (req, res) => {
    const id = req.params.id;
    const sql = `DELETE FROM employees WHEREid = ?`;
    db.query(sql, id, (err, result) =>{
        if (err) throw err;
        res.send('Employees delete successfully');
    });
});

app.listen(port, () => {
    console.log('Server is running');
});