/* eslint-disable import/no-extraneous-dependencies */

import {describe , expect, it, afterEach, beforeEach} from '@jest/globals';
import Sinon from 'sinon';
import { VideoService } from "../../services/VideoService.js";
import { ValitatorSchemaVideo } from '../../validators/ValitatorSchemaVideo.js';

describe('Deve validar o findAll de ValitatorSchemaVideo', ()=>{
  let valitatorSchemaVideo;

  beforeEach(()=>{
    valitatorSchemaVideo = new ValitatorSchemaVideo();
  });

  it('Deve validar se o querry params estão sem espaços entre as fim das frases', async ()=>{
    const atribbutes = {
      titulo: ' teste ',
      descricao: ' descrição teste ',
      url: ' https://www.w3schools.com/jsref/jsref_includes_array.asp',
    }; 

    const expectAtribbutes = {
      titulo: 'teste',
      descricao: 'descrição teste',
      url: 'https://www.w3schools.com/jsref/jsref_includes_array.asp',
    };

    const resultado = await valitatorSchemaVideo.findAll(atribbutes);
    expect(resultado).toEqual(expectAtribbutes);
  });

  it('A propriedade url do querry params deve ser um formato de url válido', async()=>{
    const atribbutes = {
      titulo: ' teste ',
      descricao: ' descrição teste ',
      url: 'não é uma url',
    }; 

    await expect(valitatorSchemaVideo.findAll(atribbutes)).rejects.toThrow('A url deve ser valida');
  });
});

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
});

describe('Deve validar o metodo findOne de ValitatorSchemaVideo ', ()=>{
  let valitatorSchemaVideo;
  beforeEach(()=>{
    valitatorSchemaVideo = new ValitatorSchemaVideo();
  });

  it('Deve retirar os espaços em branco do params', async()=>{
    const elementId = {
      id: 'b0be69fa-ebc1-48dc-9bc7-ef471bda71b8    '
    };

    const expectElementId = {
      id: 'b0be69fa-ebc1-48dc-9bc7-ef471bda71b8'
    };

    const resultado = await valitatorSchemaVideo.findOne(elementId);
    expect(resultado).toEqual(expectElementId);
  });

  it('O campo elementId do params deve ser um UUID', async()=>{
    const elementId = {
      id: 'não é um UUID'
    };

    await expect(valitatorSchemaVideo.findOne(elementId)).rejects.toThrow('O parâmetros elementId no params deve ser UUID válido.');
  });

  it('O campo elementId do params deve ser obrigatório', async()=>{
    const elementId = {
      id: null
    };
 
    await expect(valitatorSchemaVideo.findOne(elementId)).rejects.toThrow('O parâmetros id no params é obigatório.');
  });

});

describe('testando método findOne de VideoService', ()=>{
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

});







//   videoRepositoryMock.expects('findAll')
//   .withExactArgs(filter)
//   .resolves(expectedVideos);

//   const videos = await videoService.findAll(filter);
//   videoRepositoryMock.verify();
//   expect(videos).toEqual(expectedVideos);
// });

// it('Deve encontrar os videos de acordo com o filtro passado', async ()=>{
//   const filter = {titulo: 'teste'};

//   const allVideos = [
//     {id: 1, titulo: 'teste', descricao: 'descrição teste', url: 'url teste'},
//     {id: 2, titulo: 'teste 2', descricao: 'descrição test 2', url: 'url teste 2' },
//     {id: 3, titulo: 'novo titulo', descricao: 'nova descricao', url: 'nova url' }
//   ];

//   const expectedVideos = allVideos.filter(video => video.titulo.includes(filter.titulo));


//   videoRepositoryMock.expects('findAll')
//   .withExactArgs(filter)
//   .resolves(expectedVideos);


//   const videos = await videoService.findAll(filter);
//   videoRepositoryMock.verify();
//   expect(videos).toEqual(expectedVideos);
// });