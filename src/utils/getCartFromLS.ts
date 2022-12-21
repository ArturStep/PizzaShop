import { calcTotalPrice } from "./calcTotalPrice";
import { CartPizza } from "../redux/Cart/types";

export const GetCartFromLS = () => {
  const data = localStorage.getItem("cart");
  const pizzas = data ? JSON.parse(data) : [];
  const totalPrice = calcTotalPrice(pizzas);

  return {
    pizzas: pizzas as CartPizza[],
    totalPrice,
  };
};
