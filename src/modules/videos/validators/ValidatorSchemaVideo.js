import Yup from 'yup';

export class ValitatorSchemaVideo {


  async findAll (videoQuery){
    const videoSchemaFindAll = Yup.object({
      query: Yup.object().shape({
        titulo: Yup.string().trim().lowercase(),
        descricao: Yup.string().trim().lowercase(),
        url: Yup.string().trim().url('A url deve ser valida'),
      })
     
    });
    
    const result =  await videoSchemaFindAll.fields.query.validate(videoQuery);
    return result;
  }

  async findOne(videoParams){
    const videoSchemaFindOne = Yup.object({
      params: Yup.object().shape({
        id: Yup.string().trim()
        .required('O parâmetros id no params é obigatório.')
        .uuid('O parâmetros elementId no params deve ser UUID válido.')
      }),
    });

    const result = await videoSchemaFindOne.fields.params.validate(videoParams);
    return result;
  }

  async create (videoData){
    const videoSchemaPost = Yup.object({
      body: Yup.object().shape({
        titulo: Yup.string().trim().required('O campo titulo é obigatório.').lowercase(),
        descricao: Yup.string().trim().required('O campo descricao é obigatório.').lowercase(),
        url: Yup.string().trim().url('O campo url deve ter um formato válido.').required('O campo url é obigatório.'),
        categoriaId: Yup.string().trim(),
      })
    });

    const result = await videoSchemaPost.fields.body.validate(videoData);
    return result;
  }

  async update(videoData){
    const videoSchemaUpdate = Yup.object({
      params: Yup.object().shape({
        id: Yup.string().trim()
        .required('O parâmetros id no params é obigatório.')
        .uuid('O parâmetros elementId no params deve ser UUID válido.')
      }),
      body: Yup.object().shape({
        titulo: Yup.string().trim().lowercase(),
        descricao: Yup.string().trim().lowercase(),
        url: Yup.string().trim().url('O campo url deve ter um formato válido.'),
        categoriaId: Yup.string().trim(),
      }).noUnknown(),
    });

    const result = await videoSchemaUpdate.validate(videoData);
    return result;
  }

  async delete(videoParams){
    const videoSchemaFindOne = Yup.object({
      params: Yup.object().shape({
        id: Yup.string().trim()
        .required('O parâmetros id no params é obigatório.')
        .uuid('O parâmetros elementId no params deve ser UUID válido.')
      }),
    });

    const result = await videoSchemaFindOne.fields.params.validate(videoParams);
    return result;
  }

}

