const https = require('https');

class ExchangeRateService {
  constructor(apiKey) {
    // O construtor recebe uma chave de API e a armazena como uma propriedade da instância.
    this.apiKey = apiKey;
  }

  async getExchangeRate(baseCurrency) {
    // Este método obtém a taxa de câmbio para uma moeda base específica.

    // Constrói a URL da API com a moeda base e a chave de API.
    const apiUrl = `https://open.er-api.com/v6/latest/${baseCurrency.toUpperCase()}?apikey=${this.apiKey}`;

    // Define as opções para a solicitação HTTP.
    const options = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    };

    try {
      // Chama o método requestExchangeRate para fazer a solicitação HTTP.
      const data = await this.requestExchangeRate(apiUrl, options);
      return data; // Retorna os dados da taxa de câmbio.
    } catch (error) {
      // Em caso de erro, lança uma exceção com uma mensagem descritiva.
      throw new Error(`Ocorreu um erro ao fazer a solicitação para a API: ${error.message}`);
    }
  }

  async requestExchangeRate(apiUrl, options) {
    // Este método realiza a solicitação HTTP para a API de taxa de câmbio.

    // Retorna uma promessa que resolve ou rejeita com base no resultado da solicitação.
    return new Promise((resolve, reject) => {
      // Inicializa a solicitação HTTP usando a URL e as opções fornecidas.
      const apiReq = https.request(apiUrl, options, (apiRes) => {
        let data = ''; // Variável para armazenar os dados da resposta.

        // Evento de 'data' é acionado quando os dados da resposta são recebidos.
        apiRes.on('data', (chunk) => {
          data += chunk; // Concatena os chunks de dados.
        });

        // Evento de 'end' é acionado quando a resposta está completa.
        apiRes.on('end', () => {
          if (apiRes.statusCode === 200) {
            // Se o código de status for 200 (OK), resolve a promessa com os dados.
            resolve(data);
          } else {
            // Caso contrário, rejeita a promessa com uma mensagem de erro.
            reject(new Error(`A solicitação falhou com o código de status: ${apiRes.statusCode}`));
          }
        });
      });

      // Evento de 'error' é acionado em caso de erro na solicitação.
      apiReq.on('error', (error) => {
        // Rejeita a promessa com o erro recebido.
        reject(error);
      });

      // Finaliza a solicitação HTTP.
      apiReq.end();
    });
  }
}

module.exports = ExchangeRateService; // Exporta a classe ExchangeRateService.
