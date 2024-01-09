/* eslint-disable import/no-extraneous-dependencies */
import {describe , expect, it, afterEach, beforeEach} from '@jest/globals';
import Sinon from 'sinon';
import { AuthService } from '../../../src/modules/users/services/AuthService';

describe('Testando método login de user', ()=>{
  let authService;
  let userRepositoryMock;

  
  beforeEach(()=>{
    authService = new AuthService();
    userRepositoryMock = Sinon.mock(authService.userRepository);
  });

  afterEach(()=>{
    userRepositoryMock.restore();
  });

  it('Deve criar um token com se login e senha for digitados',async ()=>{
    

    const elementBody = {
      login: 'loginfeito',
      email: 'email@email.com',
      senha: 'minhasenha'
    };

    const userExpeted = {
      id: '58e014df-82c1-47f7-8649-4683fff9780c',
      login: 'loginfeito',
      email: 'mail@email.com',
      senha: '$2a$12$DUAO8fYr9WCZFVpwqCGzxODJbRPuDifsazBK8mEXxO6oQmNxpWXa2'
    };



    userRepositoryMock.expects('findByLogin').withExactArgs(elementBody.login).resolves(userExpeted);

    const user = await authService.login(elementBody);

    const expectToken = await authService.createToken(userExpeted);
  
    const expectLogin = {
      mensagem: "Usuario logado com sucesso.",
      token: expectToken
    };

  

    userRepositoryMock.verify();
 
    userRepositoryMock.verify();

    expect(user).toEqual(expectLogin);

  });

  it('Deve criar um token com se email e senha for digitados', async()=>{
    const elementBody = {
      email: 'email@email.com',
      senha: 'minhasenha'
    };

    const userExpeted = {
      id: '58e014df-82c1-47f7-8649-4683fff9780c',
      email: 'mail@email.com',
      senha: '$2a$12$DUAO8fYr9WCZFVpwqCGzxODJbRPuDifsazBK8mEXxO6oQmNxpWXa2'
    };



    userRepositoryMock.expects('findByEmail').withExactArgs(elementBody.email).resolves(userExpeted);

    const user = await authService.login(elementBody);

    const expectToken = await authService.createToken(userExpeted);
  
    const expectLogin = {
      mensagem: "Usuario logado com sucesso.",
      token: expectToken
    };

  

    userRepositoryMock.verify();
 
    userRepositoryMock.verify();

    expect(user).toEqual(expectLogin);
  });

  it('Deve verificar as hash com a senha digitada', async()=>{
    const elementBody = {
      login: 'loginfeito',
      email: 'email@email.com',
      senha: 'minhasenha'
    };

    const userExpeted = {
      id: '58e014df-82c1-47f7-8649-4683fff9780c',
      email: 'mail@email.com',
      senha: '$2a$12$Pvy5l2Q.pMGtxLHhhq6wCOYy5N8XXRsZ6YzTSYxaCB61KOwOgRqlu'
    };

    userRepositoryMock.expects('findByLogin').withExactArgs(elementBody.login).resolves(userExpeted);

    userRepositoryMock.expects('findByEmail').never();

    const user = await authService.findByEmailOrLogin(elementBody.login);
    
    const passwordValid = await authService.validateLogin(user, elementBody.senha);
  

    expect(passwordValid.mensagem).toEqual("Usuario logado com sucesso.");
  });

  it('Deve comparar a senha digitada e dar um erro', async()=>{
    const elementBody = {
      login: 'loginfeito',
      email: 'email@email.com',
      senha: 'umanovasenha'
    };

    const userExpeted = {
      id: '58e014df-82c1-47f7-8649-4683fff9780c',
      email: 'mail@email.com',
      senha: '$2a$12$Pvy5l2Q.pMGtxLHhhq6wCOYy5N8XXRsZ6YzTSYxaCB61KOwOgRqlu'
    };

    userRepositoryMock.expects('findByLogin').withExactArgs(elementBody.login).resolves(userExpeted);


    const user = await authService.findByEmailOrLogin(elementBody.login);
    

    await expect(authService.validateLogin(user, elementBody.senha)).rejects.toThrow("Senha incorreta. Tente novamente.");
 
  });

  it('Deve  lançar um erro caso usuario não seja encontrado por login', async()=>{
    const elementBody = {
      login: 'loginfeito',
      email: 'email@email.com',
      senha: 'minhasenha'
    };

    userRepositoryMock.expects('findByLogin').withExactArgs(elementBody.login).resolves(null);

    await expect(authService.login(elementBody)).rejects.toThrow('Usuário não encontrado.');

    userRepositoryMock.verify();
  });

  it('Deve  lançar um erro caso usuario não seja encontrado por email', async()=>{
    const elementBody = {
      email: 'email@email.com',
      senha: 'minhasenha'
    };

    userRepositoryMock.expects('findByEmail').withExactArgs(elementBody.email).resolves(null);

    await expect(authService.login(elementBody)).rejects.toThrow('Usuário não encontrado.');

    userRepositoryMock.verify();
  });

});