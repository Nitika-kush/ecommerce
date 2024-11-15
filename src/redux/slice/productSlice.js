import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
const initialState = {
  products: [],
  status: "idle",
  error: null,
};
export const fetchProducts = createAsyncThunk(
  "products/fetchProduct",
  async () => {
    const response = await fetch("http://localhost:3000/products");
    const product = await response.json();
    return product;
  }
);

const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.status = "pending";
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        (state.status = "successfull"), (state.products = action.payload);
      })
      .addCase(fetchProducts.rejected, (state) => {
        state.status = "rejected";
      });
  },
});
export default productSlice.reducer;
