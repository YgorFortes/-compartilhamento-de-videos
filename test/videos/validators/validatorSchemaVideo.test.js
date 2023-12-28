/* eslint-disable import/no-extraneous-dependencies */
import {describe , expect, it,  beforeEach} from '@jest/globals';

import { ValitatorSchemaVideo } from '../../../src/modules/videos/validators/ValidatorSchemaVideo.js';

describe('Testando o método findAll de ValitatorSchemaVideo', ()=>{
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

describe('Testando o metodo findOne de ValitatorSchemaVideo ', ()=>{
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

describe('Testando o método create de ValitatorSchemaVideo', ()=>{
  let valitatorSchemaVideo;
  beforeEach(()=>{
    valitatorSchemaVideo = new ValitatorSchemaVideo();
  });
  
  it('Deve ter uma url valida no body da requisição', async()=>{
    const element = {
      descricao: 'descricao',
      titulo: 'titulo',
      url: 'não é uma url'
    };

    await expect(valitatorSchemaVideo.create(element)).rejects.toThrow('O campo url deve ter um formato válido.');
  });

  it('Deve retirar os espaços em branco do body da requisição', async()=>{
    const element = {
      descricao: ' descricao ',
      titulo: ' titulo ',
      url: ' https://www.youtube.com/watch?v=oBB6GMjbiIE&ab_channel=CanalPeeWee '
    };

    const elementExpect =  {
      descricao: 'descricao',
      titulo: 'titulo',
      url: 'https://www.youtube.com/watch?v=oBB6GMjbiIE&ab_channel=CanalPeeWee'
    };

    const result = await valitatorSchemaVideo.create(element); 
    expect(result).toEqual(elementExpect);
  });

  it('Deve validar todos os campos obrigátorios', async()=>{
    const withoutUrl = {
      descricao: 'descricao',
      titulo: 'titulo',
    };

    const withoutDescricao = {
      titulo: 'titulo',
      url: 'https://www.youtube.com/watch?v=oBB6GMjbiIE&ab_channel=CanalPeeWee'
    };

    const withoutTitulo = {
      descricao: 'descricao',
      url: 'https://www.youtube.com/watch?v=oBB6GMjbiIE&ab_channel=CanalPeeWee'
    };

    await expect(valitatorSchemaVideo.create(withoutUrl)).rejects.toThrow('O campo url é obigatório.');
    await expect(valitatorSchemaVideo.create(withoutDescricao)).rejects.toThrow('O campo descricao é obigatório.');
    await expect(valitatorSchemaVideo.create(withoutTitulo)).rejects.toThrow('O campo titulo é obigatório.');
  });

  it('Deve validar os campos se digitados corretamente', async()=>{
    const elementExpect =  {
      descricao: 'descricao',
      titulo: 'titulo',
      url: 'https://www.youtube.com/watch?v=oBB6GMjbiIE&ab_channel=CanalPeeWee'
    };

    const result = await valitatorSchemaVideo.create(elementExpect); 
    expect(result).toEqual(elementExpect);
  });

});

describe('Testando o método update de ValitatorSchemaVideo ',  ()=>{

  let valitatorSchemaVideo;
  beforeEach(()=>{
    valitatorSchemaVideo = new ValitatorSchemaVideo();
  });

  it('Deve retirar os espaços em branco do body ', async()=>{
    const videoData = {
        body: {
          titulo: 'Ronaldo test ',
          url: ' https://trello.com/c/e9pwuV1N/12-requisi%C3%A7%C3%A3o-para-atualizar-um-v%C3%ADdeo-pelo-id ',
          descricao: 'descricao'
        },
        params: { id: '2b37f2b1-448b-4924-88af-4fae372beb50 ' }
      };
    
       

    const elementExpect =  {
      body: {
        titulo: 'Ronaldo test',
        url: 'https://trello.com/c/e9pwuV1N/12-requisi%C3%A7%C3%A3o-para-atualizar-um-v%C3%ADdeo-pelo-id',
        descricao: 'descricao'
      },
      params: { id: '2b37f2b1-448b-4924-88af-4fae372beb50' }
    };

    const result = await valitatorSchemaVideo.update(videoData); 
    expect(result).toEqual(elementExpect);
  });

  it('Deve ser uma url válida, e id deve ser do tipo UUID', async()=>{
    const videoData = {
      body: {
        titulo: 'Ronaldo test ',
        url: 'não é uma url',
        descricao: 'descricao'
      },
      params: { id: '2b37f2b1-448b-4924-88af-4fae372beb50 ' }
    };

    const videoData2 = {
      body: {
        titulo: 'Ronaldo test ',
        url: 'https://trello.com/c/e9pwuV1N/12-requisi%C3%A7%C3%A3o-para-atualizar-um-v%C3%ADdeo-pelo-id ',
        descricao: 'descricao'
      },
      params: { id: '1' }
    };
    
    
    await expect(valitatorSchemaVideo.update(videoData)).rejects.toThrow('O campo url deve ter um formato válido.');
    await expect(valitatorSchemaVideo.update(videoData2)).rejects.toThrow('O parâmetros elementId no params deve ser UUID válido.');
  });

  it('Deve validar se todos os campos são válidos', async()=>{
    const videoData = {
      body: {
        titulo: 'Ronaldo test',
        url: 'https://trello.com/c/e9pwuV1N/12-requisi%C3%A7%C3%A3o-para-atualizar-um-v%C3%ADdeo-pelo-id',
        descricao: 'descricao'
      },
      params: { id: '2b37f2b1-448b-4924-88af-4fae372beb50' }
    };

    const result = await valitatorSchemaVideo.update(videoData); 
    expect(result).toEqual(videoData);
  });

  

});

describe('Testando o método delete de ValitatorSchemaVideo', ()=>{
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

    const resultado = await valitatorSchemaVideo.delete(elementId);
    expect(resultado).toEqual(expectElementId);
  });

  it('O campo elementId do params deve ser um UUID', async()=>{
    const elementId = {
      id: 'não é um UUID'
    };

    await expect(valitatorSchemaVideo.delete(elementId)).rejects.toThrow('O parâmetros elementId no params deve ser UUID válido.');
  });

  it('O campo elementId do params deve ser obrigatório', async()=>{
    const elementId = {
      id: null
    };
 
    await expect(valitatorSchemaVideo.delete(elementId)).rejects.toThrow('O parâmetros id no params é obigatório.');
  });
});
