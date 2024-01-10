/* eslint-disable import/no-extraneous-dependencies */
import {describe , expect, it,  beforeEach} from '@jest/globals';

import { ValidatorSchemaUser } from '../../../src/modules/users/validators/ValidatorSchemaUser'; 

describe('Testando o método login de ValidatorSchemaAuth', ()=>{
  let validatorSchemaUser;

  beforeEach(()=>{
    validatorSchemaUser = new ValidatorSchemaUser();
  });

  it('Deve validar corretamente o login', async()=>{
    const elementBody = {
      email: 'usuario@exemplo.com',
      login: 'usuario',
      senha: 'senhaSegura123'
    };

    const result = await validatorSchemaUser.create(elementBody);
    expect(result).toBeTruthy();
  });

  it('Deve ser obrigatório os campos email, login e senha', async()=>{
    const elementBody = {
      login: 'usuario',
      senha: 'senhaSegura123'
    };

    const elementBody2 = {
      email: 'usuario@exemplo.com',
      senha: 'senhaSegura123'
    };

    const elementBody3 = {
      email: 'usuario@exemplo.com',
      login: 'usuario',
    };

    
    await expect(validatorSchemaUser.create(elementBody)).rejects.toThrow('O campo email é obrigatório.');
    await expect(validatorSchemaUser.create(elementBody2)).rejects.toThrow('O campo login é obrigatório.');
    await expect(validatorSchemaUser.create(elementBody3)).rejects.toThrow('O campo senha é obrigatório.');
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

    await expect(validatorSchemaUser.create(elementBody)).rejects.toThrow('O  campo senha deve ter pelo menos 14 caracteres.');
    await expect(validatorSchemaUser.create(elementBody2)).rejects.toThrow('O campo senha dever ter no máximo 50 caracteres.');
  });

  it('Deve ser um formato válido para o campo email', async()=>{
    const elementBody = {
      email: 'naoemailvalido',
      login: 'usuario',
      senha: 'senhaSegura123'
    };

    await expect(validatorSchemaUser.create(elementBody)).rejects.toThrow('O campo precisa ser um email válido.');
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

    const result = await validatorSchemaUser.create(elementBody);
 
    expect(result).toStrictEqual(expectResult);
  });
});