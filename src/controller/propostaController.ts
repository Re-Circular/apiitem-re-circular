import { Request, Response } from "express";
import PropostaService from "../service/propostaService";

class PropostaController {
  async criar(req: Request, res: Response) {
    try {
      const { descricao, itemId} = req.body;
      const proposta = await PropostaService.createProposta(descricao, itemId);
      res.status(201).json(proposta);
    } catch (error) {
      res.status(500).json({ error: "Erro ao criar proposta" });
      console.log(error)
    }
  }

  async listar(req: Request, res: Response) {
    try {
      const propostas = await PropostaService.getAll();
      res.status(200).json(propostas);
    } catch (error) {
      res.status(500).json({ error: "Erro ao listar propostas" });
    }
  }

  async buscar(req: Request, res: Response) {
    try {
      const id = Number(req.params.id);
      const proposta = await PropostaService.getById(id);
      if (!proposta) return res.status(404).json({ error: "Proposta não encontrada" });
      res.json(proposta);
    } catch (error) {
      res.status(500).json({ error: "Erro ao buscar proposta" });
    }
  }

  async atualizar(req: Request, res: Response) {
    try {
      const {id}=req.params;
      const { descricao} = req.body;
      const proposta = await PropostaService.updateItemProposta(id, descricao);
      res.json(proposta);
    } catch (error) {

      console.log(error)
      res.status(404).json({ error: "Proposta não encontrada" });
      
    }
  }

  async deletar(req: Request, res: Response) {
    try {
      const {id}= req.params;
      const deleta=  await PropostaService.deletarProposta(id);
      res.status(204);
      console.log("Proposta deletada", deleta)
    } catch (error) {
      res.status(404).json({ error: "Proposta não encontrada" });
    }
  }
}

export default new PropostaController();