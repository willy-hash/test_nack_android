const express = require('express');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 3000;
//const { Pool } = require('pg');
const postgres = require('postgres');


// Middleware
app.use(cors());
app.use(express.json());


const connectionString = "postgresql://postgres:5qRM6c0aiYWwOsZ8@db.xsykxfkehlbnlcpidncu.supabase.co:5432/postgres"
const sql = postgres(connectionString, {
  ssl: 'require'
});





app.get('/', (req, res) => {
    res.send('¡Hola, API en Express funcionando!');
});

// Ruta para obtener todas las cobranzas    
app.get("/cobranzas", async (req, res) => {
    try {
        const result = await sql`SELECT * FROM cobranzas`;
        res.status(200).json(result);
    } catch (err) {
        console.error("ERROR DB:", err);
        res.status(500).json({ error: "DB error" });
    }
});

app.get("/test-db", async (req, res) => {
    try {
        const r = await sql`SELECT 1`;
        res.json({ ok: true });
    } catch (e) {
        console.error(e);
        res.status(500).json({ ok: false });
    }
});


console.log("DB:", process.env.URL_DATABASE);


app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});


