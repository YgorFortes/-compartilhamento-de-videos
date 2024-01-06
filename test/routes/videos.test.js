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

describe('GET /videos', () => {
  it('Deve retornar todos os videos', async () => {
    const reponse = await request('http://localhost:3000/api/v1/').get('/videos');
   
    expect(reponse.status).toBe(200);
    expect(reponse.headers['content-type']).toContain('application/json');


    const videos = await reponse.body;
    expect(typeof videos).toBe('object');
    expect(videos[0]).toHaveProperty('titulo', 'descricao', 'url');
    expect(videos.length).toBeGreaterThanOrEqual(1);

  });

  it('Deve dar erro 404 ao errar o link', async()=>{
    const response = await request('http://localhost:3000/api/v1/').get('/video');
   
    expect(response.status).toBe(404);
  });

  it('Deve retornar categorias de acordo com o filtro', async()=>{

    const category = {
      titulo: 'titulo',
      cor: 'cor'
    };
    
    const reponseCategory = await request('http://localhost:3000/api/v1/').post('/categorias').send(category);

    const newCategory = await reponseCategory.body;

    const video = {
      titulo: 'titulo',
      descricao: 'descricao',
      url: 'https://www.youtube.com/watch?v=w6yGFi0dZeA&ab_channel=AndreOkazaki',
      categoriaId: newCategory.id
    };


    const responsePostVideo = await request('http://localhost:3000/api/v1/').post('/videos')
    .send(video);
    const newVideo = responsePostVideo.body;

    const video2 = {
      titulo: 'não tem nada',
      descricao: 'descricao',
      url: 'https://www.youtube.com/watch?v=w6yGFi0dZeA&ab_channel=AndreOkazaki',
      categoriaId: newCategory.id
    };


    const responsePostVideo2 = await request('http://localhost:3000/api/v1/').post('/videos')
    .send(video2);
    const newVideo2 = responsePostVideo2.body;

    const video3 = {
      titulo: 'tem titulo no nome, mas é diferente',
      descricao: 'descricao',
      url: 'https://www.youtube.com/watch?v=w6yGFi0dZeA&ab_channel=AndreOkazaki',
      categoriaId: newCategory.id
    };


    const responsePostVideo3 = await request('http://localhost:3000/api/v1/').post('/videos')
    .send(video3);
    const newVideo3 = responsePostVideo3.body;
   
   


    const responseGetVideo = await request('http://localhost:3000/api/v1/').get('/videos?titulo=titulo');
   
    expect(responseGetVideo.status).toBe(200);
    expect(responseGetVideo.headers['content-type']).toContain('application/json');

    const videos = await responseGetVideo.body;

    expect(typeof videos).toBe('object');

    expect(videos[0]).toHaveProperty('id','titulo', 'cor');

    expect(videos.length).toBeGreaterThanOrEqual(1);
    
    videos.forEach((videoSingle)=>expect(videoSingle.titulo).toContain('titulo'));

    await request('http://localhost:3000/api/v1/').delete(`/videos/${newVideo.id}`);
    await request('http://localhost:3000/api/v1/').delete(`/videos/${newVideo2.id}`);
    await request('http://localhost:3000/api/v1/').delete(`/videos/${newVideo3.id}`);
    await request('http://localhost:3000/api/v1/').delete(`/categorias/${newCategory.id}`);
  });

  it('Deve voltar um array vazio quando o parametro do filtro não for encontrado ', async()=>{
    const reponse = await request('http://localhost:3000/api/v1/').get('/videos/?titulo=aaaaaaa');
   
    expect(reponse.status).toBe(200);
    expect(reponse.headers['content-type']).toContain('application/json');


    const videos = await reponse.body;
    expect(videos).toEqual([]);
  });

  it('Deve retorna um video conforme seu id', async()=>{
    const response = await request('http://localhost:3000/api/v1/').get('/videos');
   
    expect(response.status).toBe(200);
    expect(response.headers['content-type']).toContain('application/json');


    const videos = await response.body;

    const response2 = await request('http://localhost:3000/api/v1/').get(`/videos/${videos[0].id}`);
    const video = await response2.body;

    expect(typeof video).toBe('object');
    expect(video).toHaveProperty('id','titulo', 'descricao','url');

  });

  it('Deve retornar um array vazio caso não exista o video cadastrado', async()=>{
    const reponse = await request('http://localhost:3000/api/v1/').get(`/videos/795f636b-0fd3-4e74-92ad-afa7a7ea1100`);
    const video = await reponse.body;

    expect(reponse.status).toBe(200);
    expect(video).toEqual([]);
  });

  it('Deve paginar corretamente ', async()=>{

    const category = {
      titulo: 'titulo',
      cor: 'cor'
    };
    
    const reponsePostCategory = await request('http://localhost:3000/api/v1/').post('/categorias').send(category);
    const newCategory = reponsePostCategory.body;
    
    let respostaPostArray = [];
    const promisses = [];

    const page = 1;
    for( let i = 0; i <10; i++ ){
      const video = {
        titulo: 'titulo',
        descricao: 'descricao',
        url: 'https://www.youtube.com/watch?v=w6yGFi0dZeA&ab_channel=AndreOkazaki',
        categoriaId: newCategory.id
      };
  
      const responsePostVideo =  request('http://localhost:3000/api/v1/').post('/videos')
      .send(video);
      promisses.push(responsePostVideo);
    }

    respostaPostArray = await Promise.all(promisses);

    const responseGetVideos = await request('http://localhost:3000/api/v1/').get(`/videos?page=${page}`);
    
    const videos = await responseGetVideos.body;


    expect(videos).toHaveLength(5);

    const responseGetVideos2 = await request('http://localhost:3000/api/v1/').get(`/videos?page=2`);
    
    const videos2 = await responseGetVideos2.body;


    videos2.forEach((video, index) => {
      expect(video.id).not.toEqual(videos[index].id);
    });

    const deletePost = respostaPostArray.map((respostaPost)=>request('http://localhost:3000/api/v1/').delete(`/videos/${respostaPost.body.id}`));
    await Promise.all(deletePost);

    await request('http://localhost:3000/api/v1/').delete(`/categorias/${newCategory.id}`);
  });

});

