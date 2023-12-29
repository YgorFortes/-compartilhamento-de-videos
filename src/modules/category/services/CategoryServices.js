import { CrudServiceUtils } from "../../../utils/crud/crudServiceUtils.js";
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
}