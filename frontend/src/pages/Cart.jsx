import { Link, useNavigate } from "react-router-dom";
import { Minus, Plus, Trash2 } from "lucide-react";
import { useCart } from "../context/CartContext";

export default function Cart() {
  const {items, updateQuantity, removeFromCart, subtotal, deliveryFee, tax, total} = useCart();
  const navigate=useNavigate();
  if(!items.length) return <main className="container-page py-24 text-center"><div className="mx-auto max-w-md"><div className="text-6xl">🛒</div><h1 className="mt-5 text-3xl font-black">Your cart is empty</h1><p className="mt-2 text-stone-500">Add something delicious from our menu.</p><Link to="/menu" className="btn-primary mt-7">Explore Menu</Link></div></main>;
  return <main className="container-page py-12"><h1 className="text-4xl font-black">Your Cart</h1><div className="mt-8 grid gap-8 lg:grid-cols-[1fr_380px]">
    <div className="space-y-4">{items.map(i=><div key={i.foodId} className="card flex gap-4 p-4"><img src={i.image} className="h-24 w-24 rounded-xl object-cover" alt={i.name}/><div className="min-w-0 flex-1"><h3 className="font-bold">{i.name}</h3><p className="mt-1 font-semibold">₹{i.price}</p><div className="mt-3 flex items-center justify-between"><div className="flex items-center rounded-lg border"><button className="p-2" onClick={()=>updateQuantity(i.foodId,i.quantity-1)}><Minus size={15}/></button><span className="w-8 text-center text-sm">{i.quantity}</span><button className="p-2" onClick={()=>updateQuantity(i.foodId,i.quantity+1)}><Plus size={15}/></button></div><button onClick={()=>removeFromCart(i.foodId)} className="text-red-500"><Trash2 size={18}/></button></div></div></div>)}</div>
    <div className="card h-fit p-6"><h2 className="text-xl font-black">Order Summary</h2><div className="mt-6 space-y-3 text-sm"><div className="flex justify-between"><span>Subtotal</span><span>₹{subtotal}</span></div><div className="flex justify-between"><span>Delivery</span><span>{deliveryFee?`₹${deliveryFee}`:"Free"}</span></div><div className="flex justify-between"><span>Tax</span><span>₹{tax}</span></div><div className="border-t pt-4 text-lg font-black"><div className="flex justify-between"><span>Total</span><span>₹{total}</span></div></div></div><button onClick={()=>navigate("/checkout")} className="btn-primary mt-6 w-full">Proceed to Checkout</button></div>
  </div></main>;
}
