import { Link } from "react-router-dom";
import Button from "./Button";

export default function Product(props) {
  const { details } = props;
  console.log(details)
  
  const productFromCart = props.cart.find(
    (product) => product.id.integerValue === details.fields.id.integerValue
  );
  const quantity = productFromCart ? productFromCart.quantity : 0;

  return (
    <div className="product">
      <div className="product-image-container">
        <Link to={`/products/${details.fields.id.integerValue}`}>
          <img
            src={details.fields.image.stringValue}
            width="100"
            height="100"
            className="product-image"
            alt={details.fields.name.stringValue}
          />
        </Link>
        {quantity > 0 && (
          <div className="product-quantity-container">
            <div className="product-quantity">{quantity}</div>
          </div>
        )}
      </div>
      <div className="product-info">
        <h3>{details.fields.name.stringValue}</h3>
        <p>{details.fields.description.stringValue}</p>
      </div>
      <div className="product-checkout">
        <div>
          {quantity > 0 && (
            <Button
              outline
              onClick={() => props.onProductDelete(details.fields.id.integerValue)}
              className="product-delete"
            >
              x
            </Button>
          )}
        </div>
        <Button outline onClick={() => props.onProductAdd(details.fields)}>
          ${details.fields.price?.integerValue ?? details.fields.price.doubleValue}
        </Button>
      </div>
    </div>
  );
}
