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


  async create(userData){
    const {login,email , senha} = userData;
    try {
      await this.validatorSchemaUser.create(userData);
      
      const emailOrLoginExist = await this.findByEmailOrLogin(login, email);

      if(emailOrLoginExist){
        throw new CustomError('Email ou login já cadastrado.',409);
      }

      const passwordHash = await this.utilsUser.createHashPassword(senha);

      const newUser = await this.userRepository.create({login, email, senha: passwordHash});

      const token = await this.utilsUser.createToken(newUser.id);

      return {usuario: newUser, token};
    } catch (error) {
      CustomError.checkAndThrowError(error);
    }
  }

  async update(useData, idUsuario){
    const {login, email, senha} = useData;
    try {
      await this.validatorSchemaUser.update(useData);

      const userExist = await this.userRepository.findOne(idUsuario);

      if(!userExist){
        throw new CustomError('Usuário não encontrado.',404);
      }

      const passwordHash = senha ? await this.utilsUser.createHashPassword(senha) : undefined;

      await this.checkUniqueEmailOrLogin(idUsuario, email, login);

      const updatedUserInfo  = this.userRepository.update({...useData, senha: passwordHash}, idUsuario);

     return updatedUserInfo;
    } catch (error) {
      CustomError.checkAndThrowError(error);
    }
  }

  async checkUniqueEmailOrLogin(idUsuario, email, login){

    try {
      const emailOrLoginCount = await this.userRepository.countAllExceptId(idUsuario, email, login);

      if(emailOrLoginCount > 0){
        throw new CustomError('Email ou login já cadastrado por outro usuário.', 409);
      }
    } catch (error) {
      CustomError.checkAndThrowError(error);
    }
    
  }

}