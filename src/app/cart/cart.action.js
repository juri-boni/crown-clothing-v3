import { CART_ACTION_TYPES } from "./cart.types";
import { createAction } from "../../utils/reducers/reducers.utils";
import { addCartItem, removeCartItem, clearCartItem } from "./cart.utilities";

export const setIsCartOpen = (bool) => {
  createAction(CART_ACTION_TYPES.SET_IS_CART_OPEN, bool);
};

export const addItemToCart = (cartItems, productToAdd) => {
  const newCartItems = addCartItem(cartItems, productToAdd);
  createAction(CART_ACTION_TYPES.SET_CART_ITEMS, newCartItems);
};

export const removeItemFromCart = (cartItems, cartItemToRemove) => {
  const newCartItems = removeCartItem(cartItems, cartItemToRemove);
  createAction(CART_ACTION_TYPES.SET_CART_ITEMS, newCartItems);
};

export const clearItemFromCart = (cartItems, cartItemToClear) => {
  const newCartItems = clearCartItem(cartItems, cartItemToClear);
  createAction(CART_ACTION_TYPES.SET_CART_ITEMS, newCartItems);
};
