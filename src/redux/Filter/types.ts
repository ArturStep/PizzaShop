export enum SortTypeEnum {
  RATING = "rating",
  TITLE = "title",
  PRICE = "price",
}

export type Sort = {
  name: string;
  sortType: SortTypeEnum;
};

export interface FilterSliceState {
  searchValue: string;
  currentPage: number;
  category: number;
  sort: Sort;
}
