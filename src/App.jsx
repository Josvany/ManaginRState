import React , { useReducer, useEffect } from "react";
import "./App.css";
import Footer from "./Footer";
import Header from "./Header";
import Products from "./Products";
import { Routes, Route } from "react-router-dom";
import Detail from "./Details";
import Cart from "./Cart";
import Checkout from "./Checkout";
import cartReducer from "./CartReducer";
import { cartContext } from './cartContext';


let initialCart;

try 
{
  initialCart =  JSON.parse(localStorage.getItem("cart")) ?? [];
} 
catch
{
  console.log("Error");
  initialCart =  [];
}

export default function App() {
  
  const [cart, dispatch ] = useReducer(cartReducer, initialCart);


  useEffect(() => localStorage.setItem("cart", JSON.stringify(cart)), [cart]);  

  return (
    <cartContext.Provider value={{cart, dispatch}}>
      <div className="content">
        <Header />
        <main>
          <Routes>
            <Route path="/" element={<h1> Welcome </h1>} />
            <Route path="/:category" element={<Products />} />
            <Route path="/:category/:id" element={<Detail dispatch={dispatch}  />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/checkout" element={<Checkout cart={Cart} dispatch={dispatch} />} />
          </Routes>
        </main>
      </div>
      <Footer />
    </cartContext.Provider>
  );
}
