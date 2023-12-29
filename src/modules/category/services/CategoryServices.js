import { CrudServiceUtils } from "../../../utils/crud/crudServiceUtils.js";
import {CategoryRepository} from "../repository/CategoryRepository.js";


export  class CategoryService extends CrudServiceUtils{
  constructor(){
    super();

    this.categoryRepository= new CategoryRepository();
  }

  async findAll(filter){
    try {
      const category = await this.categoryRepository.findAll(filter);

      return category;
    } catch (error) {
      throw error;
    }
  }
}