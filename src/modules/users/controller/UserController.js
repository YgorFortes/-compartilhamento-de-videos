import { CrudControllerUtils } from "../../../utils/crud/crudControllerUtils.js";
import { AuthService } from "../services/AuthService.js";
import { ValidatorSchemaAuth } from "../validators/ValidatorSchemaAuth.js";

export class UserController extends CrudControllerUtils {
  constructor(){
    super();
    this.authService = new AuthService();
    this.ValidatorSchemaAuth = new ValidatorSchemaAuth();
    this.setupRouter(this.login());
  }

  login (){
    this.router.post('/login', async (req, res, next)=>{
      try {
        const userValidated = await this.ValidatorSchemaAuth.login(req.body);
        
        const userToken = await this.authService.login(userValidated);
        return res.status(200).send(userToken);
      } catch (error) {
        next(error);
      }
    });


  }
  
  
}