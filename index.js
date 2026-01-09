const express = require('express');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT  || 3000;
const { Pool } = require('pg');

// Middleware
app.use(cors());
app.use(express.json());


const pool = new Pool({
  connectionString: process.env.URL_DATABASE,
  ssl: { rejectUnauthorized: false }
});


app.get('/', (req, res) => {
  res.send('¡Hola, API en Express funcionando!');
});

// Ruta para obtener todas las cobranzas    
app.get("/cobranzas", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM cobranzas");
    res.status(200).json(result.rows);
  } catch (err) {
    console.error("ERROR DB:", err);
    res.status(500).json({ error: "DB error" });
  }
});

app.get("/test-db", async (req, res) => {
  try {
    const r = await pool.query("SELECT 1");
    res.json({ ok: true });
  } catch (e) {
    console.error(e);
    res.status(500).json({ ok: false });
  }
});




app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});


