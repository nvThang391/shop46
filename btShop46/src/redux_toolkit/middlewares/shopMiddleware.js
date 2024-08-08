import { createAsyncThunk } from "@reduxjs/toolkit";
export const getProducts = createAsyncThunk(
  "getProducts",
  async ({ page, itemPerPage }, { rejectWithValue }) => {
    {
      try {
        const serverApi = `${
          import.meta.env.VITE_SERVER_API
        }/products?limit=${itemPerPage}&page=${page}`;
        const response = await fetch(serverApi);
        if (!response.ok) {
          throw new Error("da co loi xay ra");
        }
        const data = await response.json();
        return data;
      } catch (error) {
        return rejectWithValue(error.message);
      }
    }
  }
);
export const getItemProduct = createAsyncThunk(
  "getDetails",
  async (id, { rejectWithValue }) => {
    try {
      const serverApi = `${import.meta.env.VITE_SERVER_API}/products/${id}`;
      const response = await fetch(serverApi);
      if (!response.ok) {
        throw new Error("Không tìm thấy san pham");
      }
      const data = await response.json();
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
