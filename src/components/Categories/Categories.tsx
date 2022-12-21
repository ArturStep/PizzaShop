import React, { memo } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";

type CategoriesProps = {
  onChangeCategory: (i: number) => void;
};

const categories = ["Все", "Мясные", "Вегетарианская", "Гриль", "Острые"];

const Categories: React.FC<CategoriesProps> = memo(({ onChangeCategory }) => {
  const category = useSelector(({ filter }: RootState) => filter.category);

  const onClickSetCategory = (i: any) => {
    onChangeCategory(i);
  };

  return (
    <div className="categories">
      <ul>
        {categories.map((value, i) => (
          <li
            key={value}
            onClick={() => onClickSetCategory(i)}
            className={category === i ? "active" : ""}
          >
            {value}
          </li>
        ))}
      </ul>
    </div>
  );
});

export default Categories;
