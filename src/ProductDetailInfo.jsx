import { useOutletContext } from "react-router-dom";
import Button from "./Button";

export default function ProductDetailInfo({ onProductAdd }) {
  const product = useOutletContext();

  const short = product.documents ? product.documents[0].fields : product.name

  return (
    <>
      <p>
        {product.documents ? short.description.stringValue : product.description} sold at <strong>${product.documents ? short.price?.integerValue ?? short.price?.doubleValue : product.price}</strong> per
        piece.
      </p>
      <Button onClick={() => onProductAdd(product.documents[0].fields)}>${product.documents ? short.price?.integerValue ?? short.price?.doubleValue : product.price}</Button>
    </>
  );
}
