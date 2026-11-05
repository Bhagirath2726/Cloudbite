import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { Menu, ShoppingBag, X, UserCircle } from "lucide-react";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const { count } = useCart();
  const { user, logout } = useAuth();
  const link = ({ isActive }) => `transition ${isActive ? "text-brand-600 font-semibold" : "text-stone-700 hover:text-brand-600"}`;
  return <header className="sticky top-0 z-50 border-b border-stone-100 bg-white/95 backdrop-blur">
    <div className="container-page flex h-16 items-center justify-between">
      <Link to="/" className="flex items-center gap-2 text-xl font-black"><span className="grid h-9 w-9 place-items-center rounded-xl bg-brand-600 text-white">C</span>CloudBite</Link>
      <nav className="hidden items-center gap-7 md:flex">
        <NavLink to="/" className={link}>Home</NavLink>
        <NavLink to="/menu" className={link}>Menu</NavLink>
        <a href="#about" className="text-stone-700 hover:text-brand-600">About</a>
      </nav>
      <div className="hidden items-center gap-3 md:flex">
        <Link to="/cart" className="relative rounded-xl p-2 hover:bg-stone-100"><ShoppingBag size={21}/>{count > 0 && <span className="absolute -right-1 -top-1 grid h-5 min-w-5 place-items-center rounded-full bg-brand-600 px-1 text-xs font-bold text-white">{count}</span>}</Link>
        {user ? <div className="flex items-center gap-2"><Link to={user.role === "admin" ? "/admin" : user.role === "kitchen" ? "/kitchen" : "/profile"} className="rounded-xl p-2 hover:bg-stone-100"><UserCircle/></Link><button onClick={logout} className="text-sm font-semibold">Logout</button></div> : <Link to="/login" className="btn-primary px-4 py-2">Login</Link>}
      </div>
      <button className="md:hidden" onClick={() => setOpen(!open)} aria-label="Menu">{open ? <X/> : <Menu/>}</button>
    </div>
    {open && <div className="border-t border-stone-100 bg-white p-4 md:hidden">
      <div className="container-page flex flex-col gap-4">
        <Link to="/" onClick={() => setOpen(false)}>Home</Link>
        <Link to="/menu" onClick={() => setOpen(false)}>Menu</Link>
        <Link to="/cart" onClick={() => setOpen(false)}>Cart ({count})</Link>
        {user ? <button className="text-left" onClick={() => {logout(); setOpen(false)}}>Logout</button> : <Link to="/login" onClick={() => setOpen(false)}>Login</Link>}
      </div>
    </div>}
  </header>;
}
