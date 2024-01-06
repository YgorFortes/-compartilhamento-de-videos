import { CrudRepositoryUtils } from "../../../utils/crud/crudRepositoryUtils.js";

export  class CategoryRepository extends CrudRepositoryUtils{
 

  findAll(){
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

  findVideosByCategory(categoryId){
    return this.prismaClient.categorias.findMany({
      where: {id: categoryId},
      include: {
        videos: {
          select: {
            id: true,
            titulo: true,
            descricao: true,
            url: true
          }
        },
      },
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

  
  pagination(pageNumber){
    return this.prismaClient.categorias.findMany({
      take: Number(5), // quantity of itens for page
      skip: (Number(pageNumber) - 1) * Number(5), // skip the itens of previous pages
    });
  }

  findVideosByFilters(filters){
    const { titulo, cor } = filters;
    return this.prismaClient.categorias.findMany({
      where: {
        OR: [
          { titulo: { contains: titulo } },
          { cor: { contains: cor } }
        ]
      }
    });
  }

}

