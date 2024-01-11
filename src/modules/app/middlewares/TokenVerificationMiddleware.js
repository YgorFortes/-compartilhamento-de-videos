/* eslint-disable dot-notation */
import jsonwebtoken from 'jsonwebtoken';
import { CustomError } from "../erros/CustomError.js";

const removedTokens = [];
export class TokenVerificationMiddleware  {
 
  static checkAuthToken (req, res, next){
    const tokenHeader = req.headers['authorization'];
    const token = tokenHeader && tokenHeader.split(' ')[1];

    if(!token){
      throw new CustomError('Token não existe',401);
    }

    TokenVerificationMiddleware.tokenExpired(token);

    try {
      
      const secretKey = process.env.SECRET;
      jsonwebtoken.verify(token, secretKey);
      next();
     
    } catch (error) {
      console.log(error);
      throw new CustomError('Token inválido',401);
    }
  }

  static removeToken(req, res, next){
    const tokenHeader = req.headers['authorization'];
    const token = tokenHeader && tokenHeader.split(' ')[1];
    removedTokens.push(token);
    next();
  }

  static tokenExpired(token){
    if(removedTokens.includes(token)){
      throw new CustomError('Token expirado',401);
    }
  }
}