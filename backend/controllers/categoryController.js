import Category from "../models/Category.js";
export async function list(req,res){res.json({categories:await Category.find().sort({name:1})});}
export async function create(req,res){res.status(201).json({category:await Category.create(req.body)});}
export async function update(req,res){res.json({category:await Category.findByIdAndUpdate(req.params.id,req.body,{new:true})});}
export async function remove(req,res){await Category.findByIdAndDelete(req.params.id);res.json({message:"Category deleted"});}
