import { createSlice } from "@reduxjs/toolkit";
import { getProducts, getItemProduct } from "../middlewares/shopMiddleware";
export const shopSlice = createSlice({
  name: "shop",
  initialState: {
    productsList: {},
    status: "idle",
    details: {},
    statusDetails: "idle",
  },
  reducers: {},
  extraReducers: (builder) => {
    //getProducts
    builder.addCase(getProducts.pending, (state) => {
      state.status = "pending";
    });
    builder.addCase(getProducts.fulfilled, (state, action) => {
      state.productsList = action.payload;
      state.status = "success";
    });
    builder.addCase(getProducts.rejected, (state) => {
      state.status = "failed";
    });
    //
    // getUserDetails
    builder.addCase(getItemProduct.pending, (state) => {
      state.statusDetails = "pending";
    });
    builder.addCase(getItemProduct.fulfilled, (state, action) => {
      state.details = action.payload;
      state.statusDetails = "success";
    });
    builder.addCase(getItemProduct.rejected, (state) => {
      state.statusDetails = "failed";
    });
  },
});

// export const { resetUserDetails } = shopSlice.actions;
