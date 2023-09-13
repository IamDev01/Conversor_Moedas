// exchangeRateService.js
const https = require('https');

class ExchangeRateService {
  constructor(apiKey) {
    this.apiKey = apiKey;
  }

  async getExchangeRate(baseCurrency) {
    const apiUrl = `https://open.er-api.com/v6/latest/${baseCurrency.toUpperCase()}?apikey=${this.apiKey}`;

    const options = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    };

    try {
      const data = await new Promise((resolve, reject) => {
        const apiReq = https.request(apiUrl, options, (apiRes) => {
          let data = '';
          apiRes.on('data', (chunk) => {
            data += chunk;
          });
          apiRes.on('end', () => {
            if (apiRes.statusCode === 200) {
              resolve(data);
            } else {
              reject(new Error(`A solicitação falhou com o código de status: ${apiRes.statusCode}`));
            }
          });
        });
        apiReq.on('error', (error) => {
          reject(error);
        });
        apiReq.end();
      });
      return data;
    } catch (error) {
      throw new Error(`Ocorreu um erro ao fazer a solicitação para a API: ${error.message}`);
    }
  }
}

module.exports = ExchangeRateService;
