const express = require('express');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || process.env.PORT || 3000;
const { Client } = require('pg');

// Middleware
app.use(cors());
app.use(express.json());


const connectionString = process.env.URL_DATABASE;

const client = new Client({
  connectionString: connectionString
});

client.connect()
  .then(() => console.log('Conectado a PostgreSQL'))
  .catch(err => console.error('Error de conexión:', err));
 

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
  console.log(`Server running on port ${PORT}`);
});


