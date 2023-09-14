const express = require('express');

class HttpServer {
  constructor(port, exchangeRateService) {
    // Construtor da classe HttpServer que recebe o número da porta e uma instância de ExchangeRateService.
    this.port = port; // Armazena o número da porta.
    this.exchangeRateService = exchangeRateService; // Armazena o serviço de taxa de câmbio.
  }

  start() {
    // Método start() inicia o servidor HTTP.

    const app = express(); // Cria uma instância do servidor Express.

    app.use(express.urlencoded({ extended: true })); // Configura middleware para lidar com dados de formulário.

    app.use(express.static('public')); // Configura middleware para servir arquivos estáticos a partir da pasta 'public'.

    app.post('/', async (req, res) => {
      // Define uma rota para lidar com solicitações POST na raiz ('/').

      try {
        const baseCurrency = req.body.base; // Obtém a moeda base do corpo da solicitação.
        const exchangeRateData = await this.exchangeRateService.getExchangeRate(baseCurrency); // Chama o serviço para obter dados de taxa de câmbio.
        res.setHeader('Content-Type', 'application/json'); // Define o cabeçalho da resposta como JSON.
        res.send(exchangeRateData); // Envia os dados de taxa de câmbio como resposta.
      } catch (error) {
        res.status(500).send('Erro interno do servidor'); // Em caso de erro, retorna uma resposta de erro interno.
      }
    });

    app.use((req, res) => {
      // Define um middleware de tratamento de erro para lidar com solicitações desconhecidas.

      res.status(404).send('Página não encontrada'); // Retorna uma resposta 404 para solicitações desconhecidas.
    });

    app.listen(this.port, () => {
      // Inicia o servidor na porta especificada.

      console.log(`Servidor rodando na porta ${this.port}`); // Exibe uma mensagem indicando que o servidor está rodando na porta especificada.
    });
  }
}

module.exports = HttpServer; // Exporta a classe HttpServer para uso em outros módulos.
