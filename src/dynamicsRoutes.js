import { Router , json } from "express";
import { AppController } from './modules/app/appController.js';
import { VideosController } from "./modules/videos/controller/VideosController.js";
import { ErrorMiddlewares } from "./modules/app/middlewares/ErrorMiddlewares.js";
import { CategoryController } from "./modules/category/controller/CategoryController.js";
import { UserController } from "./modules/users/controller/UserController.js";

// import all controlers here
class dynamicsRoutes {
  constructor(){
    this.router = Router();
    this.json = json();
  }

  setupRouter(){
   /* instence controllers 
    use o this.use here */

    this.router.use(this.json);
    

    const appController = new AppController();
    this.router.use('/', appController.routes());

    /*  User routes */
    const userController = new UserController();
    this.router.use('/usuario', userController.routes());



    /* Video routes */
    const videosController = new VideosController();
    this.router.use('/videos', videosController.routes());

    /* Category routes */
    const categoryController = new CategoryController();
    this.router.use('/categorias', categoryController.routes());


    const errorMiddlewares = new ErrorMiddlewares();
    this.router.use(errorMiddlewares.handleError());
    this.router.use(errorMiddlewares.handleError404());
  }

  attachRouterToApp(app){
    app.use('/api/v1', this.router);
  }
  
}

export  default dynamicsRoutes;