import { useOutletContext } from "react-router-dom";

export default function ProductDetailNutrition() {
  const product = useOutletContext();
  const short = product.documents ? product.documents[0].fields : product.name

  console.log(short)

  return (
    <table className="table table-nutrition">
      <thead>
        <tr>
          <th>Nutrient</th>
          <th>Value</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Protein</td>
          <td>{product.documents ? short.nutrition.mapValue.fields.protein?.integerValue ?? short.nutrition.mapValue.fields.protein.doubleValue : product.nutrition}g</td>
        </tr>
        <tr>
          <td>Carbohydrates</td>
          <td>{product.documents ? short.nutrition.mapValue.fields.carbs?.integerValue ?? short.nutrition.mapValue.fields.carbs.doubleValue : product.nutrition}g</td>
        </tr>
        <tr>
          <td>Fat</td>
          <td>{product.documents ? short.nutrition.mapValue.fields.fat?.integerValue ?? short.nutrition.mapValue.fields.fat.doubleValue : product.nutrition}g</td>
        </tr>
        <tr>
          <td>Salt</td>
          <td>{product.documents ? short.nutrition.mapValue.fields.salt?.integerValue ?? short.nutrition.mapValue.fields.salt.doubleValue : product.nutrition}g</td>
        </tr>
      </tbody>
    </table>
  );
}

