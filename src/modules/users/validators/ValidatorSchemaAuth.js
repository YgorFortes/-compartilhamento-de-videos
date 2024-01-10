import Yup from 'yup';

export class ValidatorSchemaAuth {

  async login (useData){
    const loginSchema = Yup.object({
      body: Yup.object({
        email: Yup.string().email('O campo precisa ser um email válido.').trim().lowercase(),
        login: Yup.string().trim().lowercase(),
        senha: Yup.string().trim().required('O campo senha é obrigatório.').min(14, 'O  campo senha deve ter pelo menos 14 caracteres.').max(50, 'O campo senha dever ter no máximo 50 caracteres.')
      }).test('emailOrLogin', 'Deve fornecer email ou login.', (body) =>Boolean(body.login || body.email)).noUnknown(),
    });

    const result = await loginSchema.fields.body.validate(useData);
    return result;
  }
 
}