import Food from "../models/Food.js";
export async function list(req,res){const {search,category}=req.query;const q={};if(category&&category!=="All")q.category=category;if(search)q.name={$regex:search,$options:"i"};res.json({foods:await Food.find(q).sort({createdAt:-1})});}
export async function get(req,res){const food=await Food.findById(req.params.id);if(!food)return res.status(404).json({message:"Food not found"});res.json({food});}
export async function create(req,res){const food=await Food.create(req.body);res.status(201).json({food});}
export async function update(req,res){const food=await Food.findByIdAndUpdate(req.params.id,req.body,{new:true,runValidators:true});if(!food)return res.status(404).json({message:"Food not found"});res.json({food});}
export async function remove(req,res){await Food.findByIdAndDelete(req.params.id);res.json({message:"Food deleted"});}
