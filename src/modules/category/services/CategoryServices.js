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

  async findAll(filter){
    try {
      const category = await this.categoryRepository.findAll(filter);

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
        return {message: 'Categoria deletado com sucesso'};
      }

    } catch (error) {
      throw error;
    }
  }
}