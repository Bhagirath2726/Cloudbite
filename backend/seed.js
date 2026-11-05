import "dotenv/config";import bcrypt from "bcryptjs";import {connectDB} from "./config/db.js";import User from "./models/User.js";import Food from "./models/Food.js";import Category from "./models/Category.js";
const foods=[
["Chicken Biryani","Aromatic basmati rice with tender chicken.",249,"Biryani",false],
["Paneer Biryani","Fragrant rice with spiced paneer.",199,"Biryani",true],
["Chicken 65","Crispy spicy chicken starter.",179,"Starters",false],
["Paneer Tikka","Char-grilled paneer with peppers.",189,"Starters",true],
["Veg Fried Rice","Wok-tossed rice with vegetables.",149,"Rice",true],
["Chicken Noodles","Hakka noodles with chicken.",179,"Noodles",false],
["Paneer Butter Masala","Creamy tomato gravy with paneer.",199,"Main Course",true],
["Gulab Jamun","Soft dumplings in warm syrup.",79,"Desserts",true],
["Cold Coffee","Creamy chilled coffee.",99,"Beverages",true]
];
await connectDB();
const pass=await bcrypt.hash("Admin@123",12);const kitchenPass=await bcrypt.hash("Kitchen@123",12);const customerPass=await bcrypt.hash("Customer@123",12);
await User.updateOne({email:"admin@cloudbite.com"},{$set:{name:"CloudBite Admin",email:"admin@cloudbite.com",password:pass,role:"admin"}},{upsert:true});
await User.updateOne({email:"kitchen@cloudbite.com"},{$set:{name:"Kitchen Staff",email:"kitchen@cloudbite.com",password:kitchenPass,role:"kitchen"}},{upsert:true});
await User.updateOne({email:"customer@cloudbite.com"},{$set:{name:"Demo Customer",email:"customer@cloudbite.com",password:customerPass,role:"customer"}},{upsert:true});
for(const name of ["Biryani","Starters","Main Course","Rice","Noodles","Beverages","Desserts"])await Category.updateOne({name},{$set:{name}},{upsert:true});
for(const [name,description,price,category,isVeg] of foods)await Food.updateOne({name},{$set:{name,description,price,category,isVeg,isAvailable:true,preparationTime:20,rating:4.6}},{upsert:true});
console.log("Seed complete");process.exit(0);