describe('POST /videos',()=>{
  it('Deve criar um novo video e ter status code 201', async()=>{
    const category = {
      titulo: 'titulo',
      cor: 'cor'
    };
    
    const reponseCategory = await request('http://localhost:3000/api/v1/').post('/categorias').send(category);

    const newCategory = await reponseCategory.body;

    const video = {
      titulo: 'titulo',
      descricao: 'descricao',
      url: 'https://www.youtube.com/watch?v=w6yGFi0dZeA&ab_channel=AndreOkazaki',
      categoriaId: newCategory.id
    };


    const responsePostVideo = await request('http://localhost:3000/api/v1/').post('/videos')
    .send(video);

    const newVideo = responsePostVideo.body;


    expect(responsePostVideo.statusCode).toEqual(201);
    expect(typeof newVideo).toBe('object');
    expect(newVideo).toMatchObject(video);

    await request('http://localhost:3000/api/v1/').delete(`/videos/${newVideo.id}`);
    await request('http://localhost:3000/api/v1/').delete(`/categorias/${newCategory.id}`);
    
  });

  it('Deve dar erro 404 caso não coloquem todos os campos obrigátorios no  body', async()=>{
    const video = {
      descricao: 'descricao',
      url: 'https://www.youtube.com/watch?v=w6yGFi0dZeA&ab_channel=AndreOkazaki'
    };

    const response = await request('http://localhost:3000/api/v1/').post('/videos')
    .send(video);

    expect(response.statusCode).toEqual(400);
  });

  it('Deve lançar um erroe ter status code 404 caso não encontre a categoria no body', async()=>{

    const video = {
      titulo: 'titulo',
      descricao: 'descricao',
      url: 'https://www.youtube.com/watch?v=w6yGFi0dZeA&ab_channel=AndreOkazaki',
      categoriaId: '6dab268e-c52e-45ee-867b-a65ff3030ddd'
    };


    const responsePostVideo = await request('http://localhost:3000/api/v1/').post('/videos')
    .send(video);


    expect(responsePostVideo.statusCode).toEqual(404);
    expect(typeof responsePostVideo.body).toBe('object');
    expect(responsePostVideo.body).toStrictEqual({ mensagem: 'Categoria não encontrado.' });
  
  });
});

