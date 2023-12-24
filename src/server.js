/* eslint-disable no-console */
import express from "express";
import DynamicsRoutes from "./dynamicsRoutes.js";

class Server {
  constructor (){
    this.expressInstence = express();

    this.dynamicsRoutes = new DynamicsRoutes();

    this.setRoutes();
  }

  setRoutes(){
    this.dynamicsRoutes.setupRouter();
    this.dynamicsRoutes.attachRouterToApp(this.expressInstence);
  }

  createServer(){
    const serverPort = process.env.PORT || 3000;
    this.expressInstence.listen(serverPort, ()=>{
      console.log(`Servidor funcionando na porta: http://localhost:${serverPort}/api/v1/ `);
    });
  }
}

const server = new Server();
server.createServer();