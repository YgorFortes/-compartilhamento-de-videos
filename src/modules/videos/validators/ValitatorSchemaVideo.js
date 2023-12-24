import Yup from 'yup';

export class ValitatorSchemaVideo {

  // async SchemaGetForId(){
  //   Yup.object({
  //     elementId: Yup.number()
  //     .typeError('O parâmetros id de clientes na url só recebe números.')
  //     .positive('O parâmetros id de clientes na url só recebe números positivos.')
  //     .integer('O parâmetros id de clientes na url só recebe números inteiros.')
  //     .required('O parâmetros id de clientes na url é obigatório.')
  //   })
  // }

  async validateFilters (attributes){
    const videoSchemaGet = Yup.object({
      titulo: Yup.string().trim(),
      descricao: Yup.string().trim(),
      url: Yup.string().trim(),
    });
    
    const resultado =  await videoSchemaGet.validate(attributes);

    return resultado;
  }
}

