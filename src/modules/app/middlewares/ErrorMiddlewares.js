/* eslint-disable import/no-extraneous-dependencies */

import Yup from 'yup';
import { CustomError } from '../erros/CustomError.js';

export class ErrorMiddlewares {
  handleError() {
    return (error, req, res, next) => {
      if (error instanceof Yup.ValidationError) {
        return res.status(400).json({ mensagem: error.message });
      } 
      if (error instanceof CustomError) {
        return res.status(error.statusCode || 500).json({ mensagem: error.message });
      } 
      if (error instanceof Error) {
        console.log(error);
        return res.status(500).json({ mensagem: 'Servidor com problemas! Volte mais tarde.' });
      }
      
      return next();
    };
  }

  handleError404(){
    return (req, res) =>res.status(404).json({mensagem: 'Desculpe, a página que você está procurando não foi encontrada.'});
  }


}




