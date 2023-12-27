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

  it('Deve chamar todos os videos se filtro estiver undefined',async ()=>{
    const filter = {titulo: undefined};

    const expectedVideos = [
      {id: 1, titulo: 'teste', descricao: 'descrição teste', url: 'url teste'},
      {id: 2, titulo: 'teste 2', descricao: 'descrição test 2', url: 'url teste 2' }
    ];


    videoRepositoryMock.expects('findAll')
    .withExactArgs(filter)
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


    videoRepositoryMock.expects('findAll')
    .withExactArgs(filter)
    .resolves(expectedVideos);


    const videos = await videoService.findAll(filter);
    videoRepositoryMock.verify();
    expect(videos).toEqual(expectedVideos);
  });

  it('Deve executar dentro de um tempo aceitavél', async()=>{

    const filter = {titulo: 'teste'};

    const allVideos = [
      {id: 1, titulo: 'teste', descricao: 'descrição teste', url: 'url teste'},
      {id: 2, titulo: 'teste 2', descricao: 'descrição test 2', url: 'url teste 2' },
      {id: 3, titulo: 'novo titulo', descricao: 'nova descricao', url: 'nova url' }
    ];

    const expectedVideos = allVideos.filter(video => video.titulo.includes(filter.titulo));


    videoRepositoryMock.expects('findAll')
    .withExactArgs(filter)
    .resolves(expectedVideos);

    const startTime =  Date.now();

    const newVideo = await videoService.findAll(filter);

    const endTime =  Date.now();

    expect(newVideo).toEqual(expectedVideos);
    expect(endTime - startTime).toBeLessThan(1000); 
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

    const video = await videoService.findAll(elementId);

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

  it('Deve executar dentro de um tempo aceitavél', async() =>{
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

  beforeEach(()=>{
    videoService = new VideoService();
    videoRepositoryMock = Sinon.mock(videoService.videoRepository);
  });
  
  afterEach(()=>{
    videoRepositoryMock.restore();
  });

  it('Deve criar um novo vídeo', async()=>{

    const element = {
      descricao: 'descricao teste',
      titulo: 'titulo teste',
      url: 'https://www.youtube.com/watch?v=oBB6GMjbiIE&ab_channel=CanalPeeWee'
    };

    const expectNewVideo = {
      id: '2b37f2b1-448b-4924-88af-4fae372beb50',
      descricao: 'descricao teste',
      titulo: 'titulo teste',
      url: 'https://www.youtube.com/watch?v=oBB6GMjbiIE&ab_channel=CanalPeeWee'
    };



    videoRepositoryMock.expects('create').withExactArgs(element).resolves(expectNewVideo);

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
      url: 'https://www.youtube.com/watch?v=oBB6GMjbiIE&ab_channel=CanalPeeWee'
    };

    const expectNewVideo ={
      id: '2b37f2b1-448b-4924-88af-4fae372beb50',
      ...element
    };

    videoRepositoryMock.expects('create').withExactArgs(element).resolves(expectNewVideo).twice();;

    const newVideo1 = await videoService.create(element);
    const newVideo2 = await videoService.create(element);

    videoRepositoryMock.verify();

    expect(newVideo1).toEqual(expectNewVideo);
    expect(newVideo2).toEqual(expectNewVideo);
  });
  

  it('Deve executar dentro de um tempo aceitavél', async()=>{
    const element = {
      descricao: 'descricao teste',
      titulo: 'titulo teste',
      url: 'https://www.youtube.com/watch?v=oBB6GMjbiIE&ab_channel=CanalPeeWee'
    };

    const expectNewVideo ={
      id: '2b37f2b1-448b-4924-88af-4fae372beb50',
      ...element
    };

    videoRepositoryMock.expects('create').withExactArgs(element).resolves(expectNewVideo);

    const startTime =  Date.now();

    const newVideo = await videoService.create(element);

    const endTime =  Date.now();

    expect(newVideo).toEqual(expectNewVideo);
    expect(endTime - startTime).toBeLessThan(1000); 
  });


});





