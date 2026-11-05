import crypto from "crypto"; import Razorpay from "razorpay"; import Order from "../models/Order.js";
export async function createPayment(req,res){
  if(!process.env.RAZORPAY_KEY_ID||!process.env.RAZORPAY_KEY_SECRET)return res.status(503).json({message:"Razorpay is not configured"});
  const {amount}=req.body; const rzp=new Razorpay({key_id:process.env.RAZORPAY_KEY_ID,key_secret:process.env.RAZORPAY_KEY_SECRET});
  const order=await rzp.orders.create({amount:Math.round(Number(amount)*100),currency:"INR",receipt:`cb_${Date.now()}`});
  res.json({order,keyId:process.env.RAZORPAY_KEY_ID});
}
export async function verifyPayment(req,res){
  const {razorpay_order_id,razorpay_payment_id,razorpay_signature,orderId}=req.body;
  const expected=crypto.createHmac("sha256",process.env.RAZORPAY_KEY_SECRET).update(`${razorpay_order_id}|${razorpay_payment_id}`).digest("hex");
  if(expected!==razorpay_signature)return res.status(400).json({message:"Invalid payment signature"});
  const order=await Order.findByIdAndUpdate(orderId,{paymentStatus:"Paid",razorpayOrderId:razorpay_order_id,orderStatus:"Confirmed"},{new:true});
  res.json({success:true,order});
}
