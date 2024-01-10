/* eslint-disable import/no-extraneous-dependencies */
import {describe , expect, it,  beforeEach} from '@jest/globals';

import { ValidatorSchemaAuth } from '../../../src/modules/users/validators/ValidatorSchemaAuth.js';

describe('Testando o método login de ValidatorSchemaAuth', ()=>{
  let validatorSchemaAuth;

  beforeEach(()=>{
    validatorSchemaAuth = new ValidatorSchemaAuth();
  });

  it('Deve validar corretamente o login', async()=>{
    const elementBody = {
      email: 'usuario@exemplo.com',
      login: 'usuario',
      senha: 'senhaSegura123'
    };

    const result = await validatorSchemaAuth.login(elementBody);
    expect(result).toBeTruthy();
  });

  it('Deve ter campo login ou email no body', async()=>{
    const elementBody = {
      senha: 'senhaSegura123'
    };

    await expect(validatorSchemaAuth.login(elementBody)).rejects.toThrow('Deve fornecer email ou login.');
  });

  it('Deve ter o campo senha no body', async ()=>{
    const elementBody = {
      email: 'usuario@exemplo.com',
      login: 'usuario',
    };

    await expect(validatorSchemaAuth.login(elementBody)).rejects.toThrow('O campo senha é obrigatório.');
  });

  it('Deve deixar os campos login e email em minusculo e retirar os espaços em branco', async()=>{
    const elementBody = {
      email: ' USUARIO@exemplo.com ',
      login: ' USUARIO ',
      senha: 'senhaSegura123 '
    };

    const expectResult = {
      email: 'usuario@exemplo.com',
      login: 'usuario',
      senha: 'senhaSegura123'
    };

    const result = await validatorSchemaAuth.login(elementBody);
 
    expect(result).toStrictEqual(expectResult);
  });

  it('Deve ser um formato válido para o campo email', async()=>{
    const elementBody = {
      email: 'naoemailvalido',
      login: 'usuario',
      senha: 'senhaSegura123'
    };

    await expect(validatorSchemaAuth.login(elementBody)).rejects.toThrow('O campo precisa ser um email válido.');
  });

  it('Deve ter no campo senha no minimo 14 caracteres e 50 no máximo', async()=>{
    const elementBody = {
      email: 'naoemailvalido',
      login: 'usuario',
      senha: 'uma'
    };

    const elementBody2 = {
      email: 'naoemailvalido',
      login: 'usuario',
      senha: 'muitomaiorquequaluqeroutrasenhaqueeujatenhaescrivido'
    };

    await expect(validatorSchemaAuth.login(elementBody)).rejects.toThrow('O  campo senha deve ter pelo menos 14 caracteres.');
    await expect(validatorSchemaAuth.login(elementBody2)).rejects.toThrow('O campo senha dever ter no máximo 50 caracteres.');
  });


});