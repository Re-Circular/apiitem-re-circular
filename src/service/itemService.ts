import prisma from "../prisma/client";
import ItemDTO from "../model/dto/itemDTO";
import { StatusConservation } from "@prisma/client";
import ExceptionMiddleware from "../../apiusers-re-circular/src/middleware/ExceptionMiddleware";
import GenericException from "../../apiusers-re-circular/src/model/exceptions/GenericException";
import { equal } from "node:assert";


class ItemService {
  public save = async (itemDTO: ItemDTO) => {
    try {
      const newItem = await prisma.item.create({
        data: {
          name: itemDTO.name,
          description: itemDTO.description,
          category: itemDTO.category,
          statusConservation: itemDTO.statusConservation,
          availability: itemDTO.availability==='true',
          size: itemDTO.size,
          longitude: parseFloat(itemDTO.longitude),//aponta erro mas estão definidos no schem como float 
          latitude:parseFloat(itemDTO.latitude),
        
        },
      });

      return newItem;
    } catch (error) {
      console.log("Não foi possível salvar", error);
    }
  };

  public getAll = async () => {
    try {
      const items = await prisma.item.findMany({
        include: {
          imageItems: true, //se tiver imagens associadas ao item elas seram incluidas
        },
      });
      return items;
    } catch (error) {
      console.log("Não foi possível buscar o item", error); 
    }
  };


//filtros
public getBySize = async (size: string) => {
  console.log("Buscando itens com tamanho:", size)
  try {
    const items = await prisma.item.findMany({
      where: {
        size: size,
      },
      include: {
        imageItems: true, 
      },
    });

    if (items.length === 0) {
      return { message: "Nenhum item encontrado com esse tamanho." };
    }
    return items;
  } catch (error) {
    console.error("Erro ao buscar itens por tamanho:", error);
  }
};

public getByConsevation = async(statusConservation:StatusConservation) =>{
  console.log("Buscando itens com o estado de conservação:", StatusConservation)
  try {
    const items = await prisma.item.findMany({
      where: {
        statusConservation:statusConservation,
      },
      include: {
        imageItems: true, 
      },
    });

    if (items.length == 0) {
      return { message: "Nenhum item encontrado." };
    }
    return items;
  } catch (error) {
    console.error("Erro ao buscar itens", error);
  }
}


public getByName = async (name:string) => {
  try {
    const items = await prisma.item.findMany({
      where: {
        name:{
          equals:
            name
          
        } 
      },
      include: {
        imageItems: true, 
      },
    });
    if (items.length === 0) {
      return { message: "Nenhum item encontrado com esse nome." };
    }
    return items;
 
  } catch (error) {
    console.error("Erro ao buscar item por nome:", error);
    
  }
};

  //muda a propriedade de availability(disponibilidade) por meio do nome do item
public updateAvailability = async (name: string, availability: boolean) => {
    try {
      const updatedItem = await prisma.item.updateMany({
        where: {
          name: name, 
        },
        data: {
          availability: availability, // Atualizar o status de disponibilidade
        },
      });

      //se a ppropriedade count for igual a zero, o nosso item não foi encontrado no banco de dados
      //ou o item já possui o valor na propriedade availability igual ao que esta sendo passakdo
      if (updatedItem.count === 0) { 
        console.log(updatedItem.count)
        return null;
      } 
      return { message: "Disponibilidade atualizada com sucesso." };
    } catch (error) {
      console.error("Erro ao atualizar item:", error);    
    }
  };

  public deleteByName = async (name: string) => {
    try {
      // Tenta deletar o item
      const deletedItem = await prisma.item.deleteMany({
        where: {
          name: name,
        },
      });

        return deletedItem;
             } catch (error) {
              console.log(error)   
     
                
            }
         } 
     
 
  public deleteAll = async()=>{
    try{
      const deleteAll= await prisma.item.deleteMany();
      return deleteAll;
    }catch(error){
      console.log(error)
      return { message: "Erro ao buscar item." };
    }
  }

public saveImages = async (images: { pictureName: string; itemId: string }[]) => {
    try {
      const savedImages = await prisma.imageItem.createMany({
        data: images,
      });
      return savedImages;
    } catch (error) {
      console.error("Erro ao salvar imagens:", error);  
    }
  };

}

export default ItemService;
