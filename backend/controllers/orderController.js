import Order from "../models/Order.js"; import Food from "../models/Food.js";
export async function create(req,res){
  const {items=[],deliveryAddress,paymentMethod="COD"}=req.body;
  if(!items.length)return res.status(400).json({message:"Cart is empty"});
  const ids=items.map(i=>i.food); const foods=await Food.find({_id:{$in:ids},isAvailable:true});
  if(foods.length!==items.length)return res.status(400).json({message:"One or more foods are unavailable"});
  const normalized=items.map(i=>{const f=foods.find(x=>String(x._id)===String(i.food));return {food:f._id,name:f.name,price:f.price,quantity:Number(i.quantity)};});
  const subtotal=normalized.reduce((s,i)=>s+i.price*i.quantity,0); const deliveryFee=subtotal>=500?0:40; const tax=Math.round(subtotal*.05); const totalAmount=subtotal+deliveryFee+tax;
  const order=await Order.create({user:req.user._id,items:normalized,deliveryAddress,subtotal,deliveryFee,tax,totalAmount,paymentMethod,paymentStatus:paymentMethod==="COD"?"Pending":"Pending"});
  res.status(201).json({order});
}
export async function mine(req,res){res.json({orders:await Order.find({user:req.user._id}).populate("items.food").sort({createdAt:-1})});}
export async function get(req,res){const order=await Order.findById(req.params.id).populate("user","name email phone").populate("items.food");if(!order)return res.status(404).json({message:"Order not found"});if(req.user.role==="customer"&&String(order.user._id)!==String(req.user._id))return res.status(403).json({message:"Forbidden"});res.json({order});}
export async function all(req,res){res.json({orders:await Order.find().populate("user","name email phone").sort({createdAt:-1})});}
export async function updateStatus(req,res){const allowed=["Pending","Confirmed","Preparing","Ready","Out for Delivery","Delivered","Cancelled"];if(!allowed.includes(req.body.status))return res.status(400).json({message:"Invalid status"});const order=await Order.findByIdAndUpdate(req.params.id,{orderStatus:req.body.status},{new:true}).populate("user","name email phone");if(!order)return res.status(404).json({message:"Order not found"});res.json({order});}
