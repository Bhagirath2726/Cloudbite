import mongoose from "mongoose";
const userSchema=new mongoose.Schema({
  name:{type:String,required:true,trim:true},
  email:{type:String,required:true,unique:true,lowercase:true,trim:true},
  phone:{type:String,default:""},
  password:{type:String,required:true},
  role:{type:String,enum:["customer","admin","kitchen"],default:"customer"},
  address:{type:Object,default:{}}
},{timestamps:true});
export default mongoose.model("User",userSchema);
