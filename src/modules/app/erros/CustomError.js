export class CustomError extends Error {
  constructor(message = 'Erro interno no servidor', statusCode = 500){
    super(message);
    this.message = message;
    this.statusCode = statusCode;
  }

  static checkAndThrowError(error){
    if (error instanceof CustomError) {
      throw error;
    } 
    console.error(error);
    throw new Error();
  }
}