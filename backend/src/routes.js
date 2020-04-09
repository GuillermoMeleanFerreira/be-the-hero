const express = require('express');

const OngController = require('./controllers/OngController');
const IncidentController = require('./controllers/IncidentController');
const ProfileController = require('./controllers/ProfileController');
const SessionController = require('./controllers/SessionController');

const routes = express.Router();

//routes.post('/sessions',SessionController.create);
routes.post('/sessions', SessionController.index);
 
routes.get('/ongs', OngController.index)
routes.post('/ongs', OngController.create)

routes.post('/incidents', IncidentController.create);
routes.get('/incidents', IncidentController.index);
routes.delete('/incidents/:id', IncidentController.delete);

routes.get('/profile', ProfileController.index);

/**
 * Para deixar estas routes disponiveis para que o index.js possa acessá-las.
 * Exportar variáveis de dentro de um ficheiro.
 */
module.exports = routes; 