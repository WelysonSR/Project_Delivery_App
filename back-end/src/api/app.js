const express = require('express');
require('express-async-errors');
const erros = require('../middleware/Error');

const app = express();

app.get('/coffee', (_req, res) => res.status(418).end());

app.use(erros);

module.exports = app;
