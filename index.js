const express = require('express');
const cors = require('cors');
const { createClient } = require('@supabase/supabase-js');
const dotenv = require('dotenv');
const { Server } = require("socket.io");
const { createServer } = require("node:http");

const app = express();
const server = createServer(app);

const PORT = process.env.PORT || 8000;

dotenv.config();

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;

const supabase = createClient(supabaseUrl, supabaseKey);

//CORS midlewares
app.use(cors({
  origin: [
    "http://localhost:3000",
    "https://web-socket-client-nine.vercel.app",
    "capacitor://localhost",
    "http://localhost",
    "https://localhost"
  ],
  methods: ["GET", "POST"],
  credentials: true
}));

// Express midlewares
app.use(express.json());

//Webocket Midlewares
const io = new Server(server, {
  cors: {
    origin: [
      "http://localhost:3000",
      "https://web-socket-client-nine.vercel.app",
      "capacitor://localhost",
      "http://localhost",
      "https://localhost"
    ],
    methods: ["GET", "POST"],
    credentials: true
  }
});


app.get('/', (req, res) => {
  res.send('¡Hola, API en Express funcionando!');
});


// Ruta para obtener todas las cobranzas    
app.get('/api/cobranzas', async (req, res) => {

  const { data, error } = await supabase.from('cobranzas').select('*');

  if (error) {
    return res.status(500).json({ error: error.message });
  }

  res.json(data);
});

//Ruta para registrar un pago
app.post("/api/registroPago", async (req, res) => {
  const insertData = req.body;


  const { data, error } = await supabase
    .from('pagos')
    .insert([insertData])
    .select();

  if (error) {
    return res.status(500).json({ error: error.message });
  }

  //Envia un mensaje al cliente atraves del websocket
  io.emit('nuevo_pago', data[0]); //envia el nuevo pago al cliente

  res.status(201).json({ data });
});


//Websocket
io.on('connection', (socket) => {
  console.log('a user connected : ', socket.id);

  socket.on('disconnect', () => {
    console.log('a user disconnected : ', socket.id);
  });

});


server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
