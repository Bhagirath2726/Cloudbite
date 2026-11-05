import mongoose from "mongoose";
const itemSchema=new mongoose.Schema({food:{type:mongoose.Schema.Types.ObjectId,ref:"Food",required:true},name:String,price:Number,quantity:{type:Number,min:1,required:true}},{_id:false});
const orderSchema=new mongoose.Schema({
  user:{type:mongoose.Schema.Types.ObjectId,ref:"User",required:true},
  items:[itemSchema],
  deliveryAddress:{type:Object,required:true},
  subtotal:{type:Number,required:true},
  deliveryFee:{type:Number,required:true},
  tax:{type:Number,required:true},
  totalAmount:{type:Number,required:true},
  paymentMethod:{type:String,enum:["COD","ONLINE"],default:"COD"},
  paymentStatus:{type:String,enum:["Pending","Paid","Failed"],default:"Pending"},
  razorpayOrderId:String,
  orderStatus:{type:String,enum:["Pending","Confirmed","Preparing","Ready","Out for Delivery","Delivered","Cancelled"],default:"Pending"}
},{timestamps:true});
export default mongoose.model("Order",orderSchema);
