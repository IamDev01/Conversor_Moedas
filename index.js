// index.js
const ExchangeRateService = require('./model/exchangeRateService');
const HttpServer = require('./controller/httpServer');
require('dotenv').config();

const apiKey = process.env.API_KEY; // Substitua com sua chave de API real
const port = process.env.PORT || 3000;

const exchangeRateService = new ExchangeRateService(apiKey);
const httpServer = new HttpServer(port, exchangeRateService);

httpServer.start();
