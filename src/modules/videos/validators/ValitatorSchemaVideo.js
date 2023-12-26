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

  async findAll (attributes){
    const videoSchemaFindAll = Yup.object({
      query: Yup.object().shape({
        titulo: Yup.string().trim(),
        descricao: Yup.string().trim(),
        url: Yup.string().trim().url('A url deve ser valida'),
      })
     
    });
    
    const result =  await videoSchemaFindAll.fields.query.validate(attributes);

    return result;
  }

  async findOne(atribbutes){
    const videoSchemaFindOne = Yup.object({
      params: Yup.object().shape({
        id: Yup.string().trim()
        .required('O parâmetros id no params é obigatório.')
        .uuid('O parâmetros elementId no params deve ser UUID válido.')
      }),
    });

    const result = await videoSchemaFindOne.fields.params.validate(atribbutes);
    return result;
  }

}

