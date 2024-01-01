/* eslint-disable import/no-extraneous-dependencies */
import {describe , expect, it,  beforeEach} from '@jest/globals';

import { ValidatorSchemaCategory } from '../../../src/modules/category/validators/ValidatorSchemaCategory';

describe('Testando o método findAll de ValidatorSchemaCategory', ()=>{
  let validatorSchemaCategory;

  beforeEach(()=>{
    validatorSchemaCategory = new ValidatorSchemaCategory();
  });

  it('Deve validar se o querry params estão sem espaços entre as fim das frases, e todos os valores das propriedades devem ser minusculas ', async ()=>{
    const atribbutes = {
      titulo: ' TESTE ',
      cor: ' DESCRIÇÃO teste ',
    }; 

    const expectAtribbutes = {
      titulo: 'teste',
      cor: 'descrição teste',
    };

    const resultado = await validatorSchemaCategory.findAll(atribbutes);
    expect(resultado).toEqual(expectAtribbutes);
  });
});

describe('Testando o metodo findOne de ValidatorSchemaCategory ', ()=>{
  let validatorSchemaCategory;
  beforeEach(()=>{
    validatorSchemaCategory = new ValidatorSchemaCategory();
  });

  it('Deve retirar os espaços em branco do params', async()=>{
    const elementId = {
      id: 'b0be69fa-ebc1-48dc-9bc7-ef471bda71b8    '
    };

    const expectElementId = {
      id: 'b0be69fa-ebc1-48dc-9bc7-ef471bda71b8'
    };

    const resultado = await validatorSchemaCategory.findOne(elementId);
    expect(resultado).toEqual(expectElementId);
  });

  it('O campo elementId do params deve ser um UUID', async()=>{
    const elementId = {
      id: 'não é um UUID'
    };

    await expect(validatorSchemaCategory.findOne(elementId)).rejects.toThrow('O parâmetros elementId no params deve ser UUID válido.');
  });

  it('O campo elementId do params deve ser obrigatório', async()=>{
    const elementId = {
      id: null
    };
 
    await expect(validatorSchemaCategory.findOne(elementId)).rejects.toThrow('O parâmetros id no params é obigatório.');
  });

});

describe('Testando o método create de validatorSchemaCategory',()=>{
  let validatorSchemaCategory;
  beforeEach(()=>{
    validatorSchemaCategory = new ValidatorSchemaCategory();
  });

  it('Deve voltar todos os campos em minusculo e sem espaço', async()=>{
    const atribbutes = {
      titulo: ' TITULO SHOW ',
      cor: ' COR SHOW '
    };

    const expectAtribbutes = {
      titulo: 'titulo show',
      cor: 'cor show'
    };



    const resultado = await validatorSchemaCategory.create(atribbutes);
    expect(resultado).toEqual(expectAtribbutes);
    
  });

  it('Deve lançar um erro quando algum campo titulo não for colocado', async()=>{
    const expectAtribbutes = {
      cor: 'cor show'
    };

    await expect(validatorSchemaCategory.create(expectAtribbutes)).rejects.toThrow('O campo titulo é obrigatório.');
  });

  it('Deve lançar um erro quando algum campo cor não for colocado', async()=>{
    const expectAtribbutes = {
      titulo: 'titulo show',
    };

    await expect(validatorSchemaCategory.create(expectAtribbutes)).rejects.toThrow('O campo cor é obrigatório.');
  });


});

describe('Testa método delete de ValidatorSchemaSchemaCategory', ()=>{
  let validatorSchemaCategory;
  beforeEach(()=>{
    validatorSchemaCategory = new ValidatorSchemaCategory();
  });

  it('Deve retirar os espaços em branco do params', async()=>{
    const elementId = {
      id: 'b0be69fa-ebc1-48dc-9bc7-ef471bda71b8    '
    };

    const expectElementId = {
      id: 'b0be69fa-ebc1-48dc-9bc7-ef471bda71b8'
    };

    const resultado = await validatorSchemaCategory.findOne(elementId);
    expect(resultado).toEqual(expectElementId);
  });

  it('O campo elementId do params deve ser um UUID', async()=>{
    const elementId = {
      id: 'não é um UUID'
    };

    await expect(validatorSchemaCategory.findOne(elementId)).rejects.toThrow('O parâmetros elementId no params deve ser UUID válido.');
  });

  it('O campo elementId do params deve ser obrigatório', async()=>{
    const elementId = {
      id: null
    };
 
    await expect(validatorSchemaCategory.findOne(elementId)).rejects.toThrow('O parâmetros id no params é obigatório.');
  });
});