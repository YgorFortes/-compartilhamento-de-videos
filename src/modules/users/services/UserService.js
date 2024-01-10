/* eslint-disable import/no-extraneous-dependencies */
import { CrudServiceUtils } from "../../../utils/crud/crudServiceUtils.js";
import { ValidatorSchemaUser } from '../validators/ValidatorSchemaUser.js'; 
import { UserRepository } from "../repository/UserRepository.js";
import { CustomError } from "../../app/erros/CustomError.js";
import { UtilsUser } from '../utils/UtilsUser.js';

export class UserService extends CrudServiceUtils {
  constructor(){
    super();
    this.userRepository = new UserRepository();
    this.validatorSchemaUser = new ValidatorSchemaUser();
    this.utilsUser = new UtilsUser();
  }


  async create(userData){
    const {login,email , senha} = userData;
    try {
      await this.validatorSchemaUser.create(userData);
      
      const emailOrLoginExist = await  this.utilsUser.findByEmailOrLogin(login, email);

      if(emailOrLoginExist){
        throw new CustomError('Email ou login já cadastrado.',409);
      }

      const passwordHash = await this.createHashPassword(senha);

      const newUser = await this.userRepository.create({login, email, senha: passwordHash});

      const token = await this.utilsUser.createToken(newUser.id);

      return {usuario: newUser, token};
    } catch (error) {
      CustomError.checkAndThrowError(error);
    }
  }

  
  async findByEmailOrLogin(login , email){
    if(login){
      const userByLogin = await this.userRepository.findByLogin(login);
      if(userByLogin){
        return userByLogin; 
      }
    }

    if(email){
      const userByEmail = await this.userRepository.findByEmail(email);
      if(userByEmail){
        return userByEmail; 
      }
    }
  } 
}