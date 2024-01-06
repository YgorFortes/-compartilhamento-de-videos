import { CrudServiceUtils } from "../../../utils/crud/crudServiceUtils.js";
import { CustomError } from "../../app/erros/CustomError.js";
import {CategoryRepository} from "../repository/CategoryRepository.js";
import { ValidatorSchemaCategory } from "../validators/ValidatorSchemaCategory.js";


export  class CategoryService extends CrudServiceUtils{
  constructor(){
    super();
    this.categoryRepository= new CategoryRepository();
    this.validatorSchemaCategory = new ValidatorSchemaCategory();
  }

  async findAll(filters){
    const {page} = filters;
    try {
      await this.validatorSchemaCategory.findAll(filters);

      const hasFilter = this.checkFilterProperties(filters);

      if(hasFilter){
        return this.categoryRepository.findVideosByFilters(filters);
      }

      if(page){
        return this.categoryRepository.pagination(page);
      }

      const category = await this.categoryRepository.findAll();

      return category;
    } catch (error) {
      throw error;
    }
  }

  async findOne(categoryId){
    try {
      await this.validatorSchemaCategory.findOne(categoryId);

      const category = await this.categoryRepository.findOne(categoryId);

      
      if(!category){
        return [];
      }

      return category;
    } catch (error) {
      throw error;
    }
  }

  async findVideosByCategory(categoryId){
    try {
      await this.validatorSchemaCategory.findVideosByCategory({id: categoryId});

      const videoByCategory = await this.categoryRepository.findVideosByCategory(categoryId);
  
      return {categoria: videoByCategory};
    } catch (error) {
      throw error;
    }
  }

  async create(categoryBody){
    try {
      await this.validatorSchemaCategory.create(categoryBody);

     const CategoryExists  = await this.categoryRepository.findForTitle(categoryBody.titulo);

     if(CategoryExists){
      throw new CustomError('Categoria já existe', 409);
     }

      const category = await this.categoryRepository.create(categoryBody);

      return category;

    } catch (error) {
      throw error;
    }
  }

  async update(categoryId, categoryBody){
    try {

      await this.validatorSchemaCategory.update({params: categoryId, body: categoryBody});

      const CategoryExists = await this.findOne(categoryId);

      if(CategoryExists.length <1 ){
        throw new CustomError('Categoria não encontrado.', 404);
      }

      const newInfoCategory = await this.categoryRepository.update(categoryId, categoryBody);
      
      return newInfoCategory;
    } catch (error) {
      throw error;
    }
  }

  async delete(categoryId){
    try {
      await this.validatorSchemaCategory.delete(categoryId);

      const category = await this.findOne(categoryId);
      
      if(category.length <1){
        throw new CustomError('Categoria não encontrado.', 404);
      }

      const result = await this.categoryRepository.delete(categoryId);

      if(result){
        return {mensagem: 'Categoria deletado com sucesso'};
      }

    } catch (error) {
      throw error;
    }
  }

  async findOrCreateTitle(categoryTitle){
    try {
      const category = await this.categoryRepository.findForTitle(categoryTitle);

      if(!category){
        const newCategory = await this.categoryRepository.create({titulo: categoryTitle, cor: 'cor'});
        return newCategory;
      }

      return category;
    } catch (error) {
      throw error;
    }
  }

  checkFilterProperties(filters) {

    /* 
      Verify if proprities descricao, titulo or url is put in query 
    */

    const hasFilter = Object.keys(filters).filter((filter)=> {
      if(filter === 'titulo' || filter === 'cor'){
        return true;
      }
      return false;
    }).length >0;

    return hasFilter;
  }
}