import Yup from 'yup';

export class ValidatorSchemaAuth {

  async login (UserData){
    const loginSchema = Yup.object({
      body: Yup.object({
        email: Yup.string().email('O campo precisa ser um email válido.').trim().lowercase(),
        login: Yup.string().trim().lowercase(),
        senha: Yup.string().required('O campo senha é obrigatório.').min(5, 'O  campo login deve ter pelo menos 5 caracteres').max(50, 'O campo login dever ter no máximo 50 caracteres')
      }).test('emailOrLogin', 'Deve fornecer email ou login', (body) =>Boolean(body.login || body.email)).noUnknown(),
    });

    const result = await loginSchema.fields.body.validate(UserData);
    return result;
  }

  
 
}