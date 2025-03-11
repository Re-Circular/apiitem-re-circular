import { request, Request, Response } from "express";
import ItemService from "../service/itemService";
import ItemDTO from "../model/dto/itemDTO";


export default class ItemController {
private itemService = new ItemService();

//vai lidar com o salvamento das imagens, também
public save = async (request: Request, response: Response) => {
    try {
      const { 
      name,
      description,
      category, 
      statusConservation, 
      availability, 
      size} = request.body;

      const itemDTO = new ItemDTO(name, description, category, statusConservation, availability, size);
      const newItem = await this.itemService.save(itemDTO);
  
      //se o formDate no insominia estiver preenchido com no máximo 5 fotos
      if (request.files && Array.isArray(request.files)) {
          const images = request.files.map((file) => ({
          pictureName: file.filename, // Nome salvo no Multer
          itemId: newItem.id,
        }));
    
      await this.itemService.saveImages(images);
      }
  
      response.status(201).json(newItem);
    } catch (error) {
      console.error("Erro ao salvar item:", error);
      response.status(500).json({ message: "Erro ao salvar o item." });
    }
  };
  
  public getAll = async(request:Request, response: Response)=> {
    try {
      
      const items = await this.itemService.getAll();
      
      return response.status(200).json(items);
    } catch (error) {

      console.error("Erro ao buscar itens:", error);
      response.status(500).json({ message: "Não foi possível buscar os itens." });
    }
  }


  public deleteByName = async (request: Request, response: Response) => {
    try {
      const { name } = request.params; //via url

     
      const deletedItem = await this.itemService.deleteByName(name);
      response.status(200).json({ message: "Item deletado com sucesso.", deletedItem });  
    } catch (error) {
      console.error("Erro ao deletar item:", error);
      response.status(500).json({ message: "Não foi possível deletar o item." });  
    }
  };
  public deleteAll= async(request: Request, response:Response)=>{
    const deleteAll= await this.itemService.deleteAll();
    response.json(deleteAll);
  }

  public updateAvailability = async (request: Request, response: Response) => {
    try {
      const { name } = request.params;  
      const { availability } = request.body;  

      
      if (typeof availability !== 'boolean') {
        return response.status(400).json({ message: "Disponibilidade inválida. Deve ser um valor booleano." });
      }

      const updatedItem = await this.itemService.updateAvailability(name, availability);

      if (!updatedItem) {
        return response.status(404).json({ message: "Item não encontrado." });
      }

      return response.status(200).json(updatedItem);
    } catch (error) {
      console.error("Erro ao atualizar disponibilidade do item:", error);
      response.status(500).json({ message: "Erro ao atualizar a disponibilidade." });
    }
  };

  public getBySize = async(request:Request, response:Response)=>{
    const {size}= request.params;
    const itensSize= await this.itemService.getBySize(size)
    return response.json(itensSize);
  }

  public getByConservation = async (request:Request, response:Response)=>{
    const {statusConservation}= request.params;
    const itensConservation= await this.itemService.getByConsevation(statusConservation);
    return response.json(itensConservation);
  }
  

 
};