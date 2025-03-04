import prisma from "../prisma/client";
import ItemDTO from "../model/dto/itemDTO";


class ItemService {
  public save = async (itemDTO: ItemDTO) => {
    try {
      const newItem = await prisma.item.create({
        data: {
          name: itemDTO.name,
          description: itemDTO.description,
          category: itemDTO.category,
         statusConservation: itemDTO.statusConservation,
          availability: itemDTO.availability,
          size: itemDTO.size
        }
      });
      return newItem;
    } catch (error) {
      console.error("Erro ao salvar item:", error);
     
    }
  };

  public getAll = async () => {
    try {
      const items = await prisma.item.findMany();
        return items;
       
  }catch(error){
    console.log("Erro ao buscar por item", error)
    
  };
}



///public getByName, getBySize, getByCategory 

public deleteByName = async (name: string) => {
  try {
    const deletedItem = await prisma.item.deleteMany({
      where: {
        name: name,  
      },
    });


    return deletedItem;
  } catch (error) {
    console.log("Erro ao apagar item:", error);
   
  }
};

public updateAvailability = async (name: string, availability: boolean) => {
  try {
    const updatedItem = await prisma.item.updateMany({
      where: {
        name: name,  // Procurar o item pelo nome
      },
      data: {
        availability: availability,  // Atualizar o status de disponibilidade
      },
    });

    if (updatedItem.count === 0) {
      return null;
    }//se nenhum item for encontrado

    return { message: "Disponibilidade atualizada com sucesso." };
  } catch (error) {
    console.error("Erro ao atualizar item:", error);
   
  }
};}

export default ItemService;
