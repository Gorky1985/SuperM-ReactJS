import { useState, useEffect } from "react";
import { NavLink, useParams, Outlet } from "react-router-dom";
import useFetch from "./useFetch";

export default function ProductDetails() {
  const [product, setProduct] = useState({});
  const { get } = useFetch("https://firestore.googleapis.com/v1/projects/food-app-34ce2/databases/(default)/documents/");
  const params = useParams();

    useEffect(() => {
    get(`id${params.id}`)
      .then((data) => {
        setProduct(data);
      })
      .catch((error) => console.log("Could not load product details", error));
  }, []);

const short = product.documents ? product.documents[0].fields : product.name

    return (
    <div className="product-details-layout">
      <div>
        <h2>{product.documents ? short.name.stringValue : product.name}</h2>
        <img
          src={product.documents ? short.image.stringValue : product.image}
          width="125"
          height="125"
          className="product-details-image"
          alt={product.documents ? short.name.stringValue : product.name}
        />
      </div>
      <div>
        <div className="tabs">
          <ul>
            <li>
              <NavLink
                className={({ isActive }) => (isActive ? "tab-active" : "")}
                to=""
                end
              >
                Details
              </NavLink>
            </li>
            <li>
              <NavLink
                className={({ isActive }) => (isActive ? "tab-active" : "")}
                to="nutrition"
              >
                Nutrition
              </NavLink>
            </li>
            <li>
              <NavLink
                className={({ isActive }) => (isActive ? "tab-active" : "")}
                to="storage"
              >
                Storage
              </NavLink>
            </li>
          </ul>
        </div>

        <Outlet context={product} />
      </div>
    </div>
  );
}
