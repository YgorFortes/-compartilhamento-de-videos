import { CrudRepositoryUtils } from "../../../utils/crud/crudRepositoryUtils.js";

export class VideosRepository extends CrudRepositoryUtils {
  
  findAll(filter){
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

  findOne(elementId){
    const {id} = elementId;
    console.log(id);
    return this.prismaClient.videos.findUnique({
      where: {id}
    });
  }
}