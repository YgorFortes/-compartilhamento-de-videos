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
    };

    return this.prismaClient.categorias.findMany();
  }

  findOne(categoryId){
    const {id} = categoryId;

    return this.prismaClient.categorias.findUnique({
      where: {id}
    });
  };

  findForTitle(title){
    return this.prismaClient.categorias.findFirst({
      where: {titulo: title}
    });
  }

  create(newInfoCategory){
    return this.prismaClient.categorias.create({
      data: {
        ...newInfoCategory
      }
    });
  }

  update(categoryId, categoryData){
    const {id} = categoryId;
    return this.prismaClient.categorias.update({
      data: categoryData, 
      where: {id} 
    });
  }

  delete(categoryId){
    const {id} = categoryId;
    return this.prismaClient.categorias.delete({
      where: {id}
    });
  }

}

