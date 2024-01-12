import { useState, useEffect } from "react";
import { HashRouter, Routes, Route } from "react-router-dom";
import Navbar from "./Navbar";
import Home from "./Home";
import About from "./About";
import Products from "./Products";
import ProductDetails from "./ProductDetails";
import ProductDetailInfo from "./ProductDetailInfo";
import ProductDetailNutrition from "./ProductDetailNutrition";
import ProductDetailStorage from "./ProductDetailStorage";
import Cart from "./Cart";

function App() {
  const [cart, setCart] = useState(function () {
    let savedCart = [];
    try {
      savedCart = JSON.parse(localStorage.getItem("cart")) || [];
    } catch (error) {
      savedCart = [];
    }
    return savedCart;
  });

  useEffect(() => {
    if (cart) {
      localStorage.setItem("cart", JSON.stringify(cart));
    }
  }, [cart]);

  function handleProductDelete(id) {
    const updatedCart = cart.filter((product) => product.id.integerValue !== id);
    setCart(updatedCart);
  }

  function handleProductAdd(newProduct) {
    // check if item exists
    const existingProduct = cart.find(
      (product) => product.id.integerValue === newProduct.id.integerValue
    );
    if (existingProduct) {
      // increase quantity
      const updatedCart = cart.map((product) => {
        if (product.id.integerValue === newProduct.id.integerValue) {
          return {
            ...product,
            quantity: product.quantity + 1,
          };
        }
        return product;
      });
      setCart(updatedCart);
    } else {
      // product is new to the cart
      setCart([
        ...cart,
        {
          ...newProduct,
          quantity: 1,
        },
      ]);
    }
  }

  return (
    <HashRouter>
      <Navbar cart={cart} />
      <div className="container">
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/about" element={<About />}></Route>
          
          <Route
            path="/products"
            element={
              <Products
                cart={cart}
                onProductAdd={handleProductAdd}
                onProductDelete={handleProductDelete}
              />
            }
          ></Route>
          <Route
            path="/products/:id/"
            element={<ProductDetails onProductAdd={handleProductAdd} />}
          >
            <Route
              path=""
              element={<ProductDetailInfo onProductAdd={handleProductAdd} />}
            ></Route>

            <Route
              path="nutrition"
              element={<ProductDetailNutrition />}
            ></Route>

            <Route path="storage" element={<ProductDetailStorage />}></Route>
          </Route>
          <Route path="/cart" element={<Cart cart={cart} />}></Route>
        </Routes>
      </div>
    </HashRouter>
  );
}

export default App;
