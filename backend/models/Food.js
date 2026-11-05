import mongoose from "mongoose";
const foodSchema=new mongoose.Schema({
  name:{type:String,required:true,trim:true},
  description:{type:String,required:true},
  price:{type:Number,required:true,min:0},
  image:{type:String,default:""},
  category:{type:String,required:true},
  ingredients:[String],
  preparationTime:{type:Number,default:20},
  rating:{type:Number,default:4.5},
  isVeg:{type:Boolean,default:true},
  isAvailable:{type:Boolean,default:true}
},{timestamps:true});
export default mongoose.model("Food",foodSchema);
