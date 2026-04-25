/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useReducer } from "react";

import { cartActions, cartInitialState, cartReducer, cartSelectors } from "./cart-slice";

const CartContext = createContext(null);

export const CartStoreProvider = (props) => {
  const { children } = props;

  const [state, dispatch] = useReducer(cartReducer, cartInitialState);

  CartContext.Provider;

  return (
    <CartContext.Provider
      value={{
        items: cartSelectors.getItems(state),
        itemsCount: cartSelectors.getItemsCount(state),
        hasItem: (id) => cartSelectors.hasItem(state, id),
        add: (item) => dispatch(cartActions.add(item)),
        remove: (id) => dispatch(cartActions.remove(id)),
        reset: () => dispatch(cartActions.reset()),
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCartStore = () => {
  const value = useContext(CartContext);

  if (!value) {
    throw new Error("useCartStore must be used within CartProvider");
  }

  return value;
};
