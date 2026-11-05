import bcrypt from "bcryptjs"; import jwt from "jsonwebtoken"; import User from "../models/User.js";
const token=u=>jwt.sign({id:u._id},process.env.JWT_SECRET,{expiresIn:"7d"});
export async function register(req,res){
  const {name,email,password,phone}=req.body;
  if(!name||!email||!password)return res.status(400).json({message:"Name, email and password are required"});
  if(await User.findOne({email}))return res.status(409).json({message:"Email already registered"});
  const user=await User.create({name,email,password:await bcrypt.hash(password,12),phone});
  res.status(201).json({token:token(user),user:{_id:user._id,name:user.name,email:user.email,phone:user.phone,role:user.role}});
}
export async function login(req,res){
  const {email,password}=req.body; const user=await User.findOne({email});
  if(!user||!(await bcrypt.compare(password,user.password)))return res.status(401).json({message:"Invalid email or password"});
  res.json({token:token(user),user:{_id:user._id,name:user.name,email:user.email,phone:user.phone,role:user.role}});
}
export async function me(req,res){res.json({user:req.user});}
