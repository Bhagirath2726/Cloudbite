import { ArrowRight, CheckCircle2, Clock, ShieldCheck, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import FoodCard from "../components/FoodCard";
import { demoFoods, categories } from "../data/demoFoods";

export default function Home() {
  return <div>
    <section className="overflow-hidden bg-gradient-to-br from-orange-50 via-white to-amber-50">
      <div className="container-page grid min-h-[620px] items-center gap-12 py-16 lg:grid-cols-2">
        <div>
          <span className="badge bg-brand-100 text-brand-700"><Sparkles size={14} className="mr-1"/> Fresh from our cloud kitchen</span>
          <h1 className="mt-5 text-5xl font-black leading-tight tracking-tight sm:text-6xl">Delicious food.<br/><span className="text-brand-600">Made fresh.</span><br/>Delivered fast.</h1>
          <p className="mt-6 max-w-xl text-lg leading-8 text-stone-600">Your favorite meals, prepared fresh with quality ingredients and delivered straight to your doorstep.</p>
          <div className="mt-8 flex flex-wrap gap-3"><Link to="/menu" className="btn-primary gap-2">Explore Menu <ArrowRight size={18}/></Link><Link to="/menu" className="btn-secondary">Order Now</Link></div>
          <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-4">
            {[[CheckCircle2,"Freshly Prepared"],[Clock,"Fast Delivery"],[ShieldCheck,"Secure"],[Sparkles,"Quality"]].map(([Icon,label])=><div key={label} className="text-sm font-semibold text-stone-600"><Icon size={20} className="mb-2 text-brand-600"/>{label}</div>)}
          </div>
        </div>
        <div className="relative"><div className="absolute -inset-5 rounded-full bg-orange-200/30 blur-3xl"/><img src="https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=1200&q=85" alt="Fresh meal" className="relative mx-auto aspect-square max-w-xl rounded-[2.5rem] object-cover shadow-2xl"/></div>
      </div>
    </section>

    <section className="container-page py-16">
      <div className="flex items-end justify-between"><div><p className="font-semibold text-brand-600">Browse by taste</p><h2 className="mt-1 text-3xl font-black">What are you craving?</h2></div><Link to="/menu" className="hidden font-semibold text-brand-600 sm:block">View menu →</Link></div>
      <div className="mt-7 flex gap-3 overflow-x-auto pb-2">{categories.map((c) => <Link key={c} to={`/menu?category=${encodeURIComponent(c)}`} className="whitespace-nowrap rounded-full border border-stone-200 bg-white px-5 py-3 text-sm font-semibold shadow-sm transition hover:border-brand-300 hover:text-brand-600">{c}</Link>)}</div>
    </section>

    <section className="container-page pb-16">
      <div className="flex items-end justify-between"><div><p className="font-semibold text-brand-600">Customer favorites</p><h2 className="mt-1 text-3xl font-black">Popular dishes</h2></div><Link to="/menu" className="hidden font-semibold text-brand-600 sm:block">See all →</Link></div>
      <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">{demoFoods.slice(0,6).map(food => <FoodCard key={food._id} food={food}/>)}</div>
    </section>
    <section id="about" className="bg-stone-900 py-16 text-white"><div className="container-page grid gap-8 md:grid-cols-3"><div><h2 className="text-3xl font-black">A smarter way to run a cloud kitchen.</h2></div><p className="text-stone-300 md:col-span-2 md:text-lg md:leading-8">CloudBite combines a customer ordering experience with admin analytics and a kitchen workflow so every order moves smoothly from cart to preparation to delivery.</p></div></section>
  </div>;
}
