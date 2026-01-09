const express = require('express');
const app = express();
const PORT = 3000;


const { Client } = require('pg');


const connectionString = 'postgresql://postgres:5qRM6c0aiYWwOsZ8@db.xsykxfkehlbnlcpidncu.supabase.co:5432/postgres';

const client = new Client({
  connectionString: connectionString
});

client.connect()
  .then(() => console.log('Conectado a PostgreSQL'))
  .catch(err => console.error('Error de conexión:', err));
 

// Middleware para parsear JSON
app.use(express.json());

// Ruta de prueba
app.get('/', (req, res) => {
  res.send('¡Hola, API en Express funcionando!');
});

// Ruta para obtener todas las cobranzas    
app.get('/cobranzas', async (req, res) => {
  try {
    const result = await client.query('SELECT * FROM Cobranzas');
    res.json(result.rows); // result.rows contiene los registros
  } catch (err) {
    console.error(err);
    res.status(500).send('Error al obtener cobranzas');
  }
});


app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});

