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
}