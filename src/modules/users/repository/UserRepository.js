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

  create (){

  }

  update (){

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