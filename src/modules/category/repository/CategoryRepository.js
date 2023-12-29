import { CrudRepositoryUtils } from "../../../utils/crud/crudRepositoryUtils.js";

export  class CategoryRepository extends CrudRepositoryUtils{
 

  findAll(filter){
    const  hasFilter = Object.values(filter).length > 0;

    if(hasFilter){
      const { titulo, cor } = filter;
      return this.prismaClient.categorias.findMany({
        where: {
          OR: [
            { titulo: {contains: titulo} },
            { cor: {contains: cor } }
          ]
        }
      });
    }

    return this.prismaClient.categorias.findMany();
  }

}

