import React , { useState } from "react";
import "./App.css";
import Footer from "./Footer";
import Header from "./Header";
import Products from "./Products";
import { Routes, Route } from "react-router-dom";
import Detail from "./Details";
import Cart from "./Cart";


export default function App() {
  
  const [ cart, setCart ] = useState([]);
  

  function addToCart(id, sku) 
  {
    setCart((items) => {
      const itemInCart = items.find((i) => i.sku === items.sku);
      if (itemInCart)
      {
        //retorna nuevo arrary si se encuentra ya agregado al carro
        return items.map((i) => i.sku === sku ? {...i, quantity: i.quantity + 1 } : i);
      }
      else
      {
        //retornar nuevo array con el item que se inserta
        return [...items, {id, sku, quantity: 1}]
      }
    });
  }

  function updateQuantity(sku, quantity)
  {
    setCart((items) => 
    {
      return quantity === 0 
      ?items.filter((i) => i.sku !== sku)
      :items.map((i) => i.sku === sku ? {...i, quantity} : i);
    });
  }

  return (
    <>
      <div className="content">
        <Header />
        <main>
          <Routes>
            <Route path="/" element={<h1> Welcome </h1>} />
            <Route path="/:category" element={<Products />} />
            <Route path="/:category/:id" element={<Detail addToCart={addToCart}  />} />
            <Route path="/cart" element={<Cart cart={cart}  updateQuantity={updateQuantity}/>} />
          </Routes>
        </main>
      </div>
      <Footer />
    </>
  );
}
