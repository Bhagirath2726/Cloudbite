import { useEffect, useMemo, useState } from "react";
import { Search } from "lucide-react";
import { useSearchParams } from "react-router-dom";
import FoodCard from "../components/FoodCard";
import { categories, demoFoods } from "../data/demoFoods";
import { foodAPI } from "../services/api";

export default function Menu() {
  const [params, setParams] = useSearchParams();
  const [foods, setFoods] = useState(demoFoods);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState(params.get("category") || "All");
  const [sort, setSort] = useState("popular");

  useEffect(() => {
    foodAPI.list().then(({data}) => { if (Array.isArray(data.foods)) setFoods(data.foods); }).catch(() => {});
  }, []);

  const filtered = useMemo(() => {
    let data = foods.filter(f => (category === "All" || f.category === category) && f.name.toLowerCase().includes(search.toLowerCase()));
    if (sort === "low") data.sort((a,b)=>a.price-b.price);
    if (sort === "high") data.sort((a,b)=>b.price-a.price);
    if (sort === "rating") data.sort((a,b)=>(b.rating||0)-(a.rating||0));
    return data;
  }, [foods, category, search, sort]);

  const choose = c => { setCategory(c); setParams(c === "All" ? {} : {category:c}); };
  return <main className="container-page py-12">
    <div className="max-w-2xl"><p className="font-semibold text-brand-600">Freshly prepared</p><h1 className="mt-2 text-4xl font-black">Our Menu</h1><p className="mt-3 text-stone-500">Choose from freshly prepared meals made for fast delivery.</p></div>
    <div className="mt-8 flex flex-col gap-3 md:flex-row"><div className="relative flex-1"><Search className="absolute left-4 top-1/2 -translate-y-1/2 text-stone-400"/><input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Search for dishes..." className="input pl-12"/></div><select value={sort} onChange={e=>setSort(e.target.value)} className="input md:w-56"><option value="popular">Popular</option><option value="low">Price: Low to High</option><option value="high">Price: High to Low</option><option value="rating">Top Rated</option></select></div>
    <div className="mt-5 flex gap-2 overflow-x-auto pb-2">{categories.map(c=><button key={c} onClick={()=>choose(c)} className={`whitespace-nowrap rounded-full px-4 py-2 text-sm font-semibold ${category===c?"bg-brand-600 text-white":"bg-white text-stone-600 border border-stone-200"}`}>{c}</button>)}</div>
    <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">{filtered.map(f=><FoodCard key={f._id} food={f}/>)}</div>
    {!filtered.length && <div className="py-20 text-center"><h2 className="text-xl font-bold">No dishes found</h2><p className="mt-2 text-stone-500">Try another search or category.</p></div>}
  </main>;
}
