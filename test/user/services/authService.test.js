/* eslint-disable import/no-extraneous-dependencies */
import {describe , expect, it, afterEach, beforeEach} from '@jest/globals';
import Sinon from 'sinon';
import { AuthService } from '../../../src/modules/users/services/AuthService.js';

describe('Testando método login de user', ()=>{
  let authService;
  let userRepositoryMock;
  let userServiceMock;
  let utilsUserMock;

  
  beforeEach(()=>{
    authService = new AuthService();
    userRepositoryMock = Sinon.mock(authService.userRepository);
    userServiceMock = Sinon.mock(authService.userService);
    utilsUserMock = Sinon.mock(authService.utilsUser);
  });

  afterEach(()=>{
    userServiceMock.restore();
    userRepositoryMock.restore();
    utilsUserMock.restore();
  });

  it('Deve criar um token com se login e senha for digitados',async ()=>{
    

    const elementBody = {
      login: 'loginfeito',
      email: 'email@email.com',
      senha: 'minhagrandesenha'
    };

    const userExpeted = {
      id: '58e014df-82c1-47f7-8649-4683fff9780c',
      login: 'loginfeito',
      email: 'mail@email.com',
      senha: '$2a$12$6kXApGbIPR3DQ2RQYTzlh.JtYMEt4cGzZk/yTFtYkmcXANK9R9qZu'
    };

    const expectToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c';



    userServiceMock.expects('findByEmailOrLogin').withExactArgs(elementBody.login, elementBody.email).resolves(userExpeted);

    utilsUserMock.expects('createToken').withExactArgs(userExpeted.id).resolves(expectToken);
    
    const user = await authService.login(elementBody);


  
    const expectLogin = {
      mensagem: "Usuario logado com sucesso.",
      token: expectToken
    };

  
 
    userServiceMock.verify();

    utilsUserMock.verify();

    expect(user).toEqual(expectLogin);

  });

  it('Deve funcionar corretamente quando o método login quando é chamado mais de uma vez',async ()=>{
    

    const elementBody = {
      login: 'loginfeito',
      email: 'email@email.com',
      senha: 'minhagrandesenha'
    };

    const userExpeted = {
      id: '58e014df-82c1-47f7-8649-4683fff9780c',
      login: 'loginfeito',
      email: 'mail@email.com',
      senha: '$2a$12$6kXApGbIPR3DQ2RQYTzlh.JtYMEt4cGzZk/yTFtYkmcXANK9R9qZu'
    };

    const expectToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c';



    userServiceMock.expects('findByEmailOrLogin').withExactArgs(elementBody.login, elementBody.email).resolves(userExpeted).twice();

    utilsUserMock.expects('createToken').withExactArgs(userExpeted.id).resolves(expectToken).twice();
    
    const user = await authService.login(elementBody);
    const user2 = await authService.login(elementBody);

  
    const expectLogin = {
      mensagem: "Usuario logado com sucesso.",
      token: expectToken
    };

  
 
    userServiceMock.verify();

    utilsUserMock.verify();

    expect(user).toEqual(expectLogin);
    expect(user2).toEqual(expectLogin);

  });

  it('Deve executar o metodo login em um tempo aceitável',async ()=>{
    

    const elementBody = {
      login: 'loginfeito',
      email: 'email@email.com',
      senha: 'minhagrandesenha'
    };

    const userExpeted = {
      id: '58e014df-82c1-47f7-8649-4683fff9780c',
      login: 'loginfeito',
      email: 'mail@email.com',
      senha: '$2a$12$6kXApGbIPR3DQ2RQYTzlh.JtYMEt4cGzZk/yTFtYkmcXANK9R9qZu'
    };

    const expectToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c';



    userServiceMock.expects('findByEmailOrLogin').withExactArgs(elementBody.login, elementBody.email).resolves(userExpeted);

    utilsUserMock.expects('createToken').withExactArgs(userExpeted.id).resolves(expectToken);

    const startTime = new Date();
    
    const user = await authService.login(elementBody);

    const endTime = new Date();

  
    const expectLogin = {
      mensagem: "Usuario logado com sucesso.",
      token: expectToken
    };

  
 
    userServiceMock.verify();

    utilsUserMock.verify();

    expect(user).toEqual(expectLogin);
    expect(endTime - startTime ).toBeLessThan(1000);

  });

  it('Deve criar um token com se email e senha for digitados', async()=>{
    const elementBody = {
      email: 'email@email.com',
      senha: 'minhagrandesenha'
    };

    const userExpeted = {
      id: '58e014df-82c1-47f7-8649-4683fff9780c',
      email: 'mail@email.com',
      senha: '$2a$12$6kXApGbIPR3DQ2RQYTzlh.JtYMEt4cGzZk/yTFtYkmcXANK9R9qZu'
    };



    const expectToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c';



    userServiceMock.expects('findByEmailOrLogin').withExactArgs(elementBody.login, elementBody.email).resolves(userExpeted);

    utilsUserMock.expects('createToken').withExactArgs(userExpeted.id).resolves(expectToken);

    const user = await authService.login(elementBody);

  
    const expectLogin = {
      mensagem: "Usuario logado com sucesso.",
      token: expectToken
    };


    utilsUserMock.verify();

    expect(user).toEqual(expectLogin);
  });

  it('Deve verificar as hash com a senha digitada', async()=>{
    const elementBody = {
      login: 'loginfeito',
      email: 'email@email.com',
      senha: 'minhagrandesenha'
    };

    const userExpeted = {
      id: '58e014df-82c1-47f7-8649-4683fff9780c',
      email: 'mail@email.com',
      senha: '$2a$12$6kXApGbIPR3DQ2RQYTzlh.JtYMEt4cGzZk/yTFtYkmcXANK9R9qZu'
    };


    
    const passwordValid = await authService.validateLogin(userExpeted, elementBody.senha);
    
    
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

    
    await expect(authService.validateLogin(userExpeted, elementBody.senha)).rejects.toThrow("Senha incorreta. Tente novamente.");
    
  });

  it('Deve  lançar um erro caso usuario não seja encontrado por login', async()=>{
    const elementBody = {
      login: 'loginfeito',
      email: 'email@email.com',
      senha: 'minhagrandesenha'
    };

    userServiceMock.expects('findByEmailOrLogin').withExactArgs(elementBody.login, elementBody.email).resolves(null);

    
    await expect(authService.login(elementBody)).rejects.toThrow('Usuário não encontrado.');
    
    userServiceMock.verify();
  });

  it('Deve  lançar um erro caso usuario não seja encontrado por email', async()=>{
    const elementBody = {
      email: 'email@email.com',
      senha: 'minhagrandesenha'
    };

    userServiceMock.expects('findByEmailOrLogin').withExactArgs(elementBody.login, elementBody.email).resolves(null);

    await expect(authService.login(elementBody)).rejects.toThrow('Usuário não encontrado.');

    userServiceMock.verify();
  });

  

});