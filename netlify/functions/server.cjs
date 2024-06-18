const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;  // Cambiado a un puerto válido para Express

app.use(cors());
app.use(bodyParser.json());

// Configuración de la conexión a MySQL
const connection = mysql.createConnection({
  host: '127.0.0.1',
  user: 'root',
  password: '1234',
  database: 'db_tesis'
});

connection.connect(error => {
  if (error) {
    console.error('Database connection failed:', error.stack);
    return;
  }
  console.log('Connected to database.');
});

// Rutas CRUD para la tabla Sponsors
app.get('/sponsors', (req, res) => {
  connection.query('SELECT * FROM Sponsors', (error, results) => {
    if (error) throw error;
    res.json(results);
  });
});

app.post('/sponsors', (req, res) => {
  const sponsor = req.body;
  connection.query('INSERT INTO Sponsors SET ?', sponsor, (error, results) => {
    if (error) throw error;
    res.status(201).json({ id: results.insertId, ...sponsor });
  });
});

app.put('/sponsors/:id', (req, res) => {
  const { id } = req.params;
  const sponsor = req.body;
  connection.query('UPDATE Sponsors SET ? WHERE id = ?', [sponsor, id], (error, results) => {
    if (error) throw error;
    res.json({ id, ...sponsor });
  });
});

app.delete('/sponsors/:id', (req, res) => {
  const { id } = req.params;
  connection.query('DELETE FROM Sponsors WHERE id = ?', [id], (error, results) => {
    if (error) throw error;
    res.json({ id });
  });
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
