const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const port = process.env.PORT || 3000;  // Puerto para el servidor

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
app.get('/api/sponsors', (req, res) => {
  connection.query('SELECT * FROM Sponsors', (error, results) => {
    if (error) throw error;
    res.json(results);
  });
});

app.post('/api/sponsors', (req, res) => {
  const sponsor = req.body;
  connection.query('INSERT INTO Sponsors SET ?', sponsor, (error, results) => {
    if (error) throw error;
    res.status(201).json({ id: results.insertId, ...sponsor });
  });
});

app.put('/api/sponsors/:id', (req, res) => {
  const { id } = req.params;
  const sponsor = req.body;
  connection.query('UPDATE Sponsors SET ? WHERE id = ?', [sponsor, id], (error, results) => {
    if (error) throw error;
    res.json({ id, ...sponsor });
  });
});

app.delete('/api/sponsors/:id', (req, res) => {
  const { id } = req.params;
  connection.query('DELETE FROM Sponsors WHERE id = ?', [id], (error, results) => {
    if (error) throw error;
    res.json({ id });
  });
});

// Servir archivos estáticos si están en la carpeta 'dist'
app.use(express.static(path.join(__dirname, 'dist')));

// Redirigir todas las demás rutas a la aplicación Vue
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// Iniciar el servidor
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
