import { useState } from "react";
import { Clock, Minus, Plus, Star } from "lucide-react";
import { useParams, Link } from "react-router-dom";
import toast from "react-hot-toast";
import { demoFoods } from "../data/demoFoods";
import { useCart } from "../context/CartContext";

export default function FoodDetails() {
  const { id } = useParams();
  const food = demoFoods.find(f=>f._id===id) || demoFoods[0];
  const [qty,setQty]=useState(1);
  const { addToCart } = useCart();
  const add = () => { for(let i=0;i<qty;i++) addToCart(food); toast.success(`${qty} × ${food.name} added`); };
  return <main className="container-page py-12">
    <div className="grid gap-10 lg:grid-cols-2">
      <img src={food.image} alt={food.name} className="aspect-square w-full rounded-3xl object-cover shadow-lg"/>
      <div className="flex flex-col justify-center">
        <span className={`badge w-fit ${food.isVeg?"bg-green-100 text-green-700":"bg-red-100 text-red-700"}`}>{food.isVeg?"VEG":"NON-VEG"}</span>
        <h1 className="mt-4 text-4xl font-black">{food.name}</h1>
        <div className="mt-3 flex items-center gap-4"><span className="flex items-center gap-1 font-semibold"><Star size={17} fill="currentColor" className="text-amber-500"/> {food.rating}</span><span className="flex items-center gap-1 text-stone-500"><Clock size={17}/> {food.preparationTime} min</span></div>
        <p className="mt-6 text-lg leading-8 text-stone-600">{food.description}</p>
        <p className="mt-6 text-3xl font-black">₹{food.price}</p>
        <div className="mt-6 flex items-center gap-4"><div className="flex items-center rounded-xl border border-stone-200 bg-white"><button className="p-3" onClick={()=>setQty(Math.max(1,qty-1))}><Minus size={18}/></button><span className="w-10 text-center font-bold">{qty}</span><button className="p-3" onClick={()=>setQty(qty+1)}><Plus size={18}/></button></div><button onClick={add} className="btn-primary flex-1">Add to Cart · ₹{food.price*qty}</button></div>
        <Link to="/menu" className="mt-4 text-center text-sm font-semibold text-brand-600">← Back to menu</Link>
      </div>
    </div>
  </main>;
}
