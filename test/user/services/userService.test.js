/* eslint-disable import/no-extraneous-dependencies */
import {describe , expect, it, afterEach, beforeEach} from '@jest/globals';
import Sinon from 'sinon';
import { UserService } from '../../../src/modules/users/services/UserService.js';


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

