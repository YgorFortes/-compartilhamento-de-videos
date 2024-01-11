import { CrudControllerUtils } from "../../../utils/crud/crudControllerUtils.js";
import { AuthService } from "../services/AuthService.js";
import { ValidatorSchemaAuth } from "../validators/ValidatorSchemaAuth.js";
import { ValidatorSchemaUser } from "../validators/ValidatorSchemaUser.js";
import { UserService } from "../services/UserService.js";
import { TokenVerificationMiddleware } from "../../app/middlewares/TokenVerificationMiddleware.js";
import { UtilsUser } from "../utils/UtilsUser.js";

export class UserController extends CrudControllerUtils {
  constructor(){
    super();
    this.authService = new AuthService();
    this.userService = new UserService();
    this.validatorSchemaAuth = new ValidatorSchemaAuth();
    this.validatorSchemaUser = new ValidatorSchemaUser();
    this.utilsUser = new UtilsUser();
    this.setupRouter(this.login(), this.logout());
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

  logout(){
    this.router.post('/logout', TokenVerificationMiddleware.checkAuthToken,  TokenVerificationMiddleware.removeToken, async(req,res, next)=>{
      try {
        return res.status(200).send({mensagem: 'Usuário deslogado.'});
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

  update(){
    this.router.patch('/', TokenVerificationMiddleware.checkAuthToken, async(req, res, next)=>{
      try {
        const userValidated = await this.validatorSchemaUser.update(req.body);

        const idUsuario = await this.utilsUser.getUserIdFromToken(req);

        const newInfoUser = await this.userService.update(userValidated, idUsuario);

        return res.status(200).send(newInfoUser);
      } catch (error) {
        next(error);
      }
    });
  }

}
