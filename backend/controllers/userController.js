import User from "../models/User.js";
export async function all(req,res){res.json({users:await User.find().select("-password").sort({createdAt:-1})});}
export async function profile(req,res){res.json({user:req.user});}
export async function update(req,res){const user=await User.findByIdAndUpdate(req.user._id,{name:req.body.name,phone:req.body.phone,address:req.body.address},{new:true}).select("-password");res.json({user});}
