import { CartPizza } from "../redux/Cart/types";

export const calcTotalPrice = (pizzas: CartPizza[]) => {
  return pizzas.reduce((sum, obj) => {
    return obj.price * obj.count + sum;
  }, 0);
};
