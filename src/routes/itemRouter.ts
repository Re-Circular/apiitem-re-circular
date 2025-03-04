import { Router } from "express";
import ItemController from "../controller/itemController";

const router = Router();
const itemController = new ItemController();

router.post("/", itemController.save);
router.get("/", itemController.getAll)
router.delete("/:name", itemController.deleteByName);
router.patch("/availability/:name", itemController.updateAvailability);


export default router;
