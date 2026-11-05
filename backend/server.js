import "dotenv/config";import express from "express";import cors from "cors";import cookieParser from "cookie-parser";import {connectDB} from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";import foodRoutes from "./routes/foodRoutes.js";import categoryRoutes from "./routes/categoryRoutes.js";import orderRoutes from "./routes/orderRoutes.js";import userRoutes from "./routes/userRoutes.js";import paymentRoutes from "./routes/paymentRoutes.js";import uploadRoutes from "./routes/uploadRoutes.js";
const app=express();app.use(cors({origin:process.env.CLIENT_URL||"http://localhost:5173",credentials:true}));app.use(express.json());app.use(cookieParser());
app.get("/api/health",(req,res)=>res.json({ok:true,service:"CloudBite API"}));
app.use("/api/auth",authRoutes);app.use("/api/foods",foodRoutes);app.use("/api/categories",categoryRoutes);app.use("/api/orders",orderRoutes);app.use("/api/users",userRoutes);app.use("/api/payments",paymentRoutes);app.use("/api/uploads",uploadRoutes);
app.use((err,req,res,next)=>{console.error(err);res.status(500).json({message:"Internal server error"})});
const port=process.env.PORT||5000;connectDB().then(()=>app.listen(port,()=>console.log(`CloudBite API running on http://localhost:${port}`))).catch(err=>{console.error(err);process.exit(1)});
