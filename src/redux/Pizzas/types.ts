export enum Status {
  LOADING = "loading",
  SUCCESS = "success",
  ERROR = "error",
}

export type FetchPizzasArgs = {
  currentPage?: string;
  sortBy: string;
  categoryId: string;
  search: string;
};

export type Pizza = {
  id: string;
  imageUrl: string;
  title: string;
  types: number[];
  sizes: number[];
  price: number;
};

export interface PizzaSliceState {
  pizzas: Pizza[];
  totalCount: number;
  status: Status;
}
