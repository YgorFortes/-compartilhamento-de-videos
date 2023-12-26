/* eslint-disable import/no-extraneous-dependencies */

import {describe , expect, it, afterEach, beforeEach} from '@jest/globals';
import Sinon from 'sinon';
import { VideoService } from "../../services/VideoService.js";
import { ValitatorSchemaVideo } from '../../validators/ValitatorSchemaVideo.js';

describe('validateFilters', ()=>{
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

    const resultado = await valitatorSchemaVideo.validateFilters(atribbutes);
    expect(resultado).toEqual(expectAtribbutes);
  });

  it('A propriedade url do querry params deve ser um formato de url válido', async()=>{
    const atribbutes = {
      titulo: ' teste ',
      descricao: ' descrição teste ',
      url: 'não é uma url',
    }; 

    await expect(valitatorSchemaVideo.validateFilters(atribbutes)).rejects.toThrow('A url deve ser valida');
  });


 
});

describe('Testando VideoService', ()=>{
  let videoService;
  let videoRepositoryMock;

  beforeEach(()=>{
    videoService = new VideoService();
    videoRepositoryMock = Sinon.mock(videoService.videoRepository);
  });

  afterEach(()=>{
    videoRepositoryMock.restore();
  });

  it('Deve chamar todos os videos se filtro estiver nulo',async ()=>{
    const filter = {titulo: null};

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






