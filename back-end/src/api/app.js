const express = require('express');
require('express-async-errors');
const erros = require('../middleware/Error');
const loginRoutes = require('../router/user');

const app = express();

app.use(express.json());

app.get('/coffee', (_req, res) => res.status(418).end());

app.use('/login', loginRoutes);

app.use(erros);

module.exports = app;
