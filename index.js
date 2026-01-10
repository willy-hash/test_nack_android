const express = require('express');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 3000;
//const { Pool } = require('pg');
//const postgres = require('postgres');
const { createClient } = require('@supabase/supabase-js');



const supabaseUrl = "https://xsykxfkehlbnlcpidncu.supabase.co";
const supabaseKey = "sb_publishable_lm-jg3DvYYOQgirmBVhYzg_h6HFLnyr";

const supabase = createClient(supabaseUrl, supabaseKey);
        

// Middleware
app.use(cors());
app.use(express.json());



// SUPABASE_URL="https://xsykxfkehlbnlcpidncu.supabase.co"
// SUPABASE_KEY="sb_publishable_lm-jg3DvYYOQgirmBVhYzg_h6HFLnyr"
        


app.get('/', (req, res) => {
    res.send('¡Hola, API en Express funcionando!');
});

// Ruta para obtener todas las cobranzas    
app.get("/cobranzas", async (req, res) => {
    try {
         const { data } = await supabase.from('Cobranzas').select('*');
         res.status(200).json(data);
    } catch (err) {
        console.error("ERROR DB:", err);
        res.status(500).json({ error: "DB error" });
    }
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});


