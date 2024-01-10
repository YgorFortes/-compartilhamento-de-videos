/* eslint-disable dot-notation */
import jsonwebtoken from 'jsonwebtoken';
import { CustomError } from "../erros/CustomError.js";

export class TokenVerificationMiddleware  {
  static checkAuthToken (req, res, next){
    const tokenHeader = req.headers['authorization'];
    const token = tokenHeader && tokenHeader.split(' ')[1];
    if(!token){
      throw new CustomError('Token não existe',401);
    }
    try {
      const secretKey = process.env.SECRET;
      jsonwebtoken.verify(token, secretKey);
    
      next();
    } catch (error) {
      throw new CustomError('Token inválido',401);
    }
  }
}