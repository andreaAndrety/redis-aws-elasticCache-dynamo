const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const awsServerlessExpressMidleware = require('aws-serverless-express/middleware');
const routesUser = require('./routes/user');
const routesRoulette = require('./routes/roullette');
const routesBet = require('./routes/bet');

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(awsServerlessExpressMidleware.eventContext());
app.use('/u', routesUser);
app.use('/r', routesRoulette);
app.use('/b', routesBet);
module.exports = app;