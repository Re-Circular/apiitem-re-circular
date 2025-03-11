import { Router } from "express";
import ItemController from "../controller/itemController";

import uploadConfig from "../config/upload";

const router = Router();
const itemController = new ItemController();
const upload= uploadConfig('uploads')


router.post("/",upload.array('images',5) ,itemController.save);
router.get("/", itemController.getAll)
router.delete("/:name", itemController.deleteByName);
router.delete("/", itemController.deleteAll)
router.patch("/availability/:name", itemController.updateAvailability);
router.get("/:size", itemController.getBySize);
router.get("/conservacao/:statusConservation", itemController.getByConservation);


export default router;
