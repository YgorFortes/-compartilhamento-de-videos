import { CrudRepositoryUtils } from "../../../utils/crud/crudRepositoryUtils.js";

export class VideosRepository extends CrudRepositoryUtils {
  
  async findAll(filter){
    /* 
      Verify if filter has values in object 
    */
    const hasFilter = Object.values(filter).length > 0;

    if(hasFilter){
      const {descricao, titulo, url} = filter;
    
      return this.prismaClient.videos.findMany({
        where: {
          OR: [
            { descricao: { contains: descricao } },
            { titulo: { contains: titulo } },
            { url: { contains: url } }
          ]
        }
      });
    }

    return this.prismaClient.videos.findMany();
  }

  async findOne(videoId){
    const {id} = videoId;
    return this.prismaClient.videos.findUnique({
      where: {id}
    });
  }

  async create(videoData){
    return this.prismaClient.videos.create({data: videoData});
  }

  async update(videoId, videoData){
    const {id} = videoId;
    return this.prismaClient.videos.update(
      { 
        data: videoData, 
        where: {id} 
      },
    );
  }

  async delete(videoId){
    const {id} = videoId;
    return this.prismaClient.videos.delete({
      where: {id}
    });
  }
  
}