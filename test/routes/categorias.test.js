/* eslint-disable no-plusplus */
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
    const response = await request('http://localhost:3000/api/v1/').get('/categorias');
   
    expect(response.status).toBe(200);
    expect(response.headers['content-type']).toContain('application/json');


    const categories = await response.body;
    expect(typeof categories).toBe('object');
    expect(categories[0]).toHaveProperty('id','titulo', 'cor');
    expect(categories.length).toBeGreaterThanOrEqual(1);

  });

  it('Deve dar erro 404 ao errar o link', async()=>{
    const response = await request('http://localhost:3000/api/v1/').get('/catego');
   
    expect(response.status).toBe(404);
  });

  it('Deve voltar um array vazio quando filter não for encontrado', async()=>{
    const response = await request('http://localhost:3000/api/v1/').get('/categorias/?titulo=aaaaaaaaaaaa');
   
    expect(response.status).toBe(200);
    expect(response.headers['content-type']).toContain('application/json');


    const categories = await response.body;
    expect(categories).toEqual([]);
  });
  

  it('Deve retorna uma categoria conforme seu id', async()=>{
    const response = await request('http://localhost:3000/api/v1/').get('/categorias');
   
    expect(response.status).toBe(200);
    expect(response.headers['content-type']).toContain('application/json');


    const categories = await response.body;

    const response2 = await request('http://localhost:3000/api/v1/').get(`/categorias/${categories[0].id}`);
    const category = await response2.body;
   

    expect(typeof category).toBe('object');
    expect(category).toHaveProperty('id','titulo', 'cor');

  });

  it('Deve retornar um array vazio quando não encontrado categoria', async()=>{
    const response = await request('http://localhost:3000/api/v1/').get(`/categorias/795f636b-0fd3-4e74-92ad-afa7a7ea1100`);
    const category = await response.body;

    expect(response.status).toBe(200);
    expect(category).toEqual([]);
  });

  it('Deve retornar categorias de acordo com o filtro', async()=>{
    const category = {
      titulo: 'surpresa',
      cor: 'cor'
    };

    const responsePost = await request('http://localhost:3000/api/v1/').post('/categorias').send(category);

    const category2 = {
      titulo: 'novo amigo',
      cor: 'cor'
    };

    const responsePost2 = await request('http://localhost:3000/api/v1/').post('/categorias').send(category2);

    const category3 = {
      titulo: 'surpresa show',
      cor: 'cor'
    };

    const responsePost3 = await request('http://localhost:3000/api/v1/').post('/categorias').send(category3);


    const response = await request('http://localhost:3000/api/v1/').get('/categorias?titulo=surpresa');
   
    expect(response.status).toBe(200);
    expect(response.headers['content-type']).toContain('application/json');

    const categories = await response.body;

    expect(typeof categories).toBe('object');

    expect(categories[0]).toHaveProperty('id','titulo', 'cor');

    expect(categories.length).toBeGreaterThanOrEqual(1);
    
    categories.forEach((categoryOfArray)=>expect(categoryOfArray.titulo).toContain('surpresa'));

    await request('http://localhost:3000/api/v1/').delete(`/categorias/${responsePost.body.id}`);
    await request('http://localhost:3000/api/v1/').delete(`/categorias/${responsePost2.body.id}`);
    await request('http://localhost:3000/api/v1/').delete(`/categorias/${responsePost3.body.id}`);
  });

  it('Deve paginar corretamente ', async()=>{
    let respostaPostArray = [];
    const promisses = [];

    const page = 1;
    for( let i = 0; i <10; i++ ){
      const category = {
        titulo: 'surpresa',
        cor: 'cor'
      };

      const responsePost =  request('http://localhost:3000/api/v1/').post('/categorias').send(category);
      promisses.push(responsePost);
    }

    respostaPostArray = await Promise.all(promisses);
 
    const responseGet = await request('http://localhost:3000/api/v1/').get(`/categorias?page=${page}`);

    const categories = await responseGet.body;
 
    expect(categories).toHaveLength(5);

    const responseGet2 = await request('http://localhost:3000/api/v1/').get(`/categorias?page=2`);
    const categories2 = await responseGet2.body;

    categories2.forEach((category, index) => {
      expect(category.id).not.toEqual(categories[index].id);
    });

    const deletePost = respostaPostArray.map((respostaPost)=>request('http://localhost:3000/api/v1/').delete(`/categorias/${respostaPost.body.id}`));

    await Promise.all(deletePost);

  });


});

