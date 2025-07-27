require('dotenv').config();
const express = require('express');
// const bodyParser = require('body-parser');

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true}));

const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => {
  res.send(`
        <h1>Hola, Mundo!</h1>
        <p>Esta es nuestra primera aplicación con Express.js (actualizado)</p>
        <p>Estamos aprendiendo a crear aplicaciones web con Node.js y Express.js</p>
        <p>¡Gracias por unirte a nosotros en este viaje de aprendizaje!</p>
    `);
});

app.get('/users/:id', (req, res) => {
    const userId = req.params.id;
    res.send(`Mostrar información del usuario con ID: ${userId}`);
})

app.get('/search', (req, res) => {
    const terms = req.query.termino || 'No especificado';
    const category = req.query.categoria || 'No especificada';
    res.send(`
        <h1>Resultados de la búsqueda</h1>
        <p>Término de búsqueda: ${terms}</p>
        <p>Categoría: ${category}</p>
    `);

})

app.post('/form', (req, res) => {
    const name = req.body.nombre || 'Anónimo';
    const email = req.body.email || 'No proporcionado';

    res.json({
        message: 'Datos recibidos',
        data: {
            name,
            email
        }
    })
})

app.post('/api/data', (req, res) => {
    const data = req.body;

    if (!data || Object.keys(data).length === 0) {
        res.status(400).json({error: 'No se recibieron datos.'})
    }

    res.status(201).json({
        message: 'Datos JSON recibidos',
        data
    })
})

app.listen(PORT, () => {
    console.log(`Servidor: http://localhost:${PORT}`);
})