/* eslint-disable import/no-extraneous-dependencies */
import { describe, expect, it, afterAll, beforeAll } from '@jest/globals';
import request from 'supertest';
import server from '../../src/server.js';


beforeAll(() => {
  server.createServer(); // Crie o servidor uma vez antes de todos os testes
});

afterAll(() => {
  server.closeServer(); // Feche o servidor após todos os testes
});

describe('GET /videos', () => {
  it('Deve retornar todas as categorias', async () => {
    const resposta = await request('http://localhost:3000/api/v1/').get('/categorias');
   
    expect(resposta.status).toBe(200);
    expect(resposta.headers['content-type']).toContain('application/json');


    const categorias = await resposta.body;
    expect(typeof categorias).toBe('object');
    expect(categorias[0]).toHaveProperty('id','titulo', 'cor',);
    expect(categorias.length).toBeGreaterThanOrEqual(1);

  });

  it('Deve dar erro 404 ao errar o link', async()=>{
    const resposta = await request('http://localhost:3000/api/v1/').get('/catego');
   
    expect(resposta.status).toBe(404);
  });

  it('Deve voltar um array vazio quando filter não for encontrado', async()=>{
    const resposta = await request('http://localhost:3000/api/v1/').get('/categorias/?titulo=nariz');
   
    expect(resposta.status).toBe(200);
    expect(resposta.headers['content-type']).toContain('application/json');


    const videos = await resposta.body;
    expect(videos).toEqual([]);
  });

  // it('Deve retorna uma categoria conforme seu id', async()=>{
  //   const resposta = await request('http://localhost:3000/api/v1/').get('/categorias');
   
  //   expect(resposta.status).toBe(200);
  //   expect(resposta.headers['content-type']).toContain('application/json');


  //   const categorias = await resposta.body;

  //   const resposta2 = await request('http://localhost:3000/api/v1/').get(`/videos/${categorias[0].id}`);
  //   const categoria = await resposta2.body;

  //   expect(typeof categoria).toBe('object');

  // });

  // it('Deve retornar um array vazio', async()=>{
  //   const resposta = await request('http://localhost:3000/api/v1/').get(`/categorias/795f636b-0fd3-4e74-92ad-afa7a7ea1100`);
  //   const categoria = await resposta.body;

  //   expect(resposta.status).toBe(200);
  //   expect(categoria).toEqual([]);
  // });

});