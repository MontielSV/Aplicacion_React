const express = require('express');
const cors = require("cors");
const usuariosRoutes = require('./routes/usuarios');

const app = express();
const PORT = 5001;

app.use(cors());
app.use(express.json());

// rutas
app.use('/api/usuarios', usuariosRoutes);

app.get('/', (req, res) => {
  res.json({ message: 'API de Usuarios funcionando correctamente' });
});

// iniciar servidor
app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
});
