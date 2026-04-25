import { CartModel } from "./cart-model";

export const cartInitialState = {
  items: CartModel.reset(),
};

export const cartActions = {
  add: (item) => ({
    type: "add",
    payload: item,
  }),

  remove: (id) => ({
    type: "remove",
    payload: id,
  }),

  reset: () => ({
    type: "reset",
  }),
};

export const cartReducer = (state, action) => {
  switch (action.type) {
    case "add": {
      return {
        ...state,
        items: CartModel.add(state.items, action.payload),
      };
    }

    case "remove": {
      return {
        ...state,
        items: CartModel.remove(state.items, action.payload),
      };
    }

    case "reset": {
      return {
        ...state,
        items: CartModel.reset(),
      };
    }

    default: {
      return state;
    }
  }
};

export const cartSelectors = {
  getItems: (state) => state.items,
  getItemsCount: (state) => state.items.length || 0,
  hasItem: (state, id) => CartModel.has(state.items, id),
};
