import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { GetCartFromLS } from "../../utils/getCartFromLS";
import { calcTotalPrice } from "../../utils/calcTotalPrice";
import { CartPizza, CartSliceState } from "./types";

const { pizzas, totalPrice } = GetCartFromLS();

const initialState: CartSliceState = {
  totalPrice,
  pizzas,
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addPizzas: (state, action: PayloadAction<CartPizza>) => {
      const findPizzas = state.pizzas.find(
        (obj) => obj.id === action.payload.id
      );

      if (findPizzas) {
        findPizzas.count++;
      } else {
        state.pizzas.push({ ...action.payload, count: 1 });
      }

      state.totalPrice = calcTotalPrice(state.pizzas);
    },
    minusPizza: (state, action: PayloadAction<string>) => {
      const findPizzas = state.pizzas.find((obj) => obj.id === action.payload);

      if (findPizzas) {
        findPizzas.count--;
      }

      state.totalPrice = calcTotalPrice(state.pizzas);
    },
    removePizza: (state, action: PayloadAction<string>) => {
      state.pizzas = state.pizzas.filter((obj) => obj.id !== action.payload);

      state.totalPrice = calcTotalPrice(state.pizzas);
    },
    clearCart: (state) => {
      state.pizzas = [];
      state.totalPrice = 0;
    },
  },
});

export const { addPizzas, removePizza, minusPizza, clearCart } =
  cartSlice.actions;

export default cartSlice.reducer;
