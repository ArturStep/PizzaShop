import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { FilterSliceState, Sort, SortTypeEnum } from "./types";

const initialState: FilterSliceState = {
  searchValue: "",
  currentPage: 1,
  category: 0,
  sort: {
    name: "популярности",
    sortType: SortTypeEnum.RATING,
  },
};

export const filterSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    setCategory: (state, action: PayloadAction<number>) => {
      state.category = action.payload;
    },
    setSearchValue: (state, action: PayloadAction<string>) => {
      state.searchValue = action.payload;
    },
    setSort: (state, action: PayloadAction<Sort>) => {
      state.sort = action.payload;
    },
    setCurrentPage: (state, action: PayloadAction<number>) => {
      state.currentPage = action.payload;
    },
    setFilters: (state, action: PayloadAction<FilterSliceState>) => {
      state.sort = action.payload.sort;
      state.category = Number(action.payload.category);
      state.currentPage = Number(action.payload.currentPage);
    },
  },
});

export const {
  setCategory,
  setSort,
  setFilters,
  setSearchValue,
  setCurrentPage,
} = filterSlice.actions;

export default filterSlice.reducer;
