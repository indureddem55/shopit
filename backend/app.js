const express = require('express');
const app = express();
app.use(express.json());

const errorMiddleware = require('./middlewares/errors');

//import all routes
const products = require('./routes/product');

app.use('/api/v1', products)


//middle ware to handle errors
app.use(errorMiddleware);


module.exports = app