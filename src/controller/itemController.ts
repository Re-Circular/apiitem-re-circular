import { Request, Response } from "express";
import ItemService from "../service/itemService";
import ItemDTO from "../model/dto/itemDTO";

export default class ItemController {
  private itemService = new ItemService();

  public save = async (request: Request, response: Response) => {
    try {
      const { name, description,category,statusConservation, availability, size } = request.body;
      
      
      const itemDTO = new ItemDTO(name, description,category,statusConservation, availability, size );

      const result = await this.itemService.save(itemDTO);
      response.status(201).send(result);
      console.log(result)
    } catch (error) {
      console.log(error)
    }
  }

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
};