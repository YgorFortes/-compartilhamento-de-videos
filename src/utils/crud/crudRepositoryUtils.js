import { PrismaClient } from "@prisma/client";
import { CrudServiceUtils } from "./crudServiceUtils.js";

export class CrudRepositoryUtils extends CrudServiceUtils{
  constructor(){
    super ();
    this.prismaClient = new PrismaClient();
  }
}