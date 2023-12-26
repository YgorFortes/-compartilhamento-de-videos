import { VideosRepository } from "../repository/videosRepository.js";
import { CrudServiceUtils } from "../../../utils/crud/crudServiceUtils.js";
import { ValitatorSchemaVideo } from "../validators/ValitatorSchemaVideo.js";

export class VideoService extends CrudServiceUtils{
  constructor(){
    super();
    this.videoRepository = new VideosRepository();
    this.validatorSchema = new ValitatorSchemaVideo();
  }

  async findAll(filter){
   try {

    await this.validatorSchema.findAll(filter);
    
    const videos = await this.videoRepository.findAll(filter);
    return videos;

   } catch (error) {
    console.error(error);
    throw error;
   }
  }

  async findOne(elementId){
    try {
     await this.validatorSchema.findOne(elementId);

     const video = await this.videoRepository.findOne(elementId);

     if(!video){
      return [];
     }

     return video;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

}
