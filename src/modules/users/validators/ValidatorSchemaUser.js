import Yup from 'yup';

export class ValidatorSchemaUser {

  async create(useData){
    const createSchemaUser = Yup.object({
      body: Yup.object({
        login: Yup.string().trim().lowercase().required('O campo login é obrigatório.').matches(/^[^\s]+$/, 'O campo login não pode conter espaços entre os caracteres.'),
        email: Yup.string().email('O campo precisa ser um email válido.').required('O campo email é obrigatório.').trim().lowercase(),
        senha: Yup.string().trim().required('O campo senha é obrigatório.').min(14, 'O  campo senha deve ter pelo menos 14 caracteres. Dica: digite uma frase do qual se lembrará facilmente.').max(50, 'O campo senha dever ter no máximo 50 caracteres.').matches(/^[^\s]+$/, 'O campo senha não pode conter espaços entre os caracteres.')
      }).noUnknown(),
    });
    
    const result = await createSchemaUser.fields.body.validate(useData);
    return result;
  }

  async update(useData){
    const updateSchemaUser = Yup.object({
      body: Yup.object({
        login: Yup.string().trim().lowercase().matches(/^[^\s]+$/, 'O campo login não pode conter espaços entre os caracteres.'),
        email: Yup.string().email('O campo precisa ser um email válido.').trim().lowercase(),
        senha: Yup.string().trim().min(14, 'O  campo senha deve ter pelo menos 14 caracteres. Dica: digite uma frase do qual se lembrará facilmente.').max(50, 'O campo senha dever ter no máximo 50 caracteres.').matches(/^[^\s]+$/, 'O campo senha não pode conter espaços entre os caracteres.')
      }).noUnknown(),
    });
    
    const result = await updateSchemaUser.fields.body.validate(useData);
    return result;
  }

  
}