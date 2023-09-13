// httpServer.js
const express = require('express');

class HttpServer {
  constructor(port, exchangeRateService) {
    this.port = port;
    this.exchangeRateService = exchangeRateService;
  }

  start() {
    const app = express();

    app.use(express.urlencoded({ extended: true }));
    app.use(express.static('public'));

    app.post('/', async (req, res) => {
      try {
        const baseCurrency = req.body.base;
        const exchangeRateData = await this.exchangeRateService.getExchangeRate(baseCurrency);
        res.setHeader('Content-Type', 'application/json');
        res.send(exchangeRateData);
      } catch (error) {
        res.status(500).send('Erro interno do servidor');
      }
    });

    app.get('/', (req, res) => {
      res.sendFile(__dirname + '/public/index.html');
    });

    app.use((req, res) => {
      res.status(404).send('Página não encontrada');
    });

    app.listen(this.port, () => {
      console.log(`Servidor rodando na porta ${this.port}`);
    });
  }
}

module.exports = HttpServer;
