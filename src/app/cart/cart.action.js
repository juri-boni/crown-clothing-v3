import { CART_ACTION_TYPES } from "./cart.types";
import { createAction } from "../../utils/reducers/reducers.utils";
import { addCartItem, removeCartItem, clearCartItem } from "./cart.helpers";

const updateCartItemsReducer = (newCartItems) => {
  const newCartTotal = newCartItems.reduce(
    (cartTotal, cartItem) => cartTotal + cartItem.quantity,
    0
  );

  const newCartCount = newCartItems.reduce(
    (cartTotal, cartItem) => cartTotal + cartItem.quantity,
    0
  );

  createAction(CART_ACTION_TYPES.SET_CART_ITEMS, {
    cartItems: newCartItems,
    cartCount: newCartCount,
    cartTotal: newCartTotal,
  });
};

export const addItemToCart = (productToAdd) => {
  const newCartItems = addCartItem(cartItems, productToAdd);
  updateCartItemsReducer(newCartItems);
};

export const removeItemFromCart = (cartItemToRemove) => {
  const newCartItems = removeCartItem(cartItems, cartItemToRemove);
  updateCartItemsReducer(newCartItems);
};

export const clearItemFromCart = (cartItemToClear) => {
  const newCartItems = clearCartItem(cartItems, cartItemToClear);
  updateCartItemsReducer(newCartItems);
};
