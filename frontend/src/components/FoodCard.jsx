import { Link } from "react-router-dom";
import { Clock, Plus, Star } from "lucide-react";
import toast from "react-hot-toast";
import { useCart } from "../context/CartContext";

export default function FoodCard({ food }) {
  const { addToCart } = useCart();
  const add = () => { addToCart(food); toast.success(`${food.name} added to cart`); };
  return <div className="card overflow-hidden transition duration-300 hover:-translate-y-1 hover:shadow-lg">
    <Link to={`/food/${food._id}`}><div className="relative aspect-[4/3] overflow-hidden bg-stone-100"><img src={food.image} alt={food.name} className="h-full w-full object-cover transition duration-500 hover:scale-105"/><span className={`absolute left-3 top-3 badge ${food.isVeg ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}>{food.isVeg ? "VEG" : "NON-VEG"}</span></div></Link>
    <div className="p-4">
      <div className="flex items-start justify-between gap-2"><Link to={`/food/${food._id}`} className="text-lg font-bold hover:text-brand-600">{food.name}</Link><span className="flex items-center gap-1 text-sm font-semibold"><Star size={15} fill="currentColor" className="text-amber-500"/> {food.rating}</span></div>
      <p className="mt-2 line-clamp-2 text-sm text-stone-500">{food.description}</p>
      <div className="mt-3 flex items-center justify-between text-sm text-stone-500"><span className="flex items-center gap-1"><Clock size={15}/> {food.preparationTime} min</span><span className="text-lg font-black text-stone-900">₹{food.price}</span></div>
      <button disabled={!food.isAvailable} onClick={add} className="btn-primary mt-4 w-full gap-2">{food.isAvailable ? <><Plus size={18}/> Add to Cart</> : "Unavailable"}</button>
    </div>
  </div>;
}
