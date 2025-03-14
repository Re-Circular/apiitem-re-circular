import { Router } from "express";
import ItemController from "../controller/itemController";
import ExceptionMiddleware from "../../apiusers-re-circular/src/middleware/ExceptionMiddleware";
import uploadConfig from "../config/upload";

const router = Router();
const itemController = new ItemController();
//const error = new ExceptionMiddleware();  
const upload= uploadConfig('uploads')


router.post("/",upload.array('images',5) ,itemController.save);
router.get("/", itemController.getAll)
router.get("/:name", itemController.getByName)
router.delete("/:name", itemController.deleteByName);
router.delete("/", itemController.deleteAll)
router.patch("/:name", itemController.updateAvailability);
router.get("/tamanho/:size", itemController.getBySize);
router.get("/conservacao/:statusConservation", itemController.getByConservation);




export default router;
