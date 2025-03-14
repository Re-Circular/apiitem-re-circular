import prisma from "../prisma/client";

class PropostaService {
  async createProposta(descricao: string, itemId: string) {
    return await prisma.proposta.create({
      data: {
        descricao,
        itemId  
      },
      include: { item: true },
    });
  }

  async getAll() {
        return await prisma.proposta.findMany({
            include: { 
                item: true
            }
        });
  }

  //async getById(id: number) {
       // return await prisma.proposta.findUnique({
           // where: {id },
          //  include: { item: true },
       // });
    //}

  async updateItemProposta(id: string, descricao: string) {
        return await prisma.proposta.update({
          where: { id },
          data: { descricao },
          include: { item: true },
          });
  }

  async deletarProposta(id:string) {
        return await prisma.proposta.delete({
            where: { id } 
        });
    }
   
}

export default new PropostaService();
