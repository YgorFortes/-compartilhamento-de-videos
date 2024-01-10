import jsonwebtoken from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { CustomError } from '../../app/erros/CustomError.js';

export class UtilsUser {
  async createToken(userId){
    try {
      if(!userId){
        throw new CustomError('Erro ao criar o token.');
      }

      const payload = {id: userId};

      const secretKey = process.env.SECRET;
      const token =  jsonwebtoken.sign(payload, secretKey, { expiresIn: '8h' });

      return token;
     
    } catch (error) {
      CustomError.checkAndThrowError(error);
    }
  }

  async createHashPassword(senha){

    try {
      const salt = await bcrypt.genSalt(12);

     const passwordHash = await bcrypt.hash(senha, salt);

      return passwordHash;
    } catch (error) {
      throw new CustomError('Erro ao criar hash de senha.');
    }
    
  }

}