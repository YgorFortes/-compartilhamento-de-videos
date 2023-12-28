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
  it('Deve retornar todos os videos', async () => {
    const resposta = await request('http://localhost:3000/api/v1/').get('/videos');
   
    expect(resposta.status).toBe(200);
    expect(resposta.headers['content-type']).toContain('application/json');


    const videos = await resposta.body;
    expect(typeof videos).toBe('object');
    expect(videos[0]).toHaveProperty('titulo', 'descricao', 'url');
    expect(videos.length).toBeGreaterThanOrEqual(1);

  });

  it('Deve dar erro 404 ao errar o link', async()=>{
    const resposta = await request('http://localhost:3000/api/v1/').get('/video');
   
    expect(resposta.status).toBe(404);
  });

  it('Deve voltar um array vazio quando filter não for encontrado', async()=>{
    const resposta = await request('http://localhost:3000/api/v1/').get('/videos/?titulo=nariz');
   
    expect(resposta.status).toBe(200);
    expect(resposta.headers['content-type']).toContain('application/json');


    const videos = await resposta.body;
    expect(videos).toEqual([]);
  });

  it('Deve retorna um video conforme seu id', async()=>{
    const resposta = await request('http://localhost:3000/api/v1/').get('/videos');
   
    expect(resposta.status).toBe(200);
    expect(resposta.headers['content-type']).toContain('application/json');


    const videos = await resposta.body;

    const resposta2 = await request('http://localhost:3000/api/v1/').get(`/videos/${videos[0].id}`);
    const video = await resposta2.body;

    expect(typeof video).toBe('object');

  });

  it('Deve retornar um array vazio', async()=>{
    const resposta2 = await request('http://localhost:3000/api/v1/').get(`/videos/795f636b-0fd3-4e74-92ad-afa7a7ea1100`);
    const video = await resposta2.body;

    expect(resposta2.status).toBe(200);
    expect(video).toEqual([]);
  });

});

describe('POST /videos',()=>{
  it('Deve criar um novo video e ter status code 201', async()=>{

    const video = {
      titulo: 'titulo',
      descricao: 'descricao',
      url: 'https://www.youtube.com/watch?v=w6yGFi0dZeA&ab_channel=AndreOkazaki'
    };


    const resposta = await request('http://localhost:3000/api/v1/').post('/videos')
    .send(video);

    expect(resposta.statusCode).toEqual(201);
    expect(typeof resposta.body).toBe('object');
    expect(resposta.body).toHaveProperty('titulo', 'descricao', 'url');
    expect(resposta.body).toMatchObject(video);
  
  });

  it('Deve retornar erro 400 ao usuário não colocar todos os campos requeridos', async()=>{
    const video = {
      descricao: 'descricao',
      url: 'https://www.youtube.com/watch?v=w6yGFi0dZeA&ab_channel=AndreOkazaki'
    };

    const resposta = await request('http://localhost:3000/api/v1/').post('/videos')
    .send(video);

    expect(resposta.statusCode).toEqual(400);
  });
});

describe('PATH /videos', ()=>{
  it('Deve editar um video criado e status code 200',async()=>{
    const video = {
      titulo: 'titulo',
      descricao: 'descricao',
      url: 'https://www.youtube.com/watch?v=w6yGFi0dZeA&ab_channel=AndreOkazaki'
    };

    const newInfoVideo= {
      descricao: 'nova descricao',
    };


    const resposta = await request('http://localhost:3000/api/v1/').post('/videos')
    .send(video);

    const videoCriado = await resposta.body;

    const respostaEditar = await request('http://localhost:3000/api/v1/').patch(`/videos/${videoCriado.id}`)
    .send(newInfoVideo);

    expect(respostaEditar.statusCode).toEqual(200);
    expect(respostaEditar.body.descricao).toEqual(newInfoVideo.descricao);
  });

  it('Deve retornar erro 404', async()=>{

    const newInfoVideo= {
      descricao: 'nova descricao',
    };
    
    const respostaEditar = await request('http://localhost:3000/api/v1/').patch(`/videos/ee7c0f05-41d2-4975-993e-d571f686f91b`)
    .send(newInfoVideo);

    expect(respostaEditar.statusCode).toEqual(404);
  });
});

