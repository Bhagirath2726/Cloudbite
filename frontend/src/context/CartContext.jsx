import { createContext, useContext, useEffect, useMemo, useState } from "react";

const CartContext = createContext(null);

export function CartProvider({ children }) {
  const [items, setItems] = useState(() => JSON.parse(localStorage.getItem("cloudbite_cart") || "[]"));

  useEffect(() => localStorage.setItem("cloudbite_cart", JSON.stringify(items)), [items]);

  const addToCart = (food) => {
    setItems((current) => {
      const found = current.find((item) => item.foodId === food._id);
      if (found) return current.map((item) => item.foodId === food._id ? { ...item, quantity: item.quantity + 1 } : item);
      return [...current, { foodId: food._id, name: food.name, price: food.price, image: food.image, quantity: 1 }];
    });
  };
  const removeFromCart = (foodId) => setItems((current) => current.filter((i) => i.foodId !== foodId));
  const updateQuantity = (foodId, quantity) => {
    if (quantity <= 0) return removeFromCart(foodId);
    setItems((current) => current.map((i) => i.foodId === foodId ? { ...i, quantity } : i));
  };
  const clearCart = () => setItems([]);
  const subtotal = useMemo(() => items.reduce((sum, i) => sum + i.price * i.quantity, 0), [items]);
  const deliveryFee = subtotal === 0 ? 0 : subtotal >= 500 ? 0 : 40;
  const tax = Math.round(subtotal * 0.05);
  const total = subtotal + deliveryFee + tax;
  const count = items.reduce((sum, i) => sum + i.quantity, 0);

  return <CartContext.Provider value={{ items, addToCart, removeFromCart, updateQuantity, clearCart, subtotal, deliveryFee, tax, total, count }}>
    {children}
  </CartContext.Provider>;
}
export const useCart = () => useContext(CartContext);
