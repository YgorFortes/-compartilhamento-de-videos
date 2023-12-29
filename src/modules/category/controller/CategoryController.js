import {CrudControllerUtils} from "../../../utils/crud/crudControllerUtils.js";
import {CategoryService} from "../services/CategoryServices.js";
import { ValidatorSchemaCategory } from "../validators/ValidatorSchemaCategory.js";


export class CategoryController extends CrudControllerUtils{
  constructor(){
    super();
    this.categoryService = new CategoryService();
    this.validatorSchemaCategory = new ValidatorSchemaCategory();
  }

  findAll(){
    this.router.get('/', async (req, res, next )=>{
      try {

        const filter = await this.validatorSchemaCategory.findAll(req.query);

        const categories = await this.categoryService.findAll(filter);

        return res.status(200).send(categories);
      } catch (error) {
        next(error);
      }
    });
  };

  findOne(){
    this.router.get('/:id', async (req, res, next)=>{
      try {
        const categoryId = await this.validatorSchemaCategory.findOne(req.params);
        
        const category = await this.categoryService.findOne(categoryId);

        return res.status(200).send(category);
      } catch (error) {
        next(error);
      }
    });
  }
}