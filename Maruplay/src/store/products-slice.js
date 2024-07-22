import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const productsSlice = createSlice({
  name: "products",
  initialState: {
    items: [],
    loading: false,
  },
  reducers: {
    fetch: (state, action) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes.
      // Also, no return statement is required from these functions.
      console.log(action);
      const products = action.payload;
      state.items = [...products];
    },
    fetchLoading: (state, action) => {
      state.loading = action.payload;
    },
    incrementByAmount: (state, action) => {
      state.value += action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { fetch, fetchLoading } = productsSlice.actions;

export function fetchProducts() {
  return async (dispatch) => {
    try {
      dispatch(fetchLoading(true));
      const response = await axios({
        method: "get",
        url: import.meta.env.VITE_BASE_URL + "/products?category=2",
        headers: {
          Authorization: "Bearer " + localStorage.getItem("access_token"),
        },
      });
      console.log(response);
      // setProucts(response.data.rows);
      dispatch(fetch(response.data.rows));
    } catch (error) {
      console.log(error);
    } finally {
      dispatch(fetchLoading(false));
    }
  };
}

export default productsSlice.reducer;