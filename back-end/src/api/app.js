const express = require('express');
require('express-async-errors');
const erros = require('../middleware/Error');
const loginRoutes = require('../router/user');
const cors = require("cors")
const app = express();

app.use(cors())

app.use(express.json());

app.get('/coffee', (_req, res) => res.status(418).end());

app.use('/login', loginRoutes);

app.use(erros);

module.exports = app;
