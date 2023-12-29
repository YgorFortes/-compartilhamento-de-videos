import Yup from 'yup';

export class ValidatorSchemaCategory{
  async findAll(categoryQuery){

    const cateogrySchemaFindAll = Yup.object({
      query: Yup.object().shape({
        titulo: Yup.string().trim().lowercase(),
        cor: Yup.string().trim().lowercase(),
      })
     
    });
    
    const result =  await cateogrySchemaFindAll.fields.query.validate(categoryQuery);
    return result;
  }

  async findOne(categoryParams){
    const categorySchemaFindOne = Yup.object({
      params: Yup.object().shape({
        id: Yup.string().trim()
        .required('O parâmetros id no params é obigatório.')
        .uuid('O parâmetros elementId no params deve ser UUID válido.')
      }),
    });

    const result = await categorySchemaFindOne.fields.params.validate(categoryParams);
    return result;
  }
}