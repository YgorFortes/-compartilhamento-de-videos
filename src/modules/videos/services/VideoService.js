import { VideosRepository } from "../repository/videosRepository.js";
import { CrudServiceUtils } from "../../../utils/crud/crudServiceUtils.js";
import { ValitatorSchemaVideo } from "../validators/ValidatorSchemaVideo.js";
import { CustomError } from "../../app/erros/CustomError.js";

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
    throw error;
   }
  }

  async findOne(videoId){
    try {
     await this.validatorSchema.findOne(videoId);

     const video = await this.videoRepository.findOne(videoId);

     if(!video){
      return [];
     }

     return video;
    } catch (error) {
      throw error;
    }
  }

  async create(videoData){
    try {
      await this.validatorSchema.create(videoData);
      
      const newVideo = await this.videoRepository.create(videoData);

      if(!newVideo){
        throw CustomError('Não foi possível cadastrar o video', );
      }

      return newVideo;
    } catch (error) {
      throw error;
    }
  }

  async update(videoId, videoData){
    try {

      await this.validatorSchema.update({params: videoId, body: videoData});

      const video = await this.findOne(videoId);

      if(video.length <1){
        throw new CustomError('Video não encontrado.', 404);
      }

      const newInfoVideo = await this.videoRepository.update(videoId, videoData);

      return newInfoVideo;

    } catch (error) {
      throw error;
    }
  }

}
