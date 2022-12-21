import React, { useCallback, useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import qs from "qs";

import Categories from "../components/Categories/Categories";
import Sort, { sortList } from "../components/Sort/Sort";
import Skeleton from "../components/PizzaBlock/Skeleton";
import PizzaBlock, {
  PizzaBlockProps,
} from "../components/PizzaBlock/PizzaBlock";
import Pagination from "../components/Pagination/Pagination";
import { setCategory, setCurrentPage, setFilters } from "../redux/Filter/slice";
import { FetchPizzasArgs } from "../redux/Pizzas/types";
import { fetchPizzas, getTotalCount } from "../redux/Pizzas/asyncAction";
import { RootState, useAppDispatch } from "../redux/store";
import NotFoundBlock from "../components/NotFoundBlock/NotFoundBlock";

const Home: React.FC = () => {
  const { category, sort, currentPage, searchValue } = useSelector(
    ({ filter }: RootState) => filter
  );

  const { pizzas, status } = useSelector(({ pizzas }: RootState) => pizzas);

  const dispatch = useAppDispatch();

  const isSearch = useRef(false);

  const isMount = useRef(false);

  const navigate = useNavigate();

  const onChangeCategory = useCallback((idx: number) => {
    dispatch(setCategory(idx));
    dispatch(setCurrentPage(1));
  }, []);

  const onChangePage = (page: number) => {
    dispatch(setCurrentPage(page));
  };

  const getPizzas = async (p: FetchPizzasArgs) => {
    const sortBy = sort.sortType;
    const categoryId = category > 0 ? `&category=${category}` : "";
    const search = searchValue ? `&search=${searchValue}` : "";

    dispatch(
      getTotalCount({
        sortBy,
        categoryId,
        search,
      })
    );

    dispatch(
      fetchPizzas({
        currentPage: String(currentPage),
        sortBy,
        categoryId,
        search,
      })
    );
  };

  //Если изменили параметры и был первый рендер.
  useEffect(() => {
    if (isMount.current) {
      const queryString = qs.stringify({
        sortBy: sort.sortType,
        category,
        currentPage,
      });

      navigate(`?${queryString}`);
    }

    isMount.current = true;
  }, [category, sort.sortType, currentPage]);

  // Если был первый рендер, то проверяем URL-параметры и сохраняем в редаксе.
  useEffect(() => {
    if (window.location.search) {
      const params = qs.parse(
        window.location.search.substring(1)
      ) as unknown as FetchPizzasArgs;

      const sort = sortList.find((obj) => obj.sortType === params.sortBy);

      dispatch(
        setFilters({
          searchValue: params.search,
          currentPage: Number(params.currentPage),
          category: Number(params.categoryId),
          sort: sort || sortList[0],
        })
      );

      isSearch.current = true;
    }
  }, []);

  // Если был первый рендер то запрашиваем пиццы.
  useEffect(() => {
    window.scrollTo(0, 0);

    if (!isSearch.current) {
      getPizzas({} as FetchPizzasArgs);
    }

    isSearch.current = false;
  }, [category, sort.sortType, searchValue, currentPage]);

  const skeleton = [...new Array(6)].map((_, i) => <Skeleton key={i} />);

  const pizzasList = pizzas.map((obj: PizzaBlockProps) => (
    <PizzaBlock {...obj} key={obj.id} />
  ));

  return (
    <>
      <div className="content__top">
        <Categories onChangeCategory={onChangeCategory} />

        <Sort />
      </div>

      <h2 className="content__title">Все пиццы</h2>

      {status === "error" || (status === "success" && !pizzas.length) ? (
        <NotFoundBlock />
      ) : (
        <>
          <div className="content__items">
            {status === "loading" ? skeleton : pizzasList}
          </div>
          <Pagination onChangePage={onChangePage} />
        </>
      )}
    </>
  );
};

export default Home;
