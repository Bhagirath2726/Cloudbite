import {Router} from "express";import {list,create,update,remove} from "../controllers/categoryController.js";import {protect,allow} from "../middleware/auth.js";
const r=Router();r.get("/",list);r.post("/",protect,allow("admin"),create);r.put("/:id",protect,allow("admin"),update);r.delete("/:id",protect,allow("admin"),remove);export default r;
