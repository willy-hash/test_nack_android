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
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false }
});


client.connect()
  .then(() => console.log('Conectado a PostgreSQL'))
  .catch(err => console.error('Error de conexión:', err));
 

app.get('/', (req, res) => {
  res.send('¡Hola, API en Express funcionando!');
});

// Ruta para obtener todas las cobranzas    
app.get("/cobranzas", async (req, res) => {
  try {
    const result = await client.query("SELECT * FROM cobranzas");
    res.status(200).json(result.rows);
  } catch (err) {
    console.error("ERROR DB:", err);
    res.status(500).json({ error: "DB error" });
  }
});



app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});


