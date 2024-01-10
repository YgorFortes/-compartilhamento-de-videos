import { CrudControllerUtils } from "../../../utils/crud/crudControllerUtils.js";
import { AuthService } from "../services/AuthService.js";
import { ValidatorSchemaAuth } from "../validators/ValidatorSchemaAuth.js";
import { ValidatorSchemaUser } from "../validators/ValidatorSchemaUser.js";
import { UserService } from "../services/UserService.js";

export class UserController extends CrudControllerUtils {
  constructor(){
    super();
    this.authService = new AuthService();
    this.userService = new UserService();
    this.validatorSchemaAuth = new ValidatorSchemaAuth();
    this.validatorSchemaUser = new ValidatorSchemaUser();
    this.setupRouter(this.login());
  }

  login (){
    this.router.post('/login', async (req, res, next)=>{
      try {
        const userValidated = await this.validatorSchemaAuth.login(req.body);
        
        const userToken = await this.authService.login(userValidated);
        return res.status(200).send(userToken);
      } catch (error) {
        next(error);
      }
    });


  }

  create () {
     this.router.post('/cadastrar', async(req, res, next)=>{

      try {
        const userDataValidate = await this.validatorSchemaUser.create(req.body);
        
        const newUser = await this.userService.create(userDataValidate);
        return res.status(200).send(newUser);
      } catch (error) {
        next(error);
      }

     });

  }
}
