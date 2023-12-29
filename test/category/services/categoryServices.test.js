/* eslint-disable import/no-extraneous-dependencies */
import {describe , expect, it, afterEach, beforeEach} from '@jest/globals';
import Sinon from 'sinon';
import { CategoryService } from '../../../src/modules/category/services/CategoryServices.js';


describe('Testando método findAl de CategoryService', ()=>{
  let categoryService;
  let categoryRepositoryMock;
  beforeEach(()=>{
    categoryService = new CategoryService();
    categoryRepositoryMock = Sinon.mock(categoryService.categoryRepository);
  });

  afterEach(()=>{
    categoryRepositoryMock.restore();
  });

  it('Deve chamar todos as categorias se filtro estiver undefined', async()=>{
    const filter = undefined;

    const expectCategories = [
      { id: 1, titulo: 'Titulo teste', cor: 'azul' },
      { id: 2, titulo: 'Outro titulo teste', cor: 'rosa' },
      { id:3, titulo: 'Mais um titulo teste', cor: 'Vermelho' }
    ];

    categoryRepositoryMock.expects('findAll')
    .withExactArgs(filter)
    .resolves(expectCategories);
    
    const categories = await categoryService.findAll(filter);

    categoryRepositoryMock.verify();

    expect(categories).toEqual(expectCategories);
  });

  it('Deve encontrar categorias de acordo com o filtro passado', async()=>{
    const filter = {titulo: 'anime', cor: 'rosa'};

    const allCategories = [
      { id: 1, titulo: 'Titulo teste', cor: 'azul' },
      { id: 2, titulo: 'Outro titulo teste', cor: 'rosa' },
      { id:3, titulo: 'Mais um titulo teste', cor: 'Vermelho' },
      { id:4, titulo: 'anime é demais', cor: 'Vermelho' }
    ];

    const expectCategories = allCategories.filter(categorie => categorie.titulo.includes(filter.titulo) || categorie.cor.includes(filter.cor) );

    categoryRepositoryMock.expects('findAll')
    .withExactArgs(filter)
    .resolves(expectCategories);
    
    const catetegories = await categoryService.findAll(filter);

    expect(catetegories).toEqual(expectCategories);
  });

  it('Deve execultar o método findAll em um tempo aceitável', async()=>{
    const filter = {titulo: 'anime', cor: 'rosa'};

    const allCategories = [
      { id: 1, titulo: 'Titulo teste', cor: 'azul' },
      { id: 2, titulo: 'Outro titulo teste', cor: 'rosa' },
      { id:3, titulo: 'Mais um titulo teste', cor: 'Vermelho' },
      { id:4, titulo: 'anime é demais', cor: 'Vermelho' }
    ];

    const expectCategories = allCategories.filter(categorie => categorie.titulo.includes(filter.titulo) || categorie.cor.includes(filter.cor) );

    categoryRepositoryMock.expects('findAll')
    .withExactArgs(filter)
    .resolves(expectCategories);

    const startTime =  Date.now();

    const catetegories = await categoryService.findAll(filter);

    const endTime =  Date.now();

    expect(catetegories).toEqual(expectCategories);
    expect(endTime - startTime ).toBeLessThan(1000);
  });
});

describe('Testando método findAll de CategoryService',()=>{

  let categoryService;
  let categoryRepositoryMock;
  beforeEach(()=>{
    categoryService = new CategoryService();
    categoryRepositoryMock = Sinon.mock(categoryService.categoryRepository);
  });

  afterEach(()=>{
    categoryRepositoryMock.restore();
  });

  it('Deve retornar um array vazio caso categoria não seja encontrada', async ()=>{
    const expectCategories = [];
    const elementId = {
      id: '707d4659-db44-464a-8d24-1cabcaed85d3'
    };

    categoryRepositoryMock.expects('findOne')
    .withExactArgs(elementId)
    .resolves(expectCategories);

    const catetegories = await categoryService.findOne(elementId);

    expect(catetegories).toEqual(expectCategories);
  });

  it('Deve retornar uma categoria conforme seu id', async()=>{
    const expectedCategory= {
      id: 'b0be69fa-ebc1-48dc-9bc7-ef471bda71b8',
      titulo: 'titulo teste',
      cor: 'cor teste',
    };

    const elementId = {
      id: 'b0be69fa-ebc1-48dc-9bc7-ef471bda71b8'
    };

    categoryRepositoryMock.expects('findOne')
    .withExactArgs(elementId)
    .resolves(expectedCategory);

    const video = await categoryService.findOne(elementId);

    expect(video).toEqual(expectedCategory);
    expect(video.id).toEqual(expectedCategory.id);
    expect(video).toHaveProperty('id', 'titulo','cor');
  });

  it('Deve executar dentro de um tempo aceitavél', async()=>{
    const expectedCategory= {
      id: 'b0be69fa-ebc1-48dc-9bc7-ef471bda71b8',
      titulo: 'titulo teste',
      cor: 'cor teste',
    };

    const elementId = {
      id: 'b0be69fa-ebc1-48dc-9bc7-ef471bda71b8'
    };

    categoryRepositoryMock.expects('findOne')
    .withExactArgs(elementId)
    .resolves(expectedCategory);

    const startTime = new Date();

    const video = await categoryService.findOne(elementId);

    const endTime = new Date();

    expect(video).toEqual(expectedCategory);
    expect(video.id).toEqual(expectedCategory.id);
    expect(video).toHaveProperty('id', 'titulo','cor');
    expect(endTime - startTime).toBeLessThan(1000);
  });
});


