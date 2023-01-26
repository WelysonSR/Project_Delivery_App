const express = require('express');
require('express-async-errors');
const cors = require('cors');
const erros = require('../middleware/Error');
const loginRoutes = require('../router/user');
const salesRoutes = require('../router/sales');
const productRoutes = require('../router/product');

const app = express();

app.use(cors());

app.use(express.json());

app.use('/images', express.static('images'));

app.get('/coffee', (_req, res) => res.status(418).end());

app.use('/user', loginRoutes);

app.use('/sales', salesRoutes);

app.use('/product', productRoutes);

app.use(erros);

module.exports = app;
