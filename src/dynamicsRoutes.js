import { Router , json } from "express";
import { AppController } from './modules/app/appController.js';
import { VideosController } from "./modules/videos/controller/VideosController.js";
import { ErrorMiddlewares } from "./modules/app/middlewares/ErrorMiddlewares.js";
// importe os controlers aqui

class dynamicsRoutes {
  constructor(){
    this.router = Router();
    this.json = json();
  }

  setupRouter(){
   /* instancia os controllers 
    use o this.use aqui */
    this.router.use(this.json);
    

    const appController = new AppController();
    this.router.use('/', appController.routes());



    /* Video routes */
    const videosController = new VideosController();
    this.router.use('/videos', videosController.routes());

    const errorMiddlewares = new ErrorMiddlewares();
    this.router.use(errorMiddlewares.handleError());
    this.router.use(errorMiddlewares.handleError404());
  }

  attachRouterToApp(app){
    app.use('/api/v1', this.router);
  }
  
}

export  default dynamicsRoutes;