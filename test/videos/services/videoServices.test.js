/* eslint-disable import/no-extraneous-dependencies */

import {describe , expect, it, afterEach, beforeEach} from '@jest/globals';
import Sinon from 'sinon';
import { VideoService } from "../../../src/modules/videos/services/VideoService.js";





describe('Testando método findAll de VideoService', ()=>{
  let videoService;
  let videoRepositoryMock;

  beforeEach(()=>{
    videoService = new VideoService();
    videoRepositoryMock = Sinon.mock(videoService.videoRepository);
  });

  afterEach(()=>{
    videoRepositoryMock.restore();
  });

  it('Deve chamar todos os videos se filtro estiver com objeto vazio',async ()=>{
    const filter = {};

    const expectedVideos = [
      {id: 1, titulo: 'teste', descricao: 'descrição teste', url: 'url teste'},
      {id: 2, titulo: 'teste 2', descricao: 'descrição test 2', url: 'url teste 2' }
    ];


    videoRepositoryMock.expects('findAll')
    .withExactArgs()
    .resolves(expectedVideos);

    const videos = await videoService.findAll(filter);
    videoRepositoryMock.verify();
    expect(videos).toEqual(expectedVideos);
  });

  it('Deve encontrar os videos de acordo com o filtro passado', async ()=>{
    const filter = {titulo: 'teste'};

    const allVideos = [
      {id: 1, titulo: 'teste', descricao: 'descrição teste', url: 'url teste'},
      {id: 2, titulo: 'teste 2', descricao: 'descrição test 2', url: 'url teste 2' },
      {id: 3, titulo: 'novo titulo', descricao: 'nova descricao', url: 'nova url' }
    ];

    const expectedVideos = allVideos.filter(video => video.titulo.includes(filter.titulo));


    videoRepositoryMock.expects('findVideosByFilters')
    .withExactArgs(filter)
    .resolves(expectedVideos);


    const videos = await videoService.findAll(filter);
    videoRepositoryMock.verify();
    expect(videos).toEqual(expectedVideos);
  });

  it('Deve executar o busca com filtro dentro de um tempo aceitável', async()=>{

    const filter = {titulo: 'teste'};

    const allVideos = [
      {id: 1, titulo: 'teste', descricao: 'descrição teste', url: 'url teste'},
      {id: 2, titulo: 'teste 2', descricao: 'descrição test 2', url: 'url teste 2' },
      {id: 3, titulo: 'novo titulo', descricao: 'nova descricao', url: 'nova url' }
    ];

    const expectedVideos = allVideos.filter(video => video.titulo.includes(filter.titulo));
   


    videoRepositoryMock.expects('findVideosByFilters')
    .withExactArgs(filter)
    .resolves(expectedVideos);

    const startTime =  Date.now();

    const videos = await videoService.findAll(filter);
  
    
    videoRepositoryMock.verify();
    const endTime =  Date.now();
   

    expect(endTime - startTime).toBeLessThan(1000);
    expect(videos).toEqual(expectedVideos);
  });

  it('Deve fazer paginação de 5 itens por vez, e deve executar em um tempo aceitável ', async()=>{
    const filter = {page: 3};
    const {page} = filter;

    const itemsPerPage = 5;
    const startIndex = (page - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;

    const allVideos = [
      {id: 1, titulo: 'teste', descricao: 'descrição teste', url: 'url teste'},
      {id: 2, titulo: 'teste 2', descricao: 'descrição test 2', url: 'url teste 2' },
      {id: 3, titulo: 'novo titulo', descricao: 'nova descricao', url: 'nova url' },
      {id: 4, titulo: 'novo titulo', descricao: 'nova descricao', url: 'nova url' },
      {id: 5, titulo: 'novo titulo', descricao: 'nova descricao', url: 'nova url' },
      {id: 6, titulo: 'novo titulo', descricao: 'nova descricao', url: 'nova url' },
      {id: 7, titulo: 'novo titulo', descricao: 'nova descricao', url: 'nova url' },
      {id: 8, titulo: 'novo titulo', descricao: 'nova descricao', url: 'nova url' },
      {id: 9, titulo: 'novo titulo', descricao: 'nova descricao', url: 'nova url' },
      {id: 10, titulo: 'novo titulo', descricao: 'nova descricao', url: 'nova url' },
      {id: 11, titulo: 'novo titulo', descricao: 'nova descricao', url: 'nova url' },
      {id: 12, titulo: 'novo titulo', descricao: 'nova descricao', url: 'nova url' }
    ];
   
    const expectedVideos = allVideos.slice(startIndex, endIndex);

    videoRepositoryMock.expects('pagination')
    .withExactArgs(page)
    .resolves(expectedVideos);

    const startTime =  Date.now();

    const videos = await videoService.findAll(filter);
  
    
    videoRepositoryMock.verify();
    const endTime =  Date.now();
   

    expect(endTime - startTime).toBeLessThan(1000);
    expect(videos).toEqual(expectedVideos);
    expect(videos.length).toEqual(expectedVideos.length);
  });
});

describe('Testando método findOne de VideoService', ()=>{
  let videoService;
  let videoRepositoryMock;

  beforeEach(()=>{
    videoService = new VideoService();
    videoRepositoryMock = Sinon.mock(videoService.videoRepository);
  });
  
  afterEach(()=>{
    videoRepositoryMock.restore();
  });

  it('Deve retorna um array vazio se não encontrar o video', async ()=>{
    
    const expectedVideo = [];

    const elementId = {
      id: 'b0be69fa-ebc1-48dc-9bca-ef471bda71b8'
    };

    videoRepositoryMock.expects('findOne')
    .withExactArgs(elementId)
    .resolves(expectedVideo);

    const video = await videoService.findOne(elementId);

    expect(video).toEqual(expectedVideo);
  });

  it('Deve retornar um video conforme o id', async()=>{
    const expectedVideo = {
      id: 'b0be69fa-ebc1-48dc-9bc7-ef471bda71b8',
      titulo: 'titulo teste',
      descricao: 'descricao teste',
      url: 'url teste'
    };

    const elementId = {
      id: 'b0be69fa-ebc1-48dc-9bc7-ef471bda71b8'
    };

    videoRepositoryMock.expects('findOne')
    .withExactArgs(elementId)
    .resolves(expectedVideo);

    const video = await videoService.findOne(elementId);

    expect(video).toEqual(expectedVideo);
    expect(video.id).toEqual(expectedVideo.id);
  });

  it('Deve executar dentro de um tempo aceitável', async() =>{
    const expectedVideo = {
      id: 'b0be69fa-ebc1-48dc-9bc7-ef471bda71b8',
      titulo: 'titulo teste',
      descricao: 'descricao teste',
      url: 'url teste'
    };

    const elementId = {
      id: 'b0be69fa-ebc1-48dc-9bc7-ef471bda71b8'
    };

    videoRepositoryMock.expects('findOne')
    .withExactArgs(elementId)
    .resolves(expectedVideo);

    const startTime =  Date.now();

    const video = await videoService.findOne(elementId);

    const endTime =  Date.now();

    expect(video).toEqual(expectedVideo);
    expect(video.id).toEqual(expectedVideo.id);
    expect(endTime - startTime).toBeLessThan(1000); 
  });

});

describe('Testando método create de VideoService',()=>{
  let videoService;
  let videoRepositoryMock;
  let verifyOrCreateCategoryForVideo;

  beforeEach(()=>{
    videoService = new VideoService();
    videoRepositoryMock = Sinon.mock(videoService.videoRepository);
    verifyOrCreateCategoryForVideo =Sinon.mock(videoService);
  });
  
  afterEach(()=>{
    videoRepositoryMock.restore();
    verifyOrCreateCategoryForVideo.restore();
  });

  it('Deve criar um novo vídeo', async()=>{

    const element = {
      descricao: 'descricao teste',
      titulo: 'titulo teste',
      url: 'https://www.youtube.com/watch?v=oBB6GMjbiIE&ab_channel=CanalPeeWee',
      categoriaId: '2bc9fa64-97c7-476d-a6de-91f4e93bfdf9'
    };

    const expectNewVideo = {
      id: '2b37f2b1-448b-4924-88af-4fae372beb50',
      descricao: 'descricao teste',
      titulo: 'titulo teste',
      url: 'https://www.youtube.com/watch?v=oBB6GMjbiIE&ab_channel=CanalPeeWee',
      categoriaId: '2bc9fa64-97c7-476d-a6de-91f4e93bfdf9'
    };

    verifyOrCreateCategoryForVideo.expects('verifyOrCreateCategoryForVideo').withExactArgs(element).resolves(element);

    videoRepositoryMock.expects('create').withExactArgs(element).resolves(expectNewVideo);

    const newVideo = await videoService.create(element);
 
    videoRepositoryMock.verify();

    expect(newVideo).toEqual(expectNewVideo);
  });

  it('Deve criar uma categoria chamada livre quando não colocado categoriaId', async()=>{
    const element = {
      descricao: 'descricao teste',
      titulo: 'titulo teste',
      url: 'https://www.youtube.com/watch?v=oBB6GMjbiIE&ab_channel=CanalPeeWee',
    };

    const expectCategoryFree = {
      titulo: 'livre',
      cor: 'cor'
    };


    const expectNewVideo = {
      id: '2b37f2b1-448b-4924-88af-4fae372beb50',
      descricao: 'descricao teste',
      titulo: 'titulo teste',
      url: 'https://www.youtube.com/watch?v=oBB6GMjbiIE&ab_channel=CanalPeeWee',
      categoriaId: expectCategoryFree.id
    };

    verifyOrCreateCategoryForVideo.expects('verifyOrCreateCategoryForVideo').withExactArgs(element).resolves({...element, categoriaId: expectCategoryFree.id});

    videoRepositoryMock.expects('create').withExactArgs({...element, categoriaId: undefined}).resolves(expectNewVideo);

    const newVideo = await videoService.create(element);
 
    videoRepositoryMock.verify();

    expect(newVideo).toEqual(expectNewVideo);
  });

  it('Deve lançar um erro quando método create é chamado com um argumento inválido', async()=>{
    const element = undefined;

    
    await expect(videoService.create(element)).rejects.toThrow('O campo url é obigatório.');
  });

  it('Deve funcionar corretamente quando o método create é chamado várias vezes seguidas', async()=>{
    const element = {
      descricao: 'descricao teste',
      titulo: 'titulo teste',
      url: 'https://www.youtube.com/watch?v=oBB6GMjbiIE&ab_channel=CanalPeeWee',
      categoriaId: '2bc9fa64-97c7-476d-a6de-91f4e93bfdf9'
    };

    const expectNewVideo ={
      id: '2b37f2b1-448b-4924-88af-4fae372beb50',
      ...element
    };

    verifyOrCreateCategoryForVideo.expects('verifyOrCreateCategoryForVideo').withExactArgs(element).resolves(element).twice();


    videoRepositoryMock.expects('create').withExactArgs(element).resolves(expectNewVideo).twice();;

    const newVideo1 = await videoService.create(element);
    const newVideo2 = await videoService.create(element);

    videoRepositoryMock.verify();

    expect(newVideo1).toEqual(expectNewVideo);
    expect(newVideo2).toEqual(expectNewVideo);
  });
  

  it('Deve executar dentro de um tempo aceitável', async()=>{
    const element = {
      descricao: 'descricao teste',
      titulo: 'titulo teste',
      url: 'https://www.youtube.com/watch?v=oBB6GMjbiIE&ab_channel=CanalPeeWee',
      categoriaId: '2bc9fa64-97c7-476d-a6de-91f4e93bfdf9'
    };

    const expectNewVideo ={
      id: '2b37f2b1-448b-4924-88af-4fae372beb50',
      ...element
    };



    verifyOrCreateCategoryForVideo.expects('verifyOrCreateCategoryForVideo').withExactArgs(element).resolves(element);

    videoRepositoryMock.expects('create').withExactArgs(element).resolves(expectNewVideo);

    const startTime =  Date.now();

    const newVideo = await videoService.create(element);

    const endTime =  Date.now();

    expect(newVideo).toEqual(expectNewVideo);
    expect(endTime - startTime).toBeLessThan(1000); 
  });

  it('Deve lançar um erro quando categoria não for encontrada', async()=>{
    const videoData = {
      descricao: 'descricao teste',
      titulo: 'titulo teste',
      url: 'https://www.youtube.com/watch?v=oBB6GMjbiIE&ab_channel=CanalPeeWee',
      categoriaId: '2bc9fa64-97c7-476d-a6de-91f4e93bfdf9'
    };
  
    const error = new Error('Categoria não encontrado.');
  
    verifyOrCreateCategoryForVideo.expects('verifyOrCreateCategoryForVideo').withExactArgs(videoData).throws(error);
  
    await expect(videoService.create(videoData)).rejects.toThrow(error);
  
    verifyOrCreateCategoryForVideo.verify();
  });


});

describe('Testando  método update de VideoService', ()=>{

  let videoService;
  let videoRepositoryMock;
  let verifyCategoryById;

  beforeEach(()=>{
    videoService = new VideoService();
    videoRepositoryMock = Sinon.mock(videoService.videoRepository);
    verifyCategoryById =Sinon.mock(videoService);
  });
  
  afterEach(()=>{
    videoRepositoryMock.restore();
  });


  it('Deve atualizar video por seu id', async()=>{

    const elementId = {
      id: '6076344c-a832-4e57-b6d4-d2949fc1d67d',
    };
    

    const oldVideoInfo ={
      ...elementId,
      descricao: 'descricao teste',
      titulo: 'titulo teste',
      url: 'https://www.youtube.com/watch?v=oBB6GMjbiIE&ab_channel=CanalPeeWee'
    };

    

    const newVideoInfo = {
      descricao: 'nova descricao atualizada',
    };

    verifyCategoryById.expects('verifyCategoryById').withExactArgs(undefined).resolves();

    const expectedVideoInfo ={
      ...elementId,
      ...newVideoInfo,
      titulo: oldVideoInfo.titulo,
      url: oldVideoInfo.url
    };

    // Criando mock de um findOne 
    videoRepositoryMock.expects('findOne')
    .withExactArgs(elementId)
    .resolves(oldVideoInfo);


    videoRepositoryMock.expects('update').withExactArgs(elementId, newVideoInfo).resolves(expectedVideoInfo);
    const newInfoVideo = await videoService.update(elementId, newVideoInfo);
    

    videoRepositoryMock.verify();

    expect(newInfoVideo).toEqual(expectedVideoInfo);
  });

  it('Deve atualizar a categoriaId de videos', async()=>{
    const elementId = {
      id: '6076344c-a832-4e57-b6d4-d2949fc1d67d',
    };

    const categoriId = {
      id: 'cdb433c3-8f83-4449-b2cb-6e2d354e50cf'
    };
    

    const oldVideoInfo ={
      ...elementId,
      descricao: 'descricao teste',
      titulo: 'titulo teste',
      url: 'https://www.youtube.com/watch?v=oBB6GMjbiIE&ab_channel=CanalPeeWee',
      categoriId:'aba2155c-98bb-4d0a-9e9f-3fc971ee200c'
    };

    

    const newVideoInfo = {
      categoriId: categoriId.id
    };

    
    
    const expectedVideoInfo ={
      ...elementId,
      ...newVideoInfo,
      titulo: oldVideoInfo.titulo,
      url: oldVideoInfo.url,
      descricao: oldVideoInfo.descricao
    };
    
    // Criando mock de um findOne 
    videoRepositoryMock.expects('findOne')
    .withExactArgs(elementId)
    .resolves(oldVideoInfo);
    
    
    
    videoRepositoryMock.expects('update').withExactArgs(elementId, newVideoInfo).resolves(expectedVideoInfo);
    
    const newInfoVideo = await videoService.update(elementId, newVideoInfo);
    

    videoRepositoryMock.verify();
    verifyCategoryById.verify();

    expect(newInfoVideo).toEqual(expectedVideoInfo);
  });


  it('Deve lançar um erro quando não encontrado video', async() =>{
    const expectedVideo = [];

    const elementId = {
      id: 'b0be69fa-ebc1-48dc-9bca-ef471bda71b8'
    };

    const newVideoInfo = {
      descricao: 'nova descricao atualizada',
    };


    // Criando mock de um findOne 
    videoRepositoryMock.expects('findOne')
    .withExactArgs(elementId)
    .resolves(expectedVideo);
    
    // Espera que a função de atualização lance um erro
    await expect(videoService.update(elementId,newVideoInfo )).rejects.toThrow('Video não encontrado.');

    videoRepositoryMock.verify();

  });

  it('Deve funcionar corretamente quando o método update é chamado várias vezes seguidas', async()=>{

    const elementId = {
      id: '2b37f2b1-448b-4924-88af-4fae372beb50',
    };

    const oldVideoInfo ={
      ...elementId,
      descricao: 'descricao teste',
      titulo: 'titulo teste',
      url: 'https://www.youtube.com/watch?v=oBB6GMjbiIE&ab_channel=CanalPeeWee'
    };

    
    const newVideoInfo1 = {
      descricao: 'nova descricao atualizada',
    };

    const expectedVideoInfo1 ={
      ...elementId,
      ...newVideoInfo1,
      titulo: oldVideoInfo.titulo,
      url: oldVideoInfo.url,
    };

    verifyCategoryById.expects('verifyCategoryById').withExactArgs(undefined).resolves().twice();

    // Criando mock de um findOne 
    videoRepositoryMock.expects('findOne')
    .withExactArgs(elementId)
    .resolves(oldVideoInfo).twice();
 


    videoRepositoryMock.expects('update').withExactArgs(elementId, newVideoInfo1).resolves(expectedVideoInfo1).twice();

    const newVideo1 = await videoService.update(elementId, newVideoInfo1);
    const newVideo2 = await videoService.update(elementId, newVideoInfo1);
    
    videoRepositoryMock.verify();

    expect(newVideo1).toEqual(expectedVideoInfo1);
    expect(newVideo2).toEqual(expectedVideoInfo1);
  });

  it('Deve executar dentro de um tempo aceitável', async()=>{

    const elementId = {
      id: '2b37f2b1-448b-4924-88af-4fae372beb50',
    };

    const oldVideoInfo ={
      ...elementId,
      descricao: 'descricao teste',
      titulo: 'titulo teste',
      url: 'https://www.youtube.com/watch?v=oBB6GMjbiIE&ab_channel=CanalPeeWee'
    };

    
    const newVideoInfo = {
      descricao: 'nova descricao atualizada',
    };


    const expectedVideoInfo ={
      ...elementId,
      ...newVideoInfo,
      titulo: oldVideoInfo.titulo,
      url: oldVideoInfo.url
    };

    // Criando mock de um findOne 
    videoRepositoryMock.expects('findOne')
    .withExactArgs(elementId)
    .resolves(oldVideoInfo);

    verifyCategoryById.expects('verifyCategoryById').withExactArgs(undefined).resolves();
 
    videoRepositoryMock.expects('update').withExactArgs(elementId, newVideoInfo).resolves(expectedVideoInfo);

    
    const startTime =  Date.now();

    const newInfoVideo = await videoService.update(elementId, newVideoInfo);

    const endTime =  Date.now();
    videoRepositoryMock.verify();

    expect(endTime - startTime).toBeLessThan(1000); 
    expect(newInfoVideo).toEqual(expectedVideoInfo);
  });
  
  it('Deve lançar um erro de categoria não encontrado', async()=>{

    const elementId = {
      id: '2b37f2b1-448b-4924-88af-4fae372beb50',
    };

    const oldVideoInfo ={
      ...elementId,
      descricao: 'descricao teste',
      titulo: 'titulo teste',
      url: 'https://www.youtube.com/watch?v=oBB6GMjbiIE&ab_channel=CanalPeeWee'
    };

    
    const newVideoInfo = {
      categoriaId: '2b37f2b1-448b-4924-88af-4fae372beb50',
    };


    // Criando mock de um findOne 
    videoRepositoryMock.expects('findOne')
    .withExactArgs(elementId)
    .resolves(oldVideoInfo);


    const error = new Error('Categoria não encontrado.');
    await expect(videoService.verifyCategoryById(elementId.id)).rejects.toThrow(error);
    
  
  
    await expect(videoService.update(elementId, newVideoInfo)).rejects.toThrow(error);
  
    verifyCategoryById.verify();
  });


});

describe('Testando método delete de VideoService', ()=>{
  let videoService;
  let videoRepositoryMock;

  beforeEach(()=>{
    videoService = new VideoService();
    videoRepositoryMock = Sinon.mock(videoService.videoRepository);
  });

  afterEach(()=>{
    videoRepositoryMock.restore();
  });

  it('Deve deletar o video', async()=>{
    const expectedMessage = {
      mensagem: 'Video deletado com sucesso'
    };
    const elementId = {
      id: 'b0be69fa-ebc1-48dc-9bc7-ef471bda71b8'
    };


    const oldVideoInfo ={
      ...elementId,
      descricao: 'descricao teste',
      titulo: 'titulo teste',
      url: 'https://www.youtube.com/watch?v=oBB6GMjbiIE&ab_channel=CanalPeeWee'
    };

    
    // Criando mock de um findOne 
    videoRepositoryMock.expects('findOne')
    .withExactArgs(elementId)
    .resolves(oldVideoInfo);
 

    videoRepositoryMock.expects('delete')
    .withExactArgs(elementId)
    .resolves(expectedMessage);
    const result = await videoService.delete(elementId);

    expect(result).toEqual(expectedMessage);
  });

  it('Deve lançar um erro ao não encontrar o video', async()=>{
   
    const elementId = {
      id: 'b0be69fa-ebc1-48dc-9bc7-ef471bda71b8'
    };


    const expectResult = [];

    
    // Criando mock de um findOne 
    videoRepositoryMock.expects('findOne')
    .withExactArgs(elementId)
    .resolves(expectResult);

    await expect(videoService.delete(elementId)).rejects.toThrow('Video não encontrado.');
  });
});





