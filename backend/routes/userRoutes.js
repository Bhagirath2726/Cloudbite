import {Router} from "express";import {all,profile,update} from "../controllers/userController.js";import {protect,allow} from "../middleware/auth.js";
const r=Router();r.get("/",protect,allow("admin"),all);r.get("/me",protect,profile);r.put("/me",protect,update);export default r;
