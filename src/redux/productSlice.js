import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import toast, { Toaster } from "react-hot-toast";
const BASE_URL = process.env.REACT_APP_API_URL;
const EXTERNAL_API = `${BASE_URL}/product`;
export const retriveProducts = createAsyncThunk(
  "product/getProducts",
  async (_, thunkAPI) => {
    const { rejectWithValue, getState } = thunkAPI;
    const token = getState().auth.token;
    const headers = { Authorization: `anas__${token}` };

    try {
      const res = await fetch(EXTERNAL_API, { headers });
      const data = await res.json();
      if (data.error) {
        return rejectWithValue(data);
      } else {
        return data;
      }
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);
export const retriveProduct = createAsyncThunk(
  "product/retriveProduct",
  async (id, thunkAPI) => {
    const { rejectWithValue, getState } = thunkAPI;
    const token = getState().auth.token;
    const headers = { Authorization: `anas__${token}` };
    try {
      const res = await fetch(`${EXTERNAL_API}/${id}`, { headers });
      const data = await res.json();
      if (data.error) {
        return rejectWithValue(data);
      } else {
        return data;
      }
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

export const insertNewProduct = createAsyncThunk(
  "product/insertProduct",
  async (newProduct, thunkAPI) => {
    const { rejectWithValue, getState } = thunkAPI;
    const token = getState().auth.token;
    try {
      const res = await fetch(EXTERNAL_API, {
        method: "POST",
        headers: {
          Authorization: `anas__${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newProduct),
      });
      const data = await res.json();
      if (data.error) {
        return rejectWithValue(data);
      } else {
        return data;
      }
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);
export const updateProduct = createAsyncThunk(
  "product/updateProduct",
  async ({ id, updatedProduct }, thunkAPI) => {
    const { rejectWithValue, getState } = thunkAPI;
    const token = getState().auth.token;

    try {
      const res = await fetch(`${EXTERNAL_API}/${id}`, {
        method: "PUT",
        headers: {
          Authorization: `anas__${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedProduct),
      });
      const data = await res.json();
      if (data.error) {
        return rejectWithValue(data);
      } else {
        return data;
      }
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);
export const removeProduct = createAsyncThunk(
  "product/deleteProduct",
  async (id, thunkAPI) => {
    const { rejectWithValue, getState } = thunkAPI;
    const token = getState().auth.token;

    const headers = { Authorization: `anas__${token}` };

    try {
      const res = await fetch(EXTERNAL_API + "/" + id, {
        method: "DELETE",
        headers,
      });
      const data = await res.json();
      if (data.error) {
        return rejectWithValue(data);
      } else {
        return data;
      }
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);
export const uploadProductPicture = createAsyncThunk(
  "product/uploadProductPicture",
  async ({ productPicture }, thunkAPI) => {
    const { rejectWithValue, getState } = thunkAPI;
    const token = getState().auth.token;
    const id = getState().product.productIdForTheImage;
    const formData = new FormData();
    formData.set("image", productPicture);
    try {
      const res = await fetch(`${EXTERNAL_API}/productPicture/${id}`, {
        method: "PATCH",
        headers: {
          Authorization: `anas__${token}`,
        },
        body: formData,
      });
      const data = await res.json();
      if (data.error) {
        return rejectWithValue(data);
      } else {
        localStorage.setItem("success", true);
        return data;
      }
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);
export const getProductsCount = createAsyncThunk(
  "product/getproductsCount",
  async (_, thunkAPI) => {
    const { rejectWithValue, getState } = thunkAPI;
    const token = getState().auth.token;
    try {
      const res = await fetch(`${EXTERNAL_API}/count/`, {
        method: "GET",
        headers: {
          Authorization: `anas__${token}`,
        },
      });
      const data = await res.json();
      if (data.error) {
        return rejectWithValue(data);
      } else {
        return data;
      }
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);
const productSlice = createSlice({
  name: "product",
  initialState: {
    products: [],
    targetProduct: "",
    isLoading: false,
    error: "",
    productIdForTheImage: "",
    productsCount: 0,
  },
  extraReducers: {
    //Get product List
    [retriveProducts.pending]: (state, action) => {
      state.isLoading = true;
    },
    [retriveProducts.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.products = action.payload.products;
    },
    [retriveProducts.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload.error;
    },
    // get product
    [retriveProduct.pending]: (state, action) => {
      state.isLoading = true;
    },
    [retriveProduct.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.targetProduct = action.payload.product;
      state.productIdForTheImage = action.payload.product._id;
    },
    [retriveProduct.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload.error;
    },
    // Insert New Product
    [insertNewProduct.pending]: (state, action) => {
      state.isLoading = true;
    },
    [insertNewProduct.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.productIdForTheImage = action.payload.newProduct._id;
      state.products.push(action.payload.newProduct);
      toast.success(action.payload.message);
    },
    [insertNewProduct.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload.error
        ? action.payload.error
        : action.payload;
      toast.error(state.error);
    },
    // update product
    [updateProduct.pending]: (state, action) => {
      state.isLoading = true;
    },
    [updateProduct.fulfilled]: (state, action) => {
      state.isLoading = false;
      const { id } = action.meta.arg;
      const targetIndex = state.products.findIndex((c) => c._id === id);
      state.products[targetIndex] = action.payload.updatedProduct;
      toast.success(action.payload.message);
    },
    [updateProduct.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload.error
        ? action.payload.error
        : action.payload;
      toast.error(state.error);
    },
    // Delete Product
    [removeProduct.pending]: (state, action) => {
      state.isLoading = true;
    },
    [removeProduct.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.products = state.products.filter(
        (product) => product._id !== action.payload.deletedProduct._id
      );
      toast.success(action.payload.message);
    },
    [removeProduct.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload.error
        ? action.payload.error
        : action.payload;
      toast.error(state.error);
    },
    // get Products Count
    [getProductsCount.pending]: (state, action) => {
      state.isLoading = true;
    },
    [getProductsCount.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.productsCount = action.payload.count;
    },
    [getProductsCount.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload.error
        ? action.payload.error
        : action.payload;
      toast.error(state.error);
    },
    // upload  Product Image
    [uploadProductPicture.pending]: (state, action) => {
      state.isLoading = true;
    },
    [uploadProductPicture.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.products.find((p) => p._id === state.productIdForTheImage).image =
        action.payload.image;
      // toast.success(action.payload.message);
    },
    [uploadProductPicture.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload.error
        ? action.payload.error
        : action.payload;
      // toast.error(state.error);
    },
  },
});

export default productSlice.reducer;
