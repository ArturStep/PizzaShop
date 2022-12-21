import React from "react";
import ReactPaginate from "react-paginate";
import { useSelector } from "react-redux";

import s from "./Pagination.module.scss";
import { RootState } from "../../redux/store";

type PaginationProps = {
  onChangePage: (page: number) => void;
};

const Pagination: React.FC<PaginationProps> = ({ onChangePage }) => {
  const currentPage = useSelector(
    ({ filter }: RootState) => filter.currentPage
  );

  const totalCount = useSelector(({ pizzas }: RootState) => pizzas.totalCount);

  const pageRangeDisplayed = 4;

  const pageCount = Math.ceil(totalCount / pageRangeDisplayed);

  return (
    <ReactPaginate
      className={s.root}
      breakLabel="..."
      nextLabel=">"
      onPageChange={(e) => onChangePage(e.selected + 1)}
      pageRangeDisplayed={pageRangeDisplayed}
      pageCount={pageCount}
      forcePage={currentPage - 1}
      previousLabel="<"
    />
  );
};

export default Pagination;
