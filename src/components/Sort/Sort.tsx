import React, { memo } from "react";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { setSort } from "../../redux/Filter/slice";
import { SortTypeEnum } from "../../redux/Filter/types";
import { RootState } from "../../redux/store";

import s from "./Sort.module.scss";

type SortItem = {
  name: string;
  sortType: SortTypeEnum;
};

export const sortList: SortItem[] = [
  { sortType: SortTypeEnum.RATING, name: "популярности" },
  { sortType: SortTypeEnum.PRICE, name: "цене" },
  { sortType: SortTypeEnum.TITLE, name: "алфавиту" },
];

type PopupClick = React.MouseEvent<HTMLBodyElement> & {
  path: Node[];
};

const Sort: React.FC = memo(() => {
  const [isActive, setIsActive] = useState(false);

  const sort = useSelector(({ filter }: RootState) => filter.sort);

  const dispatch = useDispatch();

  const sortRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const _event = event as unknown as PopupClick;
      if (sortRef.current && !_event.path.includes(sortRef.current)) {
        setIsActive(false);
      }
    };

    document.body.addEventListener("click", handleClickOutside);

    return () => document.body.removeEventListener("click", handleClickOutside);
  }, []);

  const onClickSelectSort = (obj: SortItem) => {
    dispatch(setSort(obj));
    setIsActive(false);
  };

  return (
    <div className="sort" ref={sortRef}>
      <div className="sort__label">
        <svg
          onClick={() => setIsActive(!isActive)}
          className={isActive ? s.svgActive : s.svgClose}
          width="10"
          height="6"
          viewBox="0 0 10 6"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          cursor="pointer"
        >
          <path
            d="M10 5C10 5.16927 9.93815 5.31576 9.81445 5.43945C9.69075 5.56315 9.54427 5.625 9.375 5.625H0.625C0.455729 5.625 0.309245 5.56315 0.185547 5.43945C0.061849 5.31576 0 5.16927 0 5C0 4.83073 0.061849 4.68424 0.185547 4.56055L4.56055 0.185547C4.68424 0.061849 4.83073 0 5 0C5.16927 0 5.31576 0.061849 5.43945 0.185547L9.81445 4.56055C9.93815 4.68424 10 4.83073 10 5Z"
            fill="#2C2C2C"
          />
        </svg>
        <b>Сортировка по:</b>
        <span onClick={() => setIsActive(!isActive)}>{sort.name}</span>
      </div>
      {isActive && (
        <div className="sort__popup">
          <ul>
            {sortList.map((obj, i) => (
              <li
                key={i}
                onClick={() => onClickSelectSort(obj)}
                className={sort.sortType === obj.sortType ? "active" : ""}
              >
                {obj.name}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
});

export default Sort;
