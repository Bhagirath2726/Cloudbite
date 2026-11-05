import {Router} from "express";import {list,get,create,update,remove} from "../controllers/foodController.js";import {protect,allow} from "../middleware/auth.js";
const r=Router();r.get("/",list);r.get("/:id",get);r.post("/",protect,allow("admin"),create);r.put("/:id",protect,allow("admin"),update);r.delete("/:id",protect,allow("admin"),remove);export default r;
