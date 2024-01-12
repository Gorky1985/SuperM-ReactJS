import { useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import Input from "./Input";
import Button from "./Button";

// TODO: Replace with your own publishable key
const stripeLoadedPromise = loadStripe("pk_test_51OMI0tEuk9vquqr0P0GspL2l2r8gsWdXBr5iU0iIvp2rxRKFhMG1aH2k4KHkJgMWdrmGoWOTE3RTWJ0ElewAqADH00vVSA005I");

export default function Cart({ cart }) {

  console.log(cart);

  const totalPrice = cart.reduce((total, product)=> {
    if(product.price.integerValue){return total + product.price.integerValue * product.quantity} else {
      return total + product.price.doubleValue * product.quantity
    }
    
  }, 0)

  const [email, setEmail] = useState("");

  function handleFormSubmit(event) {
    event.preventDefault();

    const lineItems = cart.map((product) => {
      return { price: product.price_id.stringValue, quantity: product.quantity };
    });

    stripeLoadedPromise.then((stripe) => {
      stripe
        .redirectToCheckout({
          lineItems: lineItems,
          mode: "payment",
          successUrl: "https://www.linkedin.com/in/mag-goran-cosic/",
          cancelUrl: "https://www.linkedin.com/in/mag-goran-cosic/",
          customerEmail: email,
        })
        .then((response) => {
          // this will only log if the redirect did not work
          console.log(response.error);
        })
        .catch((error) => {
          // wrong API key? you will see the error message here
          console.log(error);
        });
    });
  }

  return (
    <div className="cart-layout">
      <div>
        <h1>Your Cart</h1>
        {cart.length === 0 && (
          <p>You have not added any product to your cart yet.</p>
        )}
        {cart.length > 0 && (
          <>
            <table className="table table-cart">
              <thead>
                <tr>
                  <th width="25%" className="th-product">
                    Product
                  </th>
                  <th width="20%">Unit price</th>
                  <th width="10%">Quanity</th>
                  <th width="25%">Total</th>
                </tr>
              </thead>
              <tbody>
                {cart.map((product) => {
                  return (
                    <tr key={product.id.integerValue}>
                      <td>
                        <img
                          src={product.image.stringValue}
                          width="30"
                          height="30"
                          alt=""
                        />{" "}
                        {product.name.stringValue}
                      </td>
                      <td>${product.price?.integerValue ?? product.price.doubleValue}</td>
                      <td>{product.quantity}</td>
                      <td>
                        <strong>${product.price?.integerValue ?? product.price.doubleValue * product.quantity}</strong>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
              <tfoot>
                <tr>
                  <th colSpan="2"></th>
                  <th className="cart-highlight">Total</th>
                  <th className="cart-highlight">${totalPrice}</th>
                </tr>
              </tfoot>
            </table>
            <form className="pay-form" onSubmit={handleFormSubmit}>
              <p>
                Enter your email and then click on pay and your products will be
                delivered to you on the same day!
                <br />
                <em>
                  Enter your own Stripe Publishable Key in Cart.js for the
                  checkout to work
                </em>
              </p>
              <Input
                placeholder="Email"
                onChange={(event) => setEmail(event.target.value)}
                value={email}
                type="email"
                required
              />
              <Button type="submit">Pay</Button>
            </form>
          </>
        )}
      </div>
    </div>
  );
}