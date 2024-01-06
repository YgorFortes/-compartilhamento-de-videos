import { CrudRepositoryUtils } from "../../../utils/crud/crudRepositoryUtils.js";

export class VideosRepository extends CrudRepositoryUtils {
  
  findAll(){
    return this.prismaClient.videos.findMany();
  }

  findOne(videoId){
    const {id} = videoId;
    return this.prismaClient.videos.findUnique({
      where: {id}
    });
  }

  create(videoData){
    return this.prismaClient.videos.create({data: videoData});
  }

  update(videoId, videoData){
    const {id} = videoId;
    return this.prismaClient.videos.update(
      { 
        data: videoData, 
        where: {id} 
      },
    );
  }

  delete(videoId){
    const {id} = videoId;
    return this.prismaClient.videos.delete({
      where: {id}
    });
  }

  pagination(pageNumber){
    return this.prismaClient.videos.findMany({
      take: Number(5), // quantity of itens for page
      skip: (Number(pageNumber) - 1) * Number(5), // skip the itens of previous pages
    });
  }

  findVideosByFilters(filters){
    const {descricao, titulo, url} = filters;
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

 
}