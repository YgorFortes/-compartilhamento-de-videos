import { VideoService } from "../services/VideoService.js";
import CrudControllerUtils from "../../../utils/crud/crudControllerUtils.js";
import { ValitatorSchemaVideo } from "../validators/ValidatorSchemaVideo.js";
 
export class  VideosController extends CrudControllerUtils {
  constructor(){
    super();
    this.videoService = new VideoService();
    this.validatorSchema = new ValitatorSchemaVideo();
  }

  findAll(){
    this.router.get('/', async (req, res, next) => {
      try {
        
        const filter = await this.validatorSchema.findAll(req.query);
        
        const videos = await this.videoService.findAll(filter);

        return res.status(200).send(videos);
      } catch (error) {
        next(error);
      }
    });
  }

  findOne(){
    this.router.get('/:id', async (req, res, next)=>{

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
    this.router.post('/', async (req, res, next)=>{
      try {
        const videoData = await this.validatorSchema.create(req.body);

        const newVideo = await this.videoService.create(videoData);

        return res.status(201).send(newVideo);
      } catch (error) {
        next(error);
      }
    });
  }
}