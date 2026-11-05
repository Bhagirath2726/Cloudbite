import { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useCart } from "../context/CartContext";
import { orderAPI } from "../services/api";
import { useAuth } from "../context/AuthContext";

export default function Checkout() {
  const {items, subtotal, deliveryFee, tax, total, clearCart} = useCart();
  const {user}=useAuth(); const navigate=useNavigate();
  const [form,setForm]=useState({name:user?.name||"",phone:user?.phone||"",house:"",street:"",city:"",state:"Telangana",pincode:"",paymentMethod:"COD"});
  const [loading,setLoading]=useState(false);
  const submit=async e=>{e.preventDefault(); if(!items.length)return; setLoading(true); try{
    const payload={items:items.map(i=>({food:i.foodId,quantity:i.quantity})),deliveryAddress:form,paymentMethod:form.paymentMethod};
    const {data}=await orderAPI.create(payload); clearCart(); toast.success("Order placed successfully"); navigate(`/order-success?id=${data.order?._id||""}`);
  }catch(err){toast.error(err.response?.data?.message||"Could not place order");}finally{setLoading(false)}};
  if(!items.length)return <main className="container-page py-20 text-center"><h1 className="text-2xl font-black">Your cart is empty</h1></main>;
  return <main className="container-page py-12"><h1 className="text-4xl font-black">Checkout</h1><form onSubmit={submit} className="mt-8 grid gap-8 lg:grid-cols-[1fr_380px]">
    <div className="space-y-6"><section className="card p-6"><h2 className="text-xl font-black">Delivery Address</h2><div className="mt-5 grid gap-4 sm:grid-cols-2">{[["name","Full Name"],["phone","Phone Number"],["house","House / Flat"],["street","Street"],["city","City"],["state","State"],["pincode","Pincode"]].map(([k,l])=><input key={k} required value={form[k]} onChange={e=>setForm({...form,[k]:e.target.value})} placeholder={l} className="input"/>)}</div></section>
    <section className="card p-6"><h2 className="text-xl font-black">Payment Method</h2><div className="mt-5 space-y-3"><label className="flex cursor-pointer gap-3 rounded-xl border p-4"><input type="radio" checked={form.paymentMethod==="COD"} onChange={()=>setForm({...form,paymentMethod:"COD"})}/> Cash on Delivery</label><label className="flex cursor-pointer gap-3 rounded-xl border p-4"><input type="radio" checked={form.paymentMethod==="ONLINE"} onChange={()=>setForm({...form,paymentMethod:"ONLINE"})}/> Online Payment (Razorpay-ready)</label></div></section></div>
    <div className="card h-fit p-6"><h2 className="text-xl font-black">Order Summary</h2><div className="mt-5 space-y-3 text-sm">{items.map(i=><div key={i.foodId} className="flex justify-between"><span>{i.name} × {i.quantity}</span><span>₹{i.price*i.quantity}</span></div>)}<div className="border-t pt-4"><div className="flex justify-between"><span>Subtotal</span><span>₹{subtotal}</span></div><div className="mt-2 flex justify-between"><span>Delivery</span><span>{deliveryFee?"₹"+deliveryFee:"Free"}</span></div><div className="mt-2 flex justify-between"><span>Tax</span><span>₹{tax}</span></div><div className="mt-4 flex justify-between text-lg font-black"><span>Total</span><span>₹{total}</span></div></div></div><button disabled={loading} className="btn-primary mt-6 w-full">{loading?"Placing Order...":"Place Order"}</button></div>
  </form></main>;
}
