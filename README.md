# Conversor de Moedas

## Visão Geral
O Conversor de Moedas é um aplicativo Node.js que permite aos usuários converter valores monetários de uma moeda para outra com base nas taxas de câmbio fornecidas por uma API externa. O aplicativo fornece uma interface web simples onde os usuários podem inserir a moeda base e ver as taxas de câmbio correspondentes.

## Tecnologias Utilizadas
Node.js: Plataforma de execução JavaScript.
Express: Framework web para criação de APIs.
Dotenv: Para gerenciamento de variáveis de ambiente.
HTML/CSS: Para a interface de usuário.

## Pré-requisitos
Antes de executar o aplicativo, é necessário ter as seguintes configurações:

Node.js instalado na máquina.
Conta/API Key de acesso à API de taxas de câmbio (por exemplo, Open Exchange Rates).
Arquivo .env contendo a variável de ambiente API_KEY com a chave de acesso à API.

## Instalação
Clone o repositório do projeto.
Execute npm install para instalar as dependências.

## Configuração
Dentro do arquivo .env, defina a variável API_KEY com sua chave de acesso à API de taxas de câmbio.

## Uso
Inicie o aplicativo executando npm start.
Abra um navegador e acesse http://localhost:3000 (ou a porta definida em .env) para acessar a interface do conversor de moedas.
Insira a moeda base e clique em "Converter" para ver as taxas de câmbio correspondentes.

## Estrutura do Projeto
index.js: Arquivo principal que configura e inicia o servidor web.
exchangeRateService.js: Módulo que lida com a obtenção de taxas de câmbio da API externa.
httpServer.js: Módulo que define as rotas e lógica de manipulação HTTP.
public/: Diretório contendo recursos estáticos, como arquivos HTML e CSS.

## Autor
Héricles Silva
