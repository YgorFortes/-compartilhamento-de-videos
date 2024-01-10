/* eslint-disable import/no-extraneous-dependencies */
import 'dotenv/config';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import {describe , expect, it,  beforeEach} from '@jest/globals';
import { UtilsUser } from '../../../src/modules/users/utils/UtilsUser.js';

describe('Testes para createToken e createHashPassword em UtilsUser', () => {
  let utilsUser;
  beforeEach(()=>{
    utilsUser = new UtilsUser();
  });


  it('Deve criar um token JWT válido', async () => {
    const userId = '1bd0deef-0020-4acf-be3c-4c4d7733a86a';
  
    const token = await utilsUser.createToken(userId);
  
    // Verifica se o token é uma string
    expect(typeof token).toBe('string');
    
    // Verifica se o token é válido
    const decoded =  jwt.verify(token, process.env.SECRET);
    expect(decoded.id).toBe(userId);
  });

  it('Deve lançar um erro quando a criação do token falha', async () => {
    const invalidUserId = null; // ou qualquer valor que faça jwt.sign lançar um erro
    
    await expect(utilsUser.createToken(invalidUserId)).rejects.toThrow('Erro ao criar o token.');
  });

  it('Deve criar um hash de senha válido', async () => {
    const senha = 'senhaTeste';
    const passwordHash = await utilsUser.createHashPassword(senha);
    
    // Verifica se o hash da senha é uma string
    expect(typeof passwordHash).toBe('string');
    
    // Verifica se o hash da senha é válido
    const isValidHash = await bcrypt.compare(senha, passwordHash);
    expect(isValidHash).toBe(true);
  });

  it('Deve lançar um erro quando a criação do hash da senha falha', async () => {
    const invalidSenha = undefined; // ou qualquer valor que faça bcrypt.hash lançar um erro
    
    await expect(utilsUser.createHashPassword(invalidSenha)).rejects.toThrow('Erro ao criar hash de senha.');
  });
});