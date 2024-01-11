# API de compartilhamento de vídeos

![Badge em Desenvolvimento](http://img.shields.io/static/v1?label=STATUS&message=EM%20DESENVOLVIMENTO&color=GREEN)

## Resumo do projeto

Projeto de API REST 
A plataforma deve permitir ao usuário montar playlists com links para seus vídeos preferidos, separados por categorias.

### API REST desenvolvida durante o challenge #01 de backend da Alura.

Esta API implementa as seguintes especificações:
1. Rotas no padrão REST com serviço de autenticação.
2. Validações feitas conforme as regras de negócio.
3. Base de dados para persistência das informações.
4. Serviço de autenticação com JWT para acesso às rotas GET, POST, PUT e DELETE.
5. Paginação das requisições.

## Regras de Negócio:
1. Todos os campos de vídeos e categorias devem ser obrigatórios e validados.
2. Deve existir uma categoria chamada livre e caso ela não seja especificada na criação do vídeo deve ser atribuida ou criada.
3. Endpoint "GET /videos/free" com um número fixo de videos disponível, sem a necessidade de autenticação.


## Stack utilizada

* `Node.js` v20.1.0
* `express` v4.18.2,
* `Prsma` v5.7.1
* `PostgreSQL` v16.1
* `yup` v1.3.3


## Instalação

Este projeto ainda estar em desenvolvimento, então prováveis erros podem acontecer. Contém o código necessário para subir a API em um servidor local:


### Instalação do projeto
* Baixe o repositório do projeto, navegue via terminal até a pasta e instale as dependências necessárias com `npm install`.
* Confira se a pasta `node_modules` foi criada na raiz do projeto.

## Como rodar a API

* No terminal, acesse a pasta raiz do projeto e insira o comando `npm run start` para rodar o projeto em modo de desenvolvimento. Você deverá ver no terminal a seguinte mensagem:
  ```
  > projeto-desafio@1.0.0 start
  > nodemon ./src/server.js

  [nodemon] 3.0.2
  [nodemon] to restart at any time, enter `rs`
  [nodemon] watching path(s): *.*
  [nodemon] watching extensions: js,mjs,cjs,json
  [nodemon] starting `node ./src/server.js`
  Servidor funcionando na porta: http://localhost:3000/api/v1/

  ```

**Variáveis de Ambiente:**
  - `DATABASE_URL`: URL para conexão com o banco de dados.
  - `SECRET`: Chave secreta para a aplicação.
  - `PORT`: Porta em que a aplicação irá rodar, por exemplo, 3000.

## Scripts de testes

**Teste de unitários VideoService e ValidatorSchemaVideo:**
`npm run test:video:service`
`npm run test:video:validators`

**Teste de unitários CategoryService e ValidatorSchemaCategory:**
`npm run test:category:service`
`npm run test:category:validators`

**Teste de unitários AuthService e ValidatorSchemaAuth:**
`npm run test:auth:service`
`npm run test:auth:validators`

**Teste de unitários UserService e ValidatorSchemaUser:**
`npm run test:user:service`
`npm run test:user:validators`

**Teste de unitários UtilsUser:**
`npm run test:user:utils`
`npm run test:user:validators`

**Teste de unitários UtilsUser:**
`npm run test:user:utils`
  

* Os recursos da API poderão ser acessados a partir da *base URL* `http://localhost:3000/api/v1/`.

  > Esta API está programada para ser acessada a partir de `http://localhost:3000/api/v1/`. Certifique-se de que não existem outros recursos ocupando a porta `3000` antes de subir o projeto.


### Endpoints com autorização via token

A API expõe os seguintes *endpoints* a partir da *base URL* `http://localhost:3000/api/v1/`:


`/videos`
* `GET /videos`
* `GET /videos?page=1`
* `GET /videos?titulo=nometitulo`
* `GET /videos/:id`
* `POST /videos`
* `PATCH /videos/:id`
* `DELETE /videos/:id`

`/categorias`
* `GET /categorias`
* `GET /categorias/?page=1`
* `GET /categoria?titulo=nometitulo`
* `GET /categorias/:id/videos/`
* `GET /categorias/:id`
* `POST /categorias`
* `PATCH /categorias/:id`
* `DELETE /categorias/:id`

`/usuario`
* `POST /usuario/logout`
* `PATCH /usuario/`

### Endpoints sem autorização via token
`/videos`
* `GET /videos/free`

`/usuario`
* `POST /usuario/login`
* `POST /usuario/cadastrar`
