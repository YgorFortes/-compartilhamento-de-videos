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
    console.log(endTime - startTime);
    console.time(endTime);

    expect(catetegories).toEqual(expectCategories);
    expect(endTime - startTime ).toBeLessThan(1000);
  });
});


