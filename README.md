# API de compartilhamento de vídeos

![Badge em Desenvolvimento](http://img.shields.io/static/v1?label=STATUS&message=EM%20DESENVOLVIMENTO&color=GREEN)

## Resumo do projeto

Projeto de API REST 
A plataforma deve permitir ao usuário montar playlists com links para seus vídeos preferidos, separados por categorias.


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

  

* Os recursos da API poderão ser acessados a partir da *base URL* `http://localhost:3000/api/v1/`.

  > Esta API está programada para ser acessada a partir de `http://localhost:3000/api/v1/`. Certifique-se de que não existem outros recursos ocupando a porta `3000` antes de subir o projeto.


### Endpoints

A API expõe os seguintes *endpoints* a partir da *base URL* `http://localhost:3000/api/v1/`:

`/videos`
* `GET /videos`

