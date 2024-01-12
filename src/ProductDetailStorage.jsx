import { useOutletContext } from "react-router-dom";

export default function ProductDetailStorage() {
  const product = useOutletContext();
  const short = product.documents ? product.documents[0].fields : product.name

  return (
    <p>
      <strong>Storage instructions:</strong> {product.documents ? short.storage.stringValue : product.name}
    </p>
  );
}
