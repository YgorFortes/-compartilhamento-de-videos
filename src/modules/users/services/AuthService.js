/* eslint-disable import/no-extraneous-dependencies */
import bcrypt from 'bcrypt';
import jsonwebtoken from 'jsonwebtoken';
import { CrudServiceUtils } from "../../../utils/crud/crudServiceUtils.js";
import { ValidatorSchemaAuth } from "../validators/ValidatorSchemaAuth.js";
import { UserRepository } from "../repository/UserRepository.js";
import { CustomError } from "../../app/erros/CustomError.js";

export class AuthService extends CrudServiceUtils {
  constructor(){
    super();
    this.userRepository = new UserRepository();
    this.validatorSchemaAuth = new ValidatorSchemaAuth();
  }

  async login (UserData){
    const {login,email , senha} = UserData;
    try {
      await this.validatorSchemaAuth.login(UserData);
      
      const user = await this.findByEmailOrLogin(login, email);

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

    const token = await this.createToken(user);
    return {mensagem: 'Usuario logado com sucesso.', token};
  }

  async createToken(user){
    const payload = {id: user.id};

    const secretKey = process.env.SECRET;

    const token = jsonwebtoken.sign(payload, secretKey, { expiresIn: '8h' });

    return token;
  }

  
  async findByEmailOrLogin(login, email){
    return await login ? this.userRepository.findByLogin(login)
    : this.userRepository.findByEmail(email);
  }

  
  
}