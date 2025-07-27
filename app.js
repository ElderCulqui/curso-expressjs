require('dotenv').config();
const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => {
  res.send(`
        <h1>Hola, Mundo!</h1>
        <p>Esta es nuestra primera aplicación con Express.js (actualizado)</p>
        <p>Estamos aprendiendo a crear aplicaciones web con Node.js y Express.js</p>
        <p>¡Gracias por unirte a nosotros en este viaje de aprendizaje!</p>
    `);
});

app.listen(PORT, () => {
    console.log(`Servidor: http://localhost:${PORT}`);
})