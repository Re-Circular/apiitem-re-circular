import { Request, Response } from "express";
import ItemService from "../service/itemService";
import ItemDTO from "../model/dto/itemDTO";
import { request } from "node:http";

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
      size,
      longitude,
      latitude} = request.body;

      const itemDTO = new ItemDTO(name, description, category, statusConservation, availability, size, longitude, latitude);
      const newItem = await this.itemService.save(itemDTO);
  
      //se o formDate no insominia estiver preenchido com no máximo 5 fotos
      if (request.files && Array.isArray(request.files)) {
          const images = request.files.map((file) => ({
          pictureName: file.filename, // Nome salvo no Multer
          itemId: newItem.id,
        }));
    
      await this.itemService.saveImages(images);
      response.status(201).json(newItem);
      }
    } catch (error) {
      console.error("Erro ao salvar o item:", error);
     
    }
  };
  
  public getByName = async(request:Request, response:Response)=>{
    try{
      const {name}= request.params;
      const getByName= await this.itemService.getByName(name);
      if (getByName && getByName.message) {
        return response.status(404).json({ message: getByName.message});
      }
      response.status(200).json(getByName)
    }catch(error){
      response.status(404).send(error);
    }
  }
  public getAll = async(request:Request, response: Response)=> {
    try {
      const items = await this.itemService.getAll();
      
     response.status(200).json(items);
    } catch (error) {
      console.error("Erro ao buscar itens:", error);
      
    }
  }

  public deleteByName = async (request: Request, response: Response) => {
    try {
      const { name } = request.params; //via url
      const deletedItem = await this.itemService.deleteByName(name);
      response.status(204).send(deletedItem) //deletou com sucesso, o status 204 não retona conteudo
    } catch (error) {
     response.status(404).send(error) //se o item não for encontrado
    }
  };

  public deleteAll= async(request: Request, response:Response)=>{
    try{
      const deleteAll= await this.itemService.deleteAll();
      response.status(204).send(deleteAll)
    }catch(error){
      response.status(404).send(error);
    } 
  }

  public updateAvailability = async (request: Request, response: Response) => {
    try {
      const { name } = request.params;  
      const { availability } = request.body;  

      if (typeof availability !== 'boolean') {
         response.status(400).json({ message: "Informe um valor valido para a propriedade 'disponibilidade' " });
      }
      const updatedItem = await this.itemService.updateAvailability(name, availability);

      if (!updatedItem) {
        response.status(404).json({ message: "Item não encontrado." });
      }
      response.status(200).json(updatedItem);
    } catch (error) {
      console.error("Erro ao atualizar disponibilidade do item:", error);
      response.status(500).json({ message: "Erro ao atualizar a disponibilidade." });
    }
  };

  public getBySize = async(request:Request, response:Response)=>{
    try{
        const {size}= request.params;
        const itensSize= await this.itemService.getBySize(size)
        response.status(200).json(itensSize);
    }catch(error){
       response.status(404).send(error);
    } 
  }

  public getByConservation = async (request:Request, response:Response)=>{
    try{
      const {statusConservation}= request.params;
      const itensConservation= await this.itemService.getByConsevation(statusConservation);
      response.status(200).json(itensConservation);
    } catch(error){
      response.status(404).send(error);
   }}
};