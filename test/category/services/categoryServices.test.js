/* eslint-disable import/no-extraneous-dependencies */
import {describe , expect, it, afterEach, beforeEach} from '@jest/globals';
import Sinon from 'sinon';
import { CategoryService } from '../../../src/modules/category/services/CategoryServices.js';


describe('Testando método findAll de CategoryService', ()=>{
  let categoryService;
  let categoryRepositoryMock;
  beforeEach(()=>{
    categoryService = new CategoryService();
    categoryRepositoryMock = Sinon.mock(categoryService.categoryRepository);
  });

  afterEach(()=>{
    categoryRepositoryMock.restore();
  });

  it('Deve chamar todos as categorias se filtro estiver vazio', async()=>{
    const filter = {};

    const expectCategories = [
      { id: 1, titulo: 'Titulo teste', cor: 'azul' },
      { id: 2, titulo: 'Outro titulo teste', cor: 'rosa' },
      { id:3, titulo: 'Mais um titulo teste', cor: 'Vermelho' }
    ];

    categoryRepositoryMock.expects('findAll')
    .withExactArgs()
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

    categoryRepositoryMock.expects('findVideosByFilters')
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

    categoryRepositoryMock.expects('findVideosByFilters')
    .withExactArgs(filter)
    .resolves(expectCategories);

    const startTime =  Date.now();

    const catetegories = await categoryService.findAll(filter);

    const endTime =  Date.now();

    expect(catetegories).toEqual(expectCategories);
    expect(endTime - startTime ).toBeLessThan(1000);
  });

  it('Deve fazer paginação de 5 itens por vez, e deve executar em um tempo aceitável ', async()=>{
    const filter = {page: 3};
    const {page} = filter;

    const itemsPerPage = 5;
    const startIndex = (page - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;

    const allCategory = [
      {id: 1, titulo: 'teste',  cor: 'cor teste'},
      {id: 2, titulo: 'teste 2', cor: 'cor teste 2' },
      {id: 3, titulo: 'novo titulo',  cor: 'nova cor' },
      {id: 4, titulo: 'novo titulo',  cor: 'nova cor' },
      {id: 5, titulo: 'novo titulo',  cor: 'nova cor' },
      {id: 6, titulo: 'novo titulo',  cor: 'nova cor' },
      {id: 7, titulo: 'novo titulo',  cor: 'nova cor' },
      {id: 8, titulo: 'novo titulo',  cor: 'nova cor' },
      {id: 9, titulo: 'novo titulo',  cor: 'nova cor' },
      {id: 10, titulo: 'novo titulo',  cor: 'nova cor' },
      {id: 11, titulo: 'novo titulo',  cor: 'nova cor' },
      {id: 12, titulo: 'novo titulo',  cor: 'nova cor' }
    ];
   
    const expectedCategory = allCategory.slice(startIndex, endIndex);

    categoryRepositoryMock.expects('pagination')
    .withExactArgs(page)
    .resolves(expectedCategory);

    const startTime =  Date.now();

    const categories = await categoryService.findAll(filter);
  
    categoryRepositoryMock.verify();
    
    const endTime =  Date.now();
   

    expect(endTime - startTime).toBeLessThan(1000);
    expect(categories).toEqual(expectedCategory);
    expect(categories.length).toEqual(expectedCategory.length);
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

  it('Deve executar dentro de um tempo aceitável', async()=>{
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

describe('Testando método create de CategoryService', ()=>{
  let categoryService;
  let categoryRepositoryMock;
  beforeEach(()=>{
    categoryService = new CategoryService();
    categoryRepositoryMock = Sinon.mock(categoryService.categoryRepository);
  });

  afterEach(()=>{
    categoryRepositoryMock.restore();
  });

  it('Deve criar uma nova categoria', async ()=>{

    const expectCategories = {
      id: 'fb01919e-10b1-46d6-977f-1a0aa5ed218f',
      titulo: 'Meu titulo',
      cor: 'Cor nova'
    };

    const elementBody = {
      titulo: 'Meu titulo',
      cor: 'Cor nova'
    };

    categoryRepositoryMock.expects('create').withExactArgs(elementBody).resolves(expectCategories);

    const newCategory = await categoryService.create(elementBody);

    categoryRepositoryMock.verify();

    expect(newCategory).toEqual(expectCategories);
  });

  it('Deve impedir de criar uma nova categoria se ela já existe', async()=>{
    const expectCategories = {
      id: 'fb01919e-10b1-46d6-977f-1a0aa5ed218f',
      titulo: 'Meu titulo',
      cor: 'Cor nova'
    };

    const elementBody = {
      titulo: 'Meu titulo',
      cor: 'Cor nova'
    };

    const expectedMessage = {
      message: 'Categoria já existe'
    };

    categoryRepositoryMock.expects('create').withExactArgs(elementBody).resolves(expectCategories);

    let newCategory;


    try {
      newCategory = await categoryService.create(elementBody);

      categoryRepositoryMock.verify();
      expect(newCategory).toEqual(expectCategories);
    } catch (error) {
      expect(error).toEqual(expectedMessage);
    }
   
  });

  it('Deve executar em um tempo aceitável', async()=>{
    const expectCategories = {
      id: 'fb01919e-10b1-46d6-977f-1a0aa5ed218f',
      titulo: 'Meu titulo',
      cor: 'Cor nova'
    };

    const elementBody = {
      titulo: 'Meu titulo',
      cor: 'Cor nova'
    };

    categoryRepositoryMock.expects('create').withExactArgs(elementBody).resolves(expectCategories);

    const startTime = new Date();

    const newCategory = await categoryService.create(elementBody);

    const endTime = new Date();

    categoryRepositoryMock.verify();

    expect(newCategory).toEqual(expectCategories);
    expect(endTime - startTime).toBeLessThan(1000);
  });
});

describe('Testando método update de CategoryService', ()=>{
  let categoryService;
  let categoryRepositoryMock;
  beforeEach(()=>{
    categoryService = new CategoryService();
    categoryRepositoryMock = Sinon.mock(categoryService.categoryRepository);
  });

  afterEach(()=>{
    categoryRepositoryMock.restore();
  });

  it('Deve fazer atualizar categoria', async()=>{

    const elementId= {
      id: 'ae0a60c0-8400-4e32-b923-b36c464a7b34',
    };
    
    const newInfoCategory = {
      
      titulo: 'novo titulo atualizado',
    };

    
    const oldCategoryInfo = {
      ...elementId,
      titulo: 'titulo teste',
      cor: 'Cor antiga'
    };

    const expectCategoryUpdate = {
      id: 'ae0a60c0-8400-4e32-b923-b36c464a7b34',
      titulo: 'novo titulo atualizado',
      cor: oldCategoryInfo.cor
    };

    // Criando mock de findOne
    categoryRepositoryMock.expects('findOne')
    .withExactArgs(elementId)
    .resolves(oldCategoryInfo);

    
    categoryRepositoryMock.expects('update').withExactArgs(elementId, newInfoCategory).resolves(expectCategoryUpdate);

    const categoryUpdated= await categoryService.update(elementId, newInfoCategory);

    categoryRepositoryMock.verify();

    expect(categoryUpdated).toEqual(expectCategoryUpdate);
  });

  it('Deve dar erro ao tentar atualizar uma categoria que não existe', async()=>{
    const elementId= {
      id: 'ae0a60c0-8400-4e32-b923-b36c464a7b34',
    };
    
  
    const oldCategoryInfo = [];

    // Criando mock de um findOne 
    categoryRepositoryMock.expects('findOne')
    .withExactArgs(elementId)
    .resolves(oldCategoryInfo);

    await expect(categoryService.update(elementId)).rejects.toThrow('Categoria não encontrado.');

  });

  it('Deve funcionar corretamente quando o método update é chamado várias vezes seguidas', async()=>{
    
    const elementId= {
      id: 'ae0a60c0-8400-4e32-b923-b36c464a7b34',
    };
    
    const newInfoCategory = {
      
      titulo: 'novo titulo atualizado',
    };

    
    const oldCategoryInfo = {
      ...elementId,
      titulo: 'titulo teste',
      cor: 'Cor antiga'
    };

    const expectCategoryUpdate = {
      id: 'ae0a60c0-8400-4e32-b923-b36c464a7b34',
      titulo: 'novo titulo atualizado',
      cor: oldCategoryInfo.cor
    };

    // Criando mock de findOne
    categoryRepositoryMock.expects('findOne')
    .withExactArgs(elementId)
    .resolves(oldCategoryInfo).twice();

    
    categoryRepositoryMock.expects('update').withExactArgs(elementId, newInfoCategory).resolves(expectCategoryUpdate).twice();

    const categoryUpdated1 = await categoryService.update(elementId, newInfoCategory);
    const categoryUpdated2 = await categoryService.update(elementId, newInfoCategory);

    categoryRepositoryMock.verify();

    expect(categoryUpdated1).toEqual(expectCategoryUpdate);
    expect(categoryUpdated2).toEqual(expectCategoryUpdate);
  });

  it('Deve executar o método update em um tempo aceitável', async()=>{
    const elementId= {
      id: 'ae0a60c0-8400-4e32-b923-b36c464a7b34',
    };
    
    const newInfoCategory = {
      
      titulo: 'novo titulo atualizado',
    };

    
    const oldCategoryInfo = {
      ...elementId,
      titulo: 'titulo teste',
      cor: 'Cor antiga'
    };

    const expectCategoryUpdate = {
      id: 'ae0a60c0-8400-4e32-b923-b36c464a7b34',
      titulo: 'novo titulo atualizado',
      cor: oldCategoryInfo.cor
    };

    // Criando mock de findOne
    categoryRepositoryMock.expects('findOne')
    .withExactArgs(elementId)
    .resolves(oldCategoryInfo);

    
    categoryRepositoryMock.expects('update').withExactArgs(elementId, newInfoCategory).resolves(expectCategoryUpdate);

    const startTime = new Date();

    const categoryUpdated= await categoryService.update(elementId, newInfoCategory);

    const endTime = new Date();

    categoryRepositoryMock.verify();

    expect(categoryUpdated).toEqual(expectCategoryUpdate);
    expect(endTime - startTime).toBeLessThan(1000);
  });

});

describe('Testando método delete de CategoryService',()=>{
  let categoryService;
  let categoryRepositoryMock;
  beforeEach(()=>{
    categoryService = new CategoryService();
    categoryRepositoryMock = Sinon.mock(categoryService.categoryRepository);
  });

  afterEach(()=>{
    categoryRepositoryMock.restore();
  });

  it('Deve deletar a categoria', async()=>{
    const expectedMessage = {
      mensagem: 'Categoria deletado com sucesso'
    };

    const elementId = {
      id: 'b0be69fa-ebc1-48dc-9bc7-ef471bda71b8'
    };

    

    const oldCategoryInfo ={
      ...elementId,
      titulo: 'titulo teste',
      cor: 'cor'
    };

    // Criando mock de um findOne 
    categoryRepositoryMock.expects('findOne')
    .withExactArgs(elementId)
    .resolves(oldCategoryInfo);

    categoryRepositoryMock.expects('delete')
    .withExactArgs(elementId)
    .resolves(expectedMessage);


    const result = await categoryService.delete(elementId);

    expect(result).toEqual(expectedMessage);
    
  });

  it('Deve lançar um erro ao não encontrar o video', async()=>{

    const elementId = {
      id: 'b0be69fa-ebc1-48dc-9bc7-ef471bda71b8'
    };

    const expectResult = [];

    // Criando mock de um findOne 
    categoryRepositoryMock.expects('findOne')
    .withExactArgs(elementId)
    .resolves(expectResult);

    await expect(categoryService.delete(elementId)).rejects.toThrow('Categoria não encontrado.');
  });

});






  
