const express = require('express');
const app = express();
app.use(express.json());

const errorMiddleware = require('./middlewares/errors');

//import all routes
const products = require('./routes/product');
const auth = require('./routes/auth');

app.use('/api/v1', products)
app.use('/api/v1', auth)


//middle ware to handle errors
app.use(errorMiddleware);


module.exports = app