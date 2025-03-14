import { Request, Response } from "express";
import ItemService from "../service/itemService";
import ItemDTO from "../model/dto/itemDTO";
import {z} from 'zod'
import prisma from "../prisma/client";
import { getByConservationSchema, getByNameSchema, getBySizeSchema, itemSchema, updateAvailabilitySchema } from "../validation/zodValidation";

import { StatusConservation } from "../model/IItem";
export default class ItemController {
private itemService = new ItemService();


public save = async (request: Request, response: Response) => {
  try {
    // Validação com Zod
    const parsedData = itemSchema.parse(request.body); // Valida e faz a transformação dos dados

    // Criando o DTO com os dados validados
    const itemDTO = new ItemDTO(
      parsedData.name,
      parsedData.description,
      parsedData.category,
      parsedData.statusConservation,
      parsedData.availability,
      parsedData.size,
      parsedData.longitude,
      parsedData.latitude
    );

    // Criando o item no banco de dados
    const newItem = await prisma.item.create({
      data: {
        name: itemDTO.name,
        description: itemDTO.description,
        category: itemDTO.category,
        statusConservation: itemDTO.statusConservation,
        availability: itemDTO.availability!== undefined ? itemDTO.availability : true, //inicializa com true podendo mudar com o metodo mais tarde
        size: itemDTO.size,
        longitude: itemDTO.longitude,
        latitude: itemDTO.latitude,
      },
    });

    console.log(newItem);

    // Se o formData no Insomnia estiver preenchido com no máximo 5 fotos
    if (request.files && Array.isArray(request.files)) {
      const images = request.files.map((file) => ({
        pictureName: file.filename, // Nome salvo no Multer
        itemId: newItem.id, // Usando o id do novo item criado
      }));

      await this.itemService.saveImages(images);
      console.log(images);
      return response.status(201).json(newItem);
    }
  } catch (error) {
    if (error instanceof z.ZodError) {
      return response.status(400).json({
        message: "Erro de validação",
        errors: error.errors, // Envia os erros de validação
      });
    }
    console.error("Erro ao salvar o item:", error);
    return response.status(500).json({ message: "Erro interno ao salvar o item." });
  }
}

  
  public getByName = async(request:Request, response:Response)=>{
    try{
      const { name } = getByNameSchema.parse(request.params);

      const getByName = await this.itemService.getByName(name);
      if (!getByName) {
        return response.status(404).json({ message: "Item não encontrado" });
      }
      response.status(200).json(getByName);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return response.status(400).json({
          message: "Erro de validação",
          errors: error.errors,
        });
      }
      console.error("Erro ao buscar item por nome:", error);
      response.status(500).json({ message: "Erro interno ao buscar o item." });
    }
  };
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
    const parsedData = updateAvailabilitySchema.parse(request.body);
    const { name } = request.params;

    const updatedItem = await this.itemService.updateAvailability(name, parsedData.availability);
    if (!updatedItem) {
    return response.status(404).json({ message: "Item não encontrado." });
    }
    
    return response.status(200).json(updatedItem);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return response.status(400).json({
        message: "Erro de validação",
        errors: error.errors,
      });
    }
    console.error("Erro ao atualizar disponibilidade do item:", error);
    return response.status(500).json({ message: "Erro ao atualizar a disponibilidade." });
  }
};


public getBySize = async (request: Request, response: Response) => {
  try {
 
    const { size } = getBySizeSchema.parse(request.body);
    const itemSize = await this.itemService.getBySize(size);

    if (!itemSize) {
      return response.status(404).json({ message: "Nenhum item encontrado com esse tamanho." });
    }

    console.log(itemSize);
    response.status(200).json(itemSize);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return response.status(400).json({
        message: "Erro de validação",
        errors: error.errors,
      });
    }
    console.error("Erro ao buscar item por tamanho:", error);
    response.status(500).json({ message: "Erro interno ao buscar o item." });
  }
};


  public getByConservation = async (request:Request, response:Response)=>{
    try{
      const {statusConservation}= getByConservationSchema.parse(request.params);
      const itensConservation= await this.itemService.getByConservation(statusConservation);

      return response.status(200).json(itensConservation);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return response.status(400).json({
          message: "Erro ao buscar por estado de conservação",
          errors: error.errors,
        });
      }
      console.error("Erro ao buscar item por estado de conservação:", error);
      return response.status(500).json({ message: "Erro interno ao buscar o item." });

   }}



 
   //public getLocation =async (request: Request, response:Response)=>{
   
};