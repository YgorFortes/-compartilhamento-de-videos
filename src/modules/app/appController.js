import { AppServices } from "./services/appServices.js";
import { ControllerUtils } from "../../utils/controller/ControllerUtils.js";

export class AppController extends ControllerUtils{
  constructor(){
    
   super();

   this.appService = new AppServices();
  }

  setupRouter () {
    this.appInfomation();
  };

  appInfomation () {
    this.router.get('/', (req, res)=>res.send(this.appService.responseMainRouter()));
  }
}