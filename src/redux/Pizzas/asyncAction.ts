import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { FetchPizzasArgs, Pizza } from "./types";

export const fetchPizzas = createAsyncThunk<Pizza[], FetchPizzasArgs>(
  "pizzas/fetchPizzasStatus",
  async ({ currentPage, sortBy, categoryId, search }) => {
    const { data } = await axios.get<Pizza[]>(
      `https://6350005778563c1d82b619bd.mockapi.io/pizzas?page=${currentPage}&limit=4&${categoryId}&sortBy=${sortBy}&order=desc${search}`
    );
    return data as Pizza[];
  }
);

export const getTotalCount = createAsyncThunk<number, FetchPizzasArgs>(
  "pizzas/totalCountStatus",
  async ({ sortBy, categoryId, search }) => {
    const { data } = await axios.get<Pizza[]>(
      `https://6350005778563c1d82b619bd.mockapi.io/pizzas?${categoryId}&sortBy=${sortBy}&order=desc${search}`
    );
    return data.length as number;
  }
);
