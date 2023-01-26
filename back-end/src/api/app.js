const express = require('express');
require('express-async-errors');
const cors = require('cors');
const erros = require('../middleware/Error');
const loginRoutes = require('../router/user');
const productRoutes = require('../router/products');

const app = express();

app.use(cors());

app.use(express.json());

app.use('/images', express.static('images'));

app.get('/coffee', (_req, res) => res.status(418).end());

app.use('/user', loginRoutes);

app.use('/products', productRoutes);

app.use(erros);

module.exports = app;
