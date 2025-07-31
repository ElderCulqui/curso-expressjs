require('dotenv').config();
const { error } = require('console');
const express = require('express');
const { validateUser } = require('./utils/validation');
const fs = require('fs');
const path = require('path');
const usersFilePath = path.join(__dirname, 'users.json');

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

// app.get('/users/:id', (req, res) => {
//     const userId = req.params.id;
//     res.send(`Mostrar información del usuario con ID: ${userId}`);
// })

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

app.get('/users', (req, res) => {
    fs.readFile(usersFilePath, 'utf-8', (err, data) => {
        if (err) {
            return res.status(500).json({error: 'Error con conexión de datos.'});
        }
        const users = JSON.parse(data);
        res.json(users);
    })
})

app.post('/users', (req, res) => {
    const newUser = req.body;
    
    fs.readFile(usersFilePath, 'utf-8', (err, data) => {
        if (err) {
            return res.status(500).json({error: 'Error con conexión de datos.'})
        }

        const users = JSON.parse(data);
        newUser.id = users.length + 1;
        const validation = validateUser(newUser, users);
        if (!validation.isValid) {
            return res.status(400).json({error: validation.error});
        }
        users.push(newUser);

        fs.writeFile(usersFilePath, JSON.stringify(users, null, 2), (err) => {
            if (err) {
                return res.status(500).json({error: 'Error al guardar el usuario.'});
            }
            res.status(201).json(newUser);
        })
    })
})

app.put('/users/:id', (req, res) => {
    const userId = parseInt(req.params.id, 10);
    const updatedUser = req.body;
    
    fs.readFile(usersFilePath, 'utf-8', (err, data) => {
        if (err) {
            return res.status(500).json({error: 'Error con conexión de datos.'});
        }
        let users = JSON.parse(data);
        const existingUser = users.find(user => user.id === userId);
        // res.json(existingUser);
        const validation = validateUser(updatedUser, users, existingUser?.id);
        if (!validation.isValid) {
            return res.status(400).json({error: validation.error});
        }
        users = users.map(user => {
            if (user.id === userId) {
                return {...user, ...updatedUser};
            }
            return user;
        });

        fs.writeFile(usersFilePath, JSON.stringify(users, null, 2), (err) => {
            if (err) {
                return res.status(500).json({error: 'Error al actualizar el usuario.'});
            }
            res.json({message: 'Usuario actualizado', user: updatedUser});
        })
    })
})

app.delete('/users/:id', (req, res) => {
    const userId = parseInt(req.params.id, 10);

    fs.readFile(usersFilePath, 'utf-8', (err, data) => {
        if (err) {
            return res.status(500).json({error: 'Error con conexión de datos.'});
        }
        let users = JSON.parse(data);
        users = users.filter(user => user.id !== userId);

        fs.writeFile(usersFilePath, JSON.stringify(users, null, 2), (err) => {
            if (err) {
                return res.status(500).json({error: 'Error al eliminar el usuario.'});
            }
            res.json({message: 'Usuario eliminado'});
        })
    })
})

app.listen(PORT, () => {
    console.log(`Servidor: http://localhost:${PORT}`);
})