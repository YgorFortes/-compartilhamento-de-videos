/* eslint-disable import/no-extraneous-dependencies */
import {describe , expect, it, afterEach, beforeEach} from '@jest/globals';
import Sinon from 'sinon';
import { UserService } from '../../../src/modules/users/services/UserService.js';
import { CustomError } from '../../../src/modules/app/erros/CustomError.js';


describe('Testando método create do UserService',  ()=>{
  let userRepositoryMock;
  let utilsUserMock;
  let userService;
  let userServiceMock;
  beforeEach(()=>{
    userService = new UserService();
    userRepositoryMock = Sinon.mock(userService.userRepository);
    userServiceMock =Sinon.mock(userService);
    utilsUserMock = Sinon.mock(userService.utilsUser);
  });

  afterEach(() => {
    userRepositoryMock.restore();
    utilsUserMock.restore();
  });

  it('Deve retornar um usuáro junto com um token e senhaHash', async ()=>{
    const elementBody = {
      login: 'meunovoLogin',
      email: 'meuemail@gmail.com',
      senha: 'minhanovasenhashow'
    };

    const userExpeted = {
      id: '4e65643e-bc03-4ca7-b87b-53f10d9dc088',
      login: elementBody.login,
      email: elementBody.email,
    };

    const expectToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjEyMzQ1Njc4OTAiLCJpYXQiOjE1MTYyMzkwMjJ9.Y4rwScILgHeZNmE4cWtTX524mg55VZEn10awsxDHpNo';

    userServiceMock.expects('findByEmailOrLogin').withExactArgs(elementBody.login, elementBody.email).resolves(null);

    userRepositoryMock.expects('create').withExactArgs({login: elementBody.login, email: elementBody.email, senha: Sinon.match.string}).resolves(userExpeted);

    utilsUserMock.expects('createToken').withExactArgs(userExpeted.id).resolves(expectToken);

    const {usuario, token} = await userService.create(elementBody);

    userServiceMock.verify();
    utilsUserMock.verify();
    userRepositoryMock.verify();

    expect(usuario).toEqual(userExpeted);
    expect(token).toEqual(expectToken);

  });

  it('Deve funcionar corretamente quando o método create quando é chamado mais de uma vez', async ()=>{
    const elementBody = {
      login: 'meunovoLogin',
      email: 'meuemail@gmail.com',
      senha: 'minhanovasenhashow'
    };

    const userExpeted = {
      id: '4e65643e-bc03-4ca7-b87b-53f10d9dc088',
      login: elementBody.login,
      email: elementBody.email,
    };

    const expectToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjEyMzQ1Njc4OTAiLCJpYXQiOjE1MTYyMzkwMjJ9.Y4rwScILgHeZNmE4cWtTX524mg55VZEn10awsxDHpNo';

    userServiceMock.expects('findByEmailOrLogin').withExactArgs(elementBody.login, elementBody.email).resolves(null).twice();

    userRepositoryMock.expects('create').withExactArgs({login: elementBody.login, email: elementBody.email, senha: Sinon.match.string}).resolves(userExpeted).twice();

    utilsUserMock.expects('createToken').withExactArgs(userExpeted.id).resolves(expectToken).twice();

    const {usuario, token} = await userService.create(elementBody);

    const newUser2 = await userService.create(elementBody);

    userServiceMock.verify();
    utilsUserMock.verify();
    userRepositoryMock.verify();

    expect(usuario).toEqual(userExpeted);
    expect(token).toEqual(expectToken);
    expect(newUser2.usuario).toEqual(userExpeted);
    expect(newUser2.token).toEqual(expectToken);

  });

  it('Deve executar em um tempo aceitável', async ()=>{
    const elementBody = {
      login: 'meunovoLogin',
      email: 'meuemail@gmail.com',
      senha: 'minhanovasenhashow'
    };

    const userExpeted = {
      id: '4e65643e-bc03-4ca7-b87b-53f10d9dc088',
      login: elementBody.login,
      email: elementBody.email,
    };

    const expectToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjEyMzQ1Njc4OTAiLCJpYXQiOjE1MTYyMzkwMjJ9.Y4rwScILgHeZNmE4cWtTX524mg55VZEn10awsxDHpNo';

    userServiceMock.expects('findByEmailOrLogin').withExactArgs(elementBody.login, elementBody.email).resolves(null);

    userRepositoryMock.expects('create').withExactArgs({login: elementBody.login, email: elementBody.email, senha: Sinon.match.string}).resolves(userExpeted);

    utilsUserMock.expects('createToken').withExactArgs(userExpeted.id).resolves(expectToken);

    const startTime = new Date();

    const {usuario, token} = await userService.create(elementBody);

    const endTime = new Date();

    userServiceMock.verify();
    utilsUserMock.verify();
    userRepositoryMock.verify();

    expect(usuario).toEqual(userExpeted);
    expect(token).toEqual(expectToken);
    expect(endTime - startTime ).toBeLessThan(1000);
  });

  it('Deve lançar um erro quando login ou email já existe', async()=>{

    const elementBody = {
      login: 'meunovoLogin',
      email: 'meuemail@gmail.com',
      senha: 'minhanovasenhashow'
    };

    const userData = { login: 'meunovoLogin', email: 'meuemail@gmail.com', senha: 'minhanovasenhashow' };

    userServiceMock.expects('findByEmailOrLogin').withExactArgs(elementBody.login, elementBody.email).resolves(userData);

    await expect(userService.create(userData)).rejects.toThrow('Email ou login já cadastrado.');
  });

});

