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

describe('GET /categorias', () => {
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
  

  it('Deve retorna uma categoria conforme seu id', async()=>{
    const resposta = await request('http://localhost:3000/api/v1/').get('/categorias');
   
    expect(resposta.status).toBe(200);
    expect(resposta.headers['content-type']).toContain('application/json');


    const categorias = await resposta.body;

    const resposta2 = await request('http://localhost:3000/api/v1/').get(`/videos/${categorias[0].id}`);
    const categoria = await resposta2.body;

    expect(typeof categoria).toBe('object');

  });

  it('Deve retornar um array vazio', async()=>{
    const resposta = await request('http://localhost:3000/api/v1/').get(`/categorias/795f636b-0fd3-4e74-92ad-afa7a7ea1100`);
    const categoria = await resposta.body;

    expect(resposta.status).toBe(200);
    expect(categoria).toEqual([]);
  });


});

describe('/POST em categorias', ()=>{
  it('Deve retornar uma nova categoria', async()=>{
    const categoria = {
      titulo: 'titulo',
      cor: 'cor'
    };
    const resposta = await request('http://localhost:3000/api/v1/').post('/categorias').send(categoria);
   


    expect(resposta.headers['content-type']).toContain('application/json');
    expect(resposta.status).toBe(201);
    const novaCategoria = await resposta.body;

   
    expect(typeof novaCategoria).toBe('object');

    expect(novaCategoria).toHaveProperty('id');
    expect(novaCategoria).toHaveProperty('titulo');
    expect(novaCategoria).toHaveProperty('cor');

    const resposta1 = await request('http://localhost:3000/api/v1/').delete(`/categorias/${novaCategoria.id}`);

    expect(resposta1.status).toBe(200);
    expect(resposta1.body).toEqual({message: "Categoria deletado com sucesso"});
  });
});

describe('/PATCH em categorias', ()=>{
  it('Deve fazer update de uma categoria com sucesso', async()=>{
    const categoria = {
      titulo: 'titulo',
      cor: 'cor'
    };

    const novaInforCategoria = {
      titulo: 'novo titulo'
    };

    const respostaPost = await request('http://localhost:3000/api/v1/').post('/categorias').send(categoria);
    
    
    expect(respostaPost.headers['content-type']).toContain('application/json');
    expect(respostaPost.status).toBe(201);

    const respostaPatch = await request('http://localhost:3000/api/v1/').patch(`/categorias/${respostaPost.body.id}`).send(novaInforCategoria);

    expect(respostaPatch.headers['content-type']).toContain('application/json');
    expect(respostaPatch.status).toBe(200);
    expect(respostaPatch.body).toHaveProperty('id');
    expect(respostaPatch.body).toHaveProperty('titulo');
    expect(respostaPatch.body).toHaveProperty('cor');


    expect(respostaPatch.body).toMatchObject ({id: respostaPost.body.id, titulo: novaInforCategoria.titulo, cor: categoria.cor});

    await request('http://localhost:3000/api/v1/').delete(`/categorias/${respostaPatch.id}`);
  });
} );

describe('/DELETE em categorias', ()=>{
  it('Deve deletar uma categoria com sucesso', async()=>{
    const video = {
      titulo: 'titulo',
      cor: 'cor'
    };


    const resposta = await request('http://localhost:3000/api/v1/').post('/categorias').send(video);
   


    expect(resposta.headers['content-type']).toContain('application/json');
    expect(resposta.status).toBe(201);
    const novaCategoria = await resposta.body;

   
    expect(typeof novaCategoria).toBe('object');

    expect(novaCategoria).toHaveProperty('id');
    expect(novaCategoria).toHaveProperty('titulo');
    expect(novaCategoria).toHaveProperty('cor');

    const resposta1 = await request('http://localhost:3000/api/v1/').delete(`/categorias/${novaCategoria.id}`);

    expect(resposta1.status).toBe(200);
    expect(resposta1.body).toEqual({message: "Categoria deletado com sucesso"});
  });

  it('Deve dar um erro 404', async()=>{
    const resposta1 = await request('http://localhost:3000/api/v1/').delete(`/categorias/fb01919e-10b1-46d6-977f-1a0aa5ed218f`);

    expect(resposta1.status).toBe(404);
    expect(resposta1.body).toEqual({mensagem: "Categoria não encontrado."});
  });
});

