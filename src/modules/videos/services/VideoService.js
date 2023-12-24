import { VideosRepository } from "../repository/videosRepository.js";
import { CrudServiceUtils } from "../../../utils/crud/crudServiceUtils.js";

export class VideoService extends CrudServiceUtils{
  constructor(){
    super();
    this.videoRepository = new VideosRepository();
  }

  async findAll(filter){
   try {

    const videos = await this.videoRepository.findAll(filter);
    return videos;

   } catch (error) {
    console.error(error);
    throw error;
   }
  }

}
