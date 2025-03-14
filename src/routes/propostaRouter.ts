import { Router } from "express";
import PropostaController from "../controller/propostaController";

const propostaRouter = Router();

propostaRouter.post("/", PropostaController.criar);
propostaRouter.get("/", PropostaController.listar);
propostaRouter.get("/:id", PropostaController.buscar);
propostaRouter.put("/:id", PropostaController.atualizar);
propostaRouter.delete("/:id", PropostaController.deletar);

export default propostaRouter;
