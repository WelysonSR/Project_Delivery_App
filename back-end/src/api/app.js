const express = require('express');
require('express-async-errors');
const cors = require('cors');
const erros = require('../middleware/Error');
const loginRoutes = require('../router/user');
const salesRoutes = require('../router/sales');

const app = express();

app.use(cors());

app.use(express.json());

app.get('/coffee', (_req, res) => res.status(418).end());

app.use('/user', loginRoutes);

app.use('/sales', salesRoutes);

app.use(erros);

module.exports = app;
