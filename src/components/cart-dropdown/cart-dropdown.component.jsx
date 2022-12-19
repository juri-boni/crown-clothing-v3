import { useNavigate } from "react-router-dom";

import { Link } from "react-router-dom";

import { useContext } from "react";

import { CartContext } from "../../contexts/cart.context";

import CartItem from "../cart-item/cart-item.component";
import Button from "../button/button.component";
import "./cart-dropdown.styles.scss";

const CartDropdown = () => {
  const { cartItems } = useContext(CartContext);
  const navigate = useNavigate();

  const gotToCheckoutHandler = () => {
    navigate("/checkout");
  };

  return (
    <div className="cart-dropdown-container">
      <div className="cart-items">
        {cartItems.map((item) => (
          <CartItem key={item.id} cartItem={item} />
        ))}
      </div>

      <Button onClick={gotToCheckoutHandler}>GO TO CHECKOUT</Button>
    </div>
  );
};

export default CartDropdown;