describe('POST em /categorias', ()=>{
  it('Deve retornar uma nova categoria', async()=>{
    const category = {
      titulo: 'titulo',
      cor: 'cor'
    };

    const response = await request('http://localhost:3000/api/v1/').post('/categorias').send(category);
   


    expect(response.headers['content-type']).toContain('application/json');
    expect(response.status).toBe(201);
    const newCategory = await response.body;

   
    expect(typeof newCategory).toBe('object');

    expect(newCategory).toHaveProperty('id');
    expect(newCategory).toHaveProperty('titulo');
    expect(newCategory).toHaveProperty('cor');

    const response2 = await request('http://localhost:3000/api/v1/').delete(`/categorias/${newCategory.id}`);

    expect(response2.status).toBe(200);
    expect(response2.body).toEqual({mensagem: "Categoria deletado com sucesso"});
  });

  it('Deve dar erro 404 caso não coloquem todos os campos obrigátorios', async()=>{
    const category = {
      cor: 'cor'
    };

    const response = await request('http://localhost:3000/api/v1/').post('/categorias').send(category);
   

    expect(response.headers['content-type']).toContain('application/json');
    expect(response.statusCode).toBe(400);
    expect(response.body).toEqual({ mensagem: 'O campo titulo é obrigatório.' });
  });

});

describe('PATCH em /categorias', ()=>{
  it('Deve fazer update de uma categoria com sucesso', async()=>{
    const category = {
      titulo: 'titulo',
      cor: 'cor'
    };

    const newInfoCategory = {
      titulo: 'novo titulo'
    };

    const responsePost = await request('http://localhost:3000/api/v1/').post('/categorias').send(category);
    
    
    expect(responsePost.headers['content-type']).toContain('application/json');
    expect(responsePost.status).toBe(201);

    const responsePatch = await request('http://localhost:3000/api/v1/').patch(`/categorias/${responsePost.body.id}`).send(newInfoCategory);

    expect(responsePatch.headers['content-type']).toContain('application/json');
    expect(responsePatch.status).toBe(200);
    expect(responsePatch.body).toHaveProperty('id');
    expect(responsePatch.body).toHaveProperty('titulo');
    expect(responsePatch.body).toHaveProperty('cor');


    expect(responsePatch.body).toMatchObject ({id: responsePost.body.id, titulo: newInfoCategory.titulo, cor: category.cor});

    await request('http://localhost:3000/api/v1/').delete(`/categorias/${responsePatch.id}`);
  });
} );

describe('DELETE em /categorias', ()=>{
  it('Deve deletar uma categoria com sucesso', async()=>{
    const video = {
      titulo: 'titulo',
      cor: 'cor'
    };


    const response = await request('http://localhost:3000/api/v1/').post('/categorias').send(video);
   

    expect(response.headers['content-type']).toContain('application/json');
    expect(response.status).toBe(201);
    const newCategory = await response.body;

   
    expect(typeof newCategory).toBe('object');

    expect(newCategory).toHaveProperty('id');
    expect(newCategory).toHaveProperty('titulo');
    expect(newCategory).toHaveProperty('cor');

    const response2 = await request('http://localhost:3000/api/v1/').delete(`/categorias/${newCategory.id}`);

    expect(response2.status).toBe(200);
    expect(response2.body).toEqual({mensagem: "Categoria deletado com sucesso"});
  });

  it('Deve dar um erro 404 quando não encontrado a categoria', async()=>{
    const response = await request('http://localhost:3000/api/v1/').delete(`/categorias/fb01919e-10b1-46d6-977f-1a0aa5ed218f`);

    expect(response.status).toBe(404);
    expect(response.body).toEqual({mensagem: "Categoria não encontrado."});
  });
});

