import { VideoService } from "../services/VideoService.js";
import {CrudControllerUtils} from "../../../utils/crud/crudControllerUtils.js";
import { ValitatorSchemaVideo } from "../validators/ValidatorSchemaVideo.js";
import { TokenVerificationMiddleware } from "../../app/middlewares/TokenVerificationMiddleware.js";

export class  VideosController extends CrudControllerUtils {
  constructor(){
    super();
    this.videoService = new VideoService();
    this.validatorSchema = new ValitatorSchemaVideo();
  }

  setupRouter(){
    this.freeVideo();
    super.setupRouter();
  }

  freeVideo(){
    this.router.get('/free', async (req, res, next) => {
     
      try {
        const videos = await this.videoService.findVideosFree();

        return res.status(200).send(videos);
      } catch (error) {
        next(error);
      }
    });
  }

  findAll(){
    this.router.get('/',TokenVerificationMiddleware.checkAuthToken, async (req, res, next) => {
     
      try {
        const filters = await this.validatorSchema.findAll(req.query);
        
        const videos = await this.videoService.findAll(filters);

        return res.status(200).send(videos);
      } catch (error) {
        next(error);
      }
    });
  }

  findOne(){
    this.router.get('/:id', TokenVerificationMiddleware.checkAuthToken, async (req, res, next)=>{
     try {
      const videoId = await this.validatorSchema.findOne(req.params);

      const video = await this.videoService.findOne(videoId);

      return res.status(200).send(video);
     } catch (error) {
      next(error);
     }
    });
  }

  create(){
    this.router.post('/', TokenVerificationMiddleware.checkAuthToken, async  (req, res, next)=>{
      try {
        const videoData = await this.validatorSchema.create(req.body);
        console.log();
        const newVideo = await this.videoService.create(videoData);

        return res.status(201).send(newVideo);
      } catch (error) {
        next(error);
      }
    });
  }

  update(){
    this.router.patch('/:id',TokenVerificationMiddleware.checkAuthToken, async (req, res, next)=>{
      try {
        const videoData = await this.validatorSchema.update({body: req.body, params: req.params});

        const videoUpdated = await this.videoService.update(videoData.params, videoData.body);

        return res.status(200).send(videoUpdated);

      } catch (error) {
        next(error);
      }
    });
  }

  delete(){
    this.router.delete('/:id',TokenVerificationMiddleware.checkAuthToken, async(req, res, next)=>{
      try {
        const videoId = await this.validatorSchema.delete(req.params);
        
        const resultMessageDelete = await this.videoService.delete(videoId);
        
        return res.status(200).send(resultMessageDelete);
      } catch (error) {
        next(error);
      }
    });
  }
}