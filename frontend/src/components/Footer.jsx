export default function Footer() {
  return <footer className="mt-20 bg-stone-950 py-12 text-stone-300">
    <div className="container-page grid gap-8 md:grid-cols-3">
      <div><div className="text-2xl font-black text-white">CloudBite</div><p className="mt-3 max-w-sm text-sm leading-6">Fresh meals, smart ordering and a modern cloud kitchen experience.</p></div>
      <div><h3 className="font-bold text-white">Quick Links</h3><div className="mt-3 space-y-2 text-sm"><p>Menu</p><p>Orders</p><p>Contact</p></div></div>
      <div><h3 className="font-bold text-white">Support</h3><p className="mt-3 text-sm">Mon–Sun · 10 AM–11 PM</p><p className="mt-2 text-sm">support@cloudbite.com</p></div>
    </div>
    <div className="container-page mt-10 border-t border-stone-800 pt-6 text-sm">© {new Date().getFullYear()} CloudBite. All rights reserved.</div>
  </footer>;
}
