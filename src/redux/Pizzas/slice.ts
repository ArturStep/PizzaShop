import { createSlice } from "@reduxjs/toolkit";
import { PizzaSliceState, Status } from "./types";
import { fetchPizzas, getTotalCount } from "./asyncAction";

const initialState: PizzaSliceState = {
  pizzas: [],
  totalCount: 0,
  status: Status.LOADING, //loading | success | error
};

export const pizzasSlice = createSlice({
  name: "pizzas",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchPizzas.pending, (state) => {
      state.status = Status.LOADING;
      state.pizzas = [];
    });
    builder.addCase(fetchPizzas.fulfilled, (state, action) => {
      state.pizzas = action.payload;
      state.status = Status.SUCCESS;
    });
    builder.addCase(fetchPizzas.rejected, (state) => {
      state.status = Status.ERROR;
      state.pizzas = [];
    });
    builder.addCase(getTotalCount.pending, (state) => {
      state.status = Status.LOADING;
      state.totalCount = 0;
    });
    builder.addCase(getTotalCount.fulfilled, (state, action) => {
      state.totalCount = action.payload;
      state.status = Status.SUCCESS;
    });
    builder.addCase(getTotalCount.rejected, (state) => {
      state.status = Status.ERROR;
      state.totalCount = 0;
    });
  },
});

export default pizzasSlice.reducer;
