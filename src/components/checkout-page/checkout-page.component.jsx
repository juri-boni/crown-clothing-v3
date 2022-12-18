import { useContext } from "react";

import { CartContext } from "../../contexts/cart.context";

import CheckoutElement from "../checkout-element/checkout-element.component";

import "./checkout-page.styles.scss";

const CheckoutPage = () => {
  const { cartItems } = useContext(CartContext);

  return (
    <div>
      <div className="checkout-nav">
        <span> Product</span>
        <span> Description</span>
        <span> Quantity</span>
        <span> Price</span>
        <span> Remove</span>
      </div>
      {cartItems.map((item) => (
        <CheckoutElement key={item.id} cartItem={item} />
      ))}
    </div>
  );
};

export default CheckoutPage;
