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

  async findVideosByCategory(videoId){
    const categorySchemaFindOne = Yup.object({
      params: Yup.object().shape({
        id: Yup.string().trim()
        .required('O parâmetro  videoId no params é obigatório.')
        .uuid('O parâmetros videoId no params deve ser UUID válido.')
      }),
    });

    const result = await categorySchemaFindOne.fields.params.validate(videoId);
    return result.id;
  }

  async create(categoryBody){
    const categorySchemaCreate = Yup.object({
      body: Yup.object().shape({
        titulo:  Yup.string().trim().lowercase()
        .required('O campo titulo é obrigatório.'),
        cor: Yup.string().trim().lowercase()
        .required('O campo cor é obrigatório.')
      })
    });

    const result = await categorySchemaCreate.fields.body.validate(categoryBody);
    return result;
  };

  async update(categoryData){
    const categorySchemaPatch = Yup.object({
      body: Yup.object().shape({
        titulo:  Yup.string().trim().lowercase(),
        cor: Yup.string().trim().lowercase()
      }).noUnknown(),
      params: Yup.object().shape({
        id: Yup.string().trim()
        .required('O parâmetros id no params é obigatório.')
        .uuid('O parâmetros elementId no params deve ser UUID válido.')
      }),
    });

    const result = await categorySchemaPatch.validate(categoryData);

    return result;
  }

  async delete(categoryParams){
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