import { useState, useEffect } from "react";
import Product from "./Product";
import useFetch from "./useFetch";
import Loader from "./Loader";

export default function Products(props) {
  const [products, setProducts] = useState([]);
  const { get, loading } = useFetch(
    "https://firestore.googleapis.com/v1/projects/food-app-34ce2/databases/(default)/documents/SuperM"
  );

  useEffect(() => {
    get("/")
      .then((data) => {
        setProducts(data.documents);
      })
      .catch((error) => console.log("Could not load products", error));
  }, []);

   return (
    <div className="products-layout">
      <h1>Products</h1>
      <p>Take a look at our products</p>
      <div className="products-grid">
        {loading && <Loader />}
        {products.map((product) => {
           
           return (
            <Product
              key={product.fields.id.integerValue}
              details={product}
              cart={props.cart}
              onProductAdd={props.onProductAdd}
              onProductDelete={props.onProductDelete}
            ></Product>
          );
        })}
      </div>
    </div>
  );
}
