/* eslint-disable no-console */
import express from "express";
import DynamicsRoutes from "./dynamicsRoutes.js";

class Server {
  constructor (){
    this.expressInstence = express();

    this.dynamicsRoutes = new DynamicsRoutes();
    this.server = null;
    this.setRoutes();
  }

  setRoutes(){
    this.dynamicsRoutes.setupRouter();
    this.dynamicsRoutes.attachRouterToApp(this.expressInstence);
  }
  
  createServer(){
    const serverPort = process.env.PORT || 3001;
    this.server=  this.expressInstence.listen(serverPort, ()=>{
      console.log(`Servidor funcionando na porta: http://localhost:${serverPort}/api/v1/ `);
    });

    return this.server;
  }

  closeServer(){
    if (this.server) {
      this.server.close();
    }
  }
}

const server = new Server();
if(process.env.TEST_ROUTE === 'false'){
  server.createServer();
}


export default server;



