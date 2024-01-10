import {CrudControllerUtils} from "../../../utils/crud/crudControllerUtils.js";
import {CategoryService} from "../services/CategoryServices.js";
import { ValidatorSchemaCategory } from "../validators/ValidatorSchemaCategory.js";
import { TokenVerificationMiddleware } from "../../app/middlewares/TokenVerificationMiddleware.js";


export class CategoryController extends CrudControllerUtils{
  constructor(){
    super();
    this.categoryService = new CategoryService();
    this.validatorSchemaCategory = new ValidatorSchemaCategory();
    this.setupRouter(this.findVideosByCategory());
  }


  findAll(){
    this.router.get('/', TokenVerificationMiddleware.checkAuthToken, async (req, res, next )=>{
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
    this.router.get('/:id', TokenVerificationMiddleware.checkAuthToken, async (req, res, next)=>{
      try {
        const categoryId = await this.validatorSchemaCategory.findOne(req.params);
        
        const category = await this.categoryService.findOne(categoryId);

        return res.status(200).send(category);
      } catch (error) {
        next(error);
      }
    });
  }
  
  findVideosByCategory(){
    this.router.get('/:id/videos',TokenVerificationMiddleware.checkAuthToken, async(req, res, next)=>{
     try {
      const categoryId = await this.validatorSchemaCategory.findVideosByCategory(req.params);
      
      const VideoByCategory = await this.categoryService.findVideosByCategory(categoryId);

      return res.status(200).send(VideoByCategory);
      
     } catch (error) {
      next(error);
     }
    });
  }

  create(){
    this.router.post('/',TokenVerificationMiddleware.checkAuthToken, async(req, res, next)=>{
      try {
        const categoryBody = await this.validatorSchemaCategory.create(req.body);

        const newCategory = await this.categoryService.create(categoryBody);

        return res.status(201).send(newCategory);
      } catch (error) {
        next(error);
      }
    });
  }

  update(){
    this.router.patch('/:id', TokenVerificationMiddleware.checkAuthToken, async(req, res, next)=>{
      try {
        const categoryData = await this.validatorSchemaCategory.update({params: req.params, body: req.body});

        const catgoryUpdated = await this.categoryService.update(categoryData.params, categoryData.body);

        return res.status(200).send(catgoryUpdated);
      } catch (error) {
        next(error);
      }
    });
  }

  delete(){
    this.router.delete('/:id', TokenVerificationMiddleware.checkAuthToken, async(req, res, next)=>{
      try {
        const categoryId = await this.validatorSchemaCategory.delete(req.params);

        const result = await this.categoryService.delete(categoryId);

        return res.status(200).send(result);
      } catch (error) {
        next(error);
      }
    });
  }
}