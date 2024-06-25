const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

app.use(cors());
app.use(bodyParser.json());

// Configuración de la conexión a MySQL
const connection = mysql.createConnection({
  host: '127.0.0.1',
  user: 'root',
  password: 'root',
  database: 'db_tesis'
});

connection.connect(error => {
  if (error) {
    console.error('Database connection failed:', error.stack);
    return;
  }
  console.log('Connected to database.');
});

// Rutas
// GET - Obtener todos los sponsors
app.get('/sponsors', (req, res) => {
  connection.query('SELECT * FROM Sponsors', (error, results) => {
    if (error) {
      console.error('Error querying sponsors:', error.stack);
      return res.status(500).json({ error: 'Database error' });
    }
    res.json(results);
  });
});

// POST - Agregar un nuevo sponsor
app.post('/sponsors', (req, res) => {
  const { company_name, manager_name, phone, district, province, company_type, logo_url, description, ruc } = req.body;
  const status = 'Pendiente'; // Estado por defecto

  const sql = 'INSERT INTO Sponsors (company_name, manager_name, phone, district, province, company_type, logo_url, description, status, ruc) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';
  const values = [company_name, manager_name, phone, district, province, company_type, logo_url, description, status, ruc];

  connection.query(sql, values, (error, results) => {
    if (error) {
      console.error('Error adding sponsor:', error.stack);
      return res.status(500).json({ error: 'Database error' });
    }
    res.status(201).json({ id: results.insertId, ...req.body, status });
  });
});


// PUT - Actualizar estado de un sponsor por ID
app.put('/sponsors/:id', (req, res) => {
  const { id } = req.params;
  const { status } = req.body;
  const sql = 'UPDATE Sponsors SET status = ? WHERE id = ?';
  const values = [status, id];

  connection.query(sql, values, (error, results) => {
    if (error) {
      console.error('Error updating sponsor status:', error.stack);
      return res.status(500).json({ error: 'Database error' });
    }
    res.json({ id, status });
  });
});

app.delete('/sponsors/:id', (req, res) => {
  const { id } = req.params;
  const sql = 'DELETE FROM Sponsors WHERE id = ?';

  connection.query(sql, [id], (error, results) => {
    if (error) {
      console.error('Error deleting sponsor:', error.stack);
      return res.status(500).json({ error: 'Database error' });
    }
    res.json({ message: 'Sponsor deleted successfully' });
  });
});

// POST - Iniciar sesión (Autenticación)
app.post('/login', (req, res) => {
  const { username, password } = req.body;
  console.log(username, password)
  // Aquí deberías verificar el usuario y contraseña en tu base de datos o sistema de autenticación
  // Puedes hacer una consulta a la base de datos o usar un sistema de autenticación como Passport.js

  // Ejemplo básico de autenticación simulada
  if (username === 'admin' && password === 'admin123') {
    res.status(200).json({ message: 'Login successful' });
  } else {
    res.status(401).json({ error: 'Credenciales incorrectas' });
  }
});



// Iniciar servidor
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
