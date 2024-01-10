/* eslint-disable import/no-extraneous-dependencies */
import bcrypt from 'bcrypt';
import { CrudServiceUtils } from "../../../utils/crud/crudServiceUtils.js";
import { ValidatorSchemaAuth } from "../validators/ValidatorSchemaAuth.js";
import { UserRepository } from "../repository/UserRepository.js";
import { CustomError } from "../../app/erros/CustomError.js";
import { UserService } from './UserService.js';
import { UtilsUser } from '../utils/UtilsUser.js';

export class AuthService extends CrudServiceUtils {
  constructor(){
    super();
    this.userRepository = new UserRepository();
    this.userService = new UserService();
    this.validatorSchemaAuth = new ValidatorSchemaAuth();
    this.utilsUser = new UtilsUser();
  }

  async login (userData){
    const {login,email , senha} = userData;
    try {
      await this.validatorSchemaAuth.login(userData);
      
      const user = await this.userService.findByEmailOrLogin(login, email);

      if(!user){
        throw new CustomError('Usuário não encontrado.', 404);
      }
      
      const authenticationResult = await this.validateLogin(user, senha);

      return authenticationResult;
    } catch (error) {
      CustomError.checkAndThrowError(error);
    }
  }


  async validateLogin(user, senha){
    const checkPassword = await bcrypt.compare(senha, user.senha);

    if(!checkPassword){
      throw new CustomError('Senha incorreta. Tente novamente.', 401);
    }

    const token = await this.utilsUser.createToken(user.id);
    return {mensagem: 'Usuario logado com sucesso.', token};
  }

  
}