export class CustomError extends Error {
  constructor(message = 'Erro interno no servidor', statusCode = 500){
    super(message);
    this.message = message;
    this.statusCode = statusCode;
  }
}