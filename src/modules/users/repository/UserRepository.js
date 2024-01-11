import { CrudRepositoryUtils } from "../../../utils/crud/crudRepositoryUtils.js";

export class UserRepository extends CrudRepositoryUtils {

  findAll (){
    return this.prismaClient.usuarios.findMany();
  }

  findOne (userId){
    return this.prismaClient.usuarios.findUnique({
      where: {id: userId}
    });
  }

  create (newInfoUser){
    return this.prismaClient.usuarios.create({
      data: {
        ...newInfoUser
      },
      select: {
        id: true,
        login: true,
        email: true,
        createdAt: true,
        updatedAt: true
      } 
    });
  
  }

  async countAllExceptId(idUsuario, email, login){
    const conditions = {
      NOT: {
        id: idUsuario,
      },
      OR: [
        login ? { login: { equals: login } } : {},
        email ? { email: { equals: email } } : {},
      ],
    };

    return this.prismaClient.usuarios.count({
      where: conditions
    });
  }
  

  
  update (useInfoData, idUsuario ){
    return this.prismaClient.usuarios.update({
      data: useInfoData, 
      where: {id: idUsuario} ,
      select: {
        id: true,
        login: true,
        email: true,
        createdAt: true,
        updatedAt: true
      } 
    });
  }

  delete (){

  }

  findByLogin (login){
    return this.prismaClient.usuarios.findUnique({
      where: {login}
    });
  }

  findByEmail (email){
    return this.prismaClient.usuarios.findUnique({
      where: {email}
    });
  }
}