describe('PATH /videos', ()=>{
  it('Deve editar um video criado e status code 200',async()=>{

    const category = {
      titulo: 'titulo',
      cor: 'cor'
    };
    
    const responsePostCategory = await request('http://localhost:3000/api/v1/').post('/categorias').send(category);

    const newCategory = await responsePostCategory.body;

    const video = {
      titulo: 'titulo',
      descricao: 'descricao',
      url: 'https://www.youtube.com/watch?v=w6yGFi0dZeA&ab_channel=AndreOkazaki',
      categoriaId: newCategory.id
    };

    const newInfoVideo= {
      descricao: 'nova descricao',
    };


    const responsePostVideo= await request('http://localhost:3000/api/v1/').post('/videos')
    .send(video);

    const newVideo = await responsePostVideo.body;

    const responsePatchVideo= await request('http://localhost:3000/api/v1/').patch(`/videos/${newVideo.id}`)
    .send(newInfoVideo);

    expect(responsePatchVideo.statusCode).toEqual(200);
    expect(responsePatchVideo.body.descricao).toEqual(newInfoVideo.descricao);
    expect(responsePatchVideo.body.categoriaId).toEqual(video.categoriaId);

    await request('http://localhost:3000/api/v1/').delete(`/videos/${newVideo.id}`);
    await request('http://localhost:3000/api/v1/').delete(`/categorias/${newCategory.id}`);
  });

  it('De dar erro 404 quando não encontrado categoria', async()=>{
    const category = {
      titulo: 'titulo',
      cor: 'cor'
    };
    
    const responsePostCategory = await request('http://localhost:3000/api/v1/').post('/categorias').send(category);

    const newCategory = await responsePostCategory.body;

    const video = {
      titulo: 'titulo',
      descricao: 'descricao',
      url: 'https://www.youtube.com/watch?v=w6yGFi0dZeA&ab_channel=AndreOkazaki',
      categoriaId: newCategory.id
    };

    const newInfoVideo= {
      categoriaId: '06dbddc5-efc7-45b6-bebd-0b8debd041d1',
    };


    const responsePostVideo = await request('http://localhost:3000/api/v1/').post('/videos')
    .send(video);

    const newVideo = await responsePostVideo.body;

    const responsePatchVideo = await request('http://localhost:3000/api/v1/').patch(`/videos/${newVideo.id}`)
    .send(newInfoVideo);

    expect(responsePatchVideo.statusCode).toEqual(404);
    expect(responsePatchVideo.body.descricao).toEqual(newInfoVideo.descricao);
    await request('http://localhost:3000/api/v1/').delete(`/videos/${newVideo.id}`);
    await request('http://localhost:3000/api/v1/').delete(`/categorias/${newCategory.id}`);
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


describe('DELETE /videos', ()=>{
  it('Deve deletar o video, mandar status code 200 e uma mensagem de sucesso', async()=>{
    const category = {
      titulo: 'titulo',
      cor: 'cor'
    };
    
    const responsePostCategory = await request('http://localhost:3000/api/v1/').post('/categorias').send(category);
    const newCategory = await responsePostCategory.body;

    const video = {
      titulo: 'titulo',
      descricao: 'descricao',
      url: 'https://www.youtube.com/watch?v=w6yGFi0dZeA&ab_channel=AndreOkazaki',
      categoriaId: newCategory.id
    };
  
    const expectResult = {
      mensagem: 'Video deletado com sucesso',
    };
  
  
    const responsePostVideo = await request('http://localhost:3000/api/v1/').post('/videos')
    .send(video);

    const newVideo = await responsePostVideo.body;

    const responseDeleteVideo = await request('http://localhost:3000/api/v1/').delete(`/videos/${newVideo.id}`);

    expect(responseDeleteVideo.body).toEqual(expectResult);
    expect(responseDeleteVideo.statusCode).toEqual(200);
    await request('http://localhost:3000/api/v1/').delete(`/categorias/${newCategory.id}`);

  });

  it('Deve lançar um erro status 404 quando video não encontrado', async()=>{
    const responseDeleteVideo = await request('http://localhost:3000/api/v1/').delete(`/videos/6076344c-a832-4e57-b6d4-d2949fc1d67d`);
    expect(responseDeleteVideo.statusCode).toEqual(404);
  });
});