describe('Testando método update de userService', ()=>{
  let userRepositoryMock;
  let utilsUserMock;
  let userService;
  let userServiceMock;
  beforeEach(()=>{
    userService = new UserService();
    userRepositoryMock = Sinon.mock(userService.userRepository);
    userServiceMock =Sinon.mock(userService);
    utilsUserMock = Sinon.mock(userService.utilsUser);
  });

  afterEach(() => {
    userRepositoryMock.restore();
    userServiceMock.restore();
    utilsUserMock.restore();
  });

  it('Deve atualizar as informações do usuário com sucesso', async()=>{
    const idUser = '7feaf659-336b-49c8-b0b9-122520c02310';
    const elementBody = {
      login: 'meunovologin',
      email: 'meunovoemail@gmail.com',
      senha: 'minhanovasenhamaneirashowshow'
    };

    const expectUser = {
      id: '7feaf659-336b-49c8-b0b9-122520c02310',
      login: 'meuloginantigo',
      email: 'meuemailantigo@gmail.com',
      senha: 'minhasenhamuitofraca'
    };

    const passwordHash = '$2b$12$EgLryZuTLanwLwHdwblhue9szFBnClxEO2X.D7vovwhgZrBEKCGYm';

    const expectNewInfoUser = {
      id: '7feaf659-336b-49c8-b0b9-122520c02310',
      login: elementBody.login,
      email: elementBody.email,
      senha: passwordHash
    };
   

    userRepositoryMock.expects('findOne').withExactArgs(idUser).resolves(expectUser);

    utilsUserMock.expects('createHashPassword').withExactArgs(elementBody.senha).resolves(passwordHash);

    userServiceMock.expects('checkUniqueEmailOrLogin').withExactArgs(idUser, elementBody.email, elementBody.login).resolves(0);

    userRepositoryMock.expects('update').withExactArgs({login: elementBody.login, email: elementBody.email, senha: passwordHash}, idUser).resolves(expectNewInfoUser);

    const newInfoUser = await userService.update(elementBody, idUser);
    
    expect(newInfoUser).toEqual(expectNewInfoUser);
    expect(newInfoUser.senha).not.toBe(elementBody.senha);


    userServiceMock.verify();
    utilsUserMock.verify();
    userRepositoryMock.verify();
  });

  it('Deve atualizar as informações do usuário sem alterar a senha', async()=>{
    const idUser = '7feaf659-336b-49c8-b0b9-122520c02310';
    const elementBody = {
      login: 'meunovologin',
      email: 'meunovoemail@gmail.com',

    };

    const expectUser = {
      id: '7feaf659-336b-49c8-b0b9-122520c02310',
      login: 'meuloginantigo',
      email: 'meuemailantigo@gmail.com',
      senha: '$2b$12$EgLryZuTLanwLwHdwblhue9szFBnClxEO2X.D7vovwhgZrBEKCGYm'
    };

   

    const expectNewInfoUser = {
      id: '7feaf659-336b-49c8-b0b9-122520c02310',
      login: elementBody.login,
      email: elementBody.email,
      senha: expectUser.senha
    };
   

    userRepositoryMock.expects('findOne').withExactArgs(idUser).resolves(expectUser);

   

    userServiceMock.expects('checkUniqueEmailOrLogin').withExactArgs(idUser, elementBody.email, elementBody.login).resolves(0);

    userRepositoryMock.expects('update').withExactArgs({login: elementBody.login, email: elementBody.email, senha: undefined}, idUser).resolves(expectNewInfoUser);

    const newInfoUser = await userService.update(elementBody, idUser);
    
    expect(newInfoUser).toEqual(expectNewInfoUser);
    expect(newInfoUser.senha).toEqual(expectUser.senha);

    userServiceMock.verify();
    utilsUserMock.verify();
    userRepositoryMock.verify();
  });

  it('Deve atualizar as informações do usuário sem alterar o  email', async()=>{
    const idUser = '7feaf659-336b-49c8-b0b9-122520c02310';
    const elementBody = {
      login: 'meunovologin',
      senha: 'minhanovasenhamaneirashowshow'
    };

    const expectUser = {
      id: '7feaf659-336b-49c8-b0b9-122520c02310',
      login: 'meuloginantigo',
      email: 'meuemailantigo@gmail.com',
      senha: '$$2b$12$vt0qqA1oNvN8mq753g.17uJwSg7cWN5xf7nlai9d.Kq.FrcFjtygS'
    };

   
    const passwordHash = '$2b$12$EgLryZuTLanwLwHdwblhue9szFBnClxEO2X.D7vovwhgZrBEKCGYm';

    const expectNewInfoUser = {
      id: '7feaf659-336b-49c8-b0b9-122520c02310',
      login: elementBody.login,
      email: expectUser.email,
      senha: passwordHash
    };
   

    userRepositoryMock.expects('findOne').withExactArgs(idUser).resolves(expectUser);

    utilsUserMock.expects('createHashPassword').withExactArgs(elementBody.senha).resolves(passwordHash);

    userServiceMock.expects('checkUniqueEmailOrLogin').withExactArgs(idUser, elementBody.email, elementBody.login).resolves(0);

    userRepositoryMock.expects('update').withExactArgs({...elementBody, senha: passwordHash}, idUser).resolves(expectNewInfoUser);

    const newInfoUser = await userService.update(elementBody, idUser);

    expect(newInfoUser).toEqual(expectNewInfoUser);
    expect(newInfoUser.email).toEqual(expectUser.email);

    userServiceMock.verify();
    utilsUserMock.verify();
    userRepositoryMock.verify();
  });

  it('Deve atualizar as informações do usuário sem alterar o  login', async()=>{
    const idUser = '7feaf659-336b-49c8-b0b9-122520c02310';
    const elementBody = {
      email: 'meunovoemail@gmail.com',
      senha: 'minhanovasenhamaneirashowshow'
    };

    const expectUser = {
      id: '7feaf659-336b-49c8-b0b9-122520c02310',
      login: 'meuloginantigo',
      email: 'meuemailantigo@gmail.com',
      senha: '$$2b$12$vt0qqA1oNvN8mq753g.17uJwSg7cWN5xf7nlai9d.Kq.FrcFjtygS'
    };

   
    const passwordHash = '$2b$12$EgLryZuTLanwLwHdwblhue9szFBnClxEO2X.D7vovwhgZrBEKCGYm';

    const expectNewInfoUser = {
      id: '7feaf659-336b-49c8-b0b9-122520c02310',
      login: expectUser.login,
      email: elementBody.email,
      senha: passwordHash
    };
   

    userRepositoryMock.expects('findOne').withExactArgs(idUser).resolves(expectUser);

    utilsUserMock.expects('createHashPassword').withExactArgs(elementBody.senha).resolves(passwordHash);

    userServiceMock.expects('checkUniqueEmailOrLogin').withExactArgs(idUser, elementBody.email, elementBody.login).resolves(0);

    userRepositoryMock.expects('update').withExactArgs({...elementBody, senha: passwordHash}, idUser).resolves(expectNewInfoUser);

    const newInfoUser = await userService.update(elementBody, idUser);
    
    expect(newInfoUser).toEqual(expectNewInfoUser);
    expect(newInfoUser.login).toEqual(expectUser.login);

    userServiceMock.verify();
    utilsUserMock.verify();
    userRepositoryMock.verify();
  });

  it('Deve lançar um erro quando o email ou login já está em uso', async()=>{
    const idUser = '7feaf659-336b-49c8-b0b9-122520c02310';
    const elementBody = {
      login: 'meunovologin',
      email: 'meunovoemail@gmail.com',

    };
    const expectUser = {
      id: '7feaf659-336b-49c8-b0b9-122520c02310',
      login: 'meuloginantigo',
      email: 'meuemailantigo@gmail.com',
      senha: '$2b$12$EgLryZuTLanwLwHdwblhue9szFBnClxEO2X.D7vovwhgZrBEKCGYm'
    };

    const expectNewInfoUser = {
      id: '7feaf659-336b-49c8-b0b9-122520c02310',
      login: elementBody.login,
      email: elementBody.email,
      senha: expectUser.senha
    };

   

    userRepositoryMock.expects('findOne').withExactArgs(idUser).resolves(expectUser);

   


    userServiceMock.expects('checkUniqueEmailOrLogin').withExactArgs(idUser, elementBody.email, elementBody.login).rejects(new CustomError('Email ou login já cadastrado por outro usuário.', 409));
   
  

    userRepositoryMock.expects('update').withExactArgs({login: elementBody.login, email: elementBody.email, senha: undefined}, idUser).resolves(expectNewInfoUser);

    await expect(userService.update(elementBody, idUser)).rejects.toThrow('Email ou login já cadastrado por outro usuário.');
  });

  it('Deve lançar um erro se usuário não existir', async()=>{
    const idUser = '7feaf659-336b-49c8-b0b9-122520c02310';
    const elementBody = {
      login: 'meunovologin',
      email: 'meunovoemail@gmail.com',
      senha: 'minhanovasenhamaneirashowshow'
    };


    userRepositoryMock.expects('findOne').withExactArgs(idUser).resolves(null);

   

    await expect(userService.update(elementBody, idUser)).rejects.toThrow('Usuário não encontrado.');

    userRepositoryMock.verify();
  });
});

