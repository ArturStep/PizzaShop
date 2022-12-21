import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";

import PizzaBlock, {
  PizzaBlockProps,
} from "../components/PizzaBlock/PizzaBlock";
import Skeleton from "../components/PizzaBlock/Skeleton";

const FullPizza: React.FC = () => {
  const [pizza, setPizza] = useState<PizzaBlockProps>();
  const { id } = useParams();

  useEffect(() => {
    const fetchPizza = async () => {
      try {
        const { data } = await axios.get(
          "https://6350005778563c1d82b619bd.mockapi.io/pizzas/" + id
        );
        setPizza(data);
      } catch (error) {
        alert("Ошибка при получении пиццы.");
      }
    };

    fetchPizza();
  }, []);

  if (!pizza) {
    return <Skeleton />;
  }

  return (
    <>
      <PizzaBlock {...pizza} fullPizzasStyle={{ margin: "0 auto" }} />
      <Link
        to="/"
        className="button button--black"
        style={{ display: "block", width: "200px", margin: "20px auto 0 auto" }}
      >
        <span>Вернуться назад</span>
      </Link>
    </>
  );
};

export default FullPizza;
