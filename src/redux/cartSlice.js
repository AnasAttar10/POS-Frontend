import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import toast, { Toaster } from "react-hot-toast";
const BASE_URL = process.env.REACT_APP_API_URL;
const EXTERNAL_API = `${BASE_URL}/cart`;
export const retriveCarts = createAsyncThunk(
  "cart/getCarts",
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
export const retriveCart = createAsyncThunk(
  "cart/retriveCart",
  async (cartId, thunkAPI) => {
    const { rejectWithValue, getState } = thunkAPI;
    const token = getState().auth.token;
    const headers = { Authorization: `anas__${token}` };
    try {
      const res = await fetch(`${EXTERNAL_API}/${cartId}`, { headers });
      const result = await res.json();
      if (result.error) {
        return rejectWithValue(result);
      } else {
        return result.cart[0].products;
      }
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);
export const InsertNewCart = createAsyncThunk(
  "cart/insertCart",
  async (newCart, thunkAPI) => {
    const { rejectWithValue, getState } = thunkAPI;
    const token = getState().auth.token;

    try {
      const res = await fetch(EXTERNAL_API, {
        method: "POST",
        headers: {
          Authorization: `anas__${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newCart),
      });
      const success = await res.json();
      if (success.error) {
        return rejectWithValue(success);
      } else {
        return success;
      }
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

export const insertProductToCart = createAsyncThunk(
  "cart/insertProductToCart",
  async ({ cartId, productId }, thunkAPI) => {
    const { rejectWithValue, getState } = thunkAPI;
    const token = getState().auth.token;

    const headers = { Authorization: `anas__${token}` };
    const newProduct = getState().product.products.find(
      (p) => p._id === productId
    );
    try {
      const res = await fetch(
        `${EXTERNAL_API}/${cartId}/product/${productId}`,
        {
          method: "PUT",
          headers: {
            Authorization: `anas__${token}`,
            "Content-Type": "application/json",
          },
        }
      );
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
export const removeeProduct = createAsyncThunk(
  "cart/deleteproductfromcart",
  async ({ cartId, productId }, thunkAPI) => {
    const { rejectWithValue, getState } = thunkAPI;
    const token = getState().auth.token;

    const headers = { Authorization: `anas__${token}` };
    try {
      const res = await fetch(
        `${EXTERNAL_API}/${cartId}/removeproduct/${productId}`,
        {
          method: "DELETE",
          headers,
        }
      );
      const data = await res.json();
      console.log(data);
      if (data.error) {
        return rejectWithValue(data);
      } else {
        return productId;
      }
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);
export const increseProductQuantity = createAsyncThunk(
  "cart/increseProductQuantity",
  async ({ cartId, productId, productQuantity }, thunkAPI) => {
    const { rejectWithValue, getState } = thunkAPI;
    const token = getState().auth.token;

    const headers = { Authorization: `anas__${token}` };
    try {
      const res = await fetch(
        `${EXTERNAL_API}/${cartId}/productquantity/${productId}`,
        {
          method: "PUT",
          headers: {
            Authorization: `anas__${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ newQuantity: productQuantity }),
        }
      );
      const data = await res.json();
      if (data.error) {
        return rejectWithValue(data);
      } else {
        return productId;
      }
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

export const decreseProductQuantity = createAsyncThunk(
  "cart/decreseProductQuantity",
  async ({ cartId, productId, productQuantity }, thunkAPI) => {
    const { rejectWithValue, getState } = thunkAPI;
    const token = getState().auth.token;

    const headers = { Authorization: `anas__${token}` };
    try {
      const res = await fetch(
        `${EXTERNAL_API}/${cartId}/productquantity/${productId}`,
        {
          method: "PUT",
          headers: {
            Authorization: `anas__${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ newQuantity: productQuantity }),
        }
      );
      const data = await res.json();
      if (data.error) {
        return rejectWithValue(data);
      } else {
        return productId;
      }
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);
export const removeCart = createAsyncThunk(
  "cart/removeCart",
  async (id, thunkAPI) => {
    const { rejectWithValue, getState } = thunkAPI;
    const token = getState().auth.token;
    const headers = { Authorization: `anas__${token}` };
    try {
      const res = await fetch(`${EXTERNAL_API}/${id}`, {
        method: "DELETE",
        headers,
      });
      const data = await res.json();
      console.log(data);
      console.log(data);
      if (data.error) {
        return rejectWithValue(data);
      } else {
        return data;
      }
    } catch (err) {
      console.log(err);
      return rejectWithValue(err.message);
    }
  }
);

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    carts: [],
    products1: [],
    currentCart: "",
    isLoading: false,
    error: "",
  },
  extraReducers: {
    //Get carts List
    [retriveCarts.pending]: (state, action) => {
      state.isLoading = true;
    },
    [retriveCarts.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.carts = action.payload.carts;
      state.products1 = [];
      state.currentCart = "";
    },
    [retriveCarts.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload.error
        ? action.payload.error
        : action.payload;
      console.log(action.payload);
      toast.error(state.error);
    },
    //choose current cart and change the target products
    [retriveCart.pending]: (state, action) => {
      state.isLoading = true;
    },
    [retriveCart.fulfilled]: (state, action) => {
      state.products1 = action.payload;
      state.currentCart = action.meta.arg;
      state.isLoading = false;
    },
    [retriveCart.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload.error
        ? action.payload.error
        : action.payload;
      console.log(action.payload);
      toast.error(state.error);
    },
    //Insert New cart
    [InsertNewCart.pending]: (state, action) => {
      state.isLoading = true;
    },
    [InsertNewCart.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.carts.push(action.payload.newCart);
      toast.success(action.payload.message);
    },
    [InsertNewCart.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload.error
        ? action.payload.error
        : action.payload;
      console.log(action.payload);
      toast.error(state.error);
    },
    //remove cart
    [removeCart.pending]: (state, action) => {
      state.isLoading = true;
    },
    [removeCart.fulfilled]: (state, action) => {
      state.isLoading = false;
      console.log(action);
      state.carts = state.carts.filter(
        (c) => c._id !== action.payload.deletedCart._id
      );
      state.products1 = [];
      state.currentCart = "";
      toast.success(`Thank You `);
    },
    [removeCart.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload.error
        ? action.payload.error
        : action.payload;
      console.log(action.payload);
      toast.error(state.error);
    },
    //insertProductToCart
    [insertProductToCart.pending]: (state, action) => {
      state.isLoading = true;
    },
    [insertProductToCart.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.products1 = action.payload.insertedProduct.products;
      toast.success("Added product Successfully");
    },
    [insertProductToCart.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload.error
        ? action.payload.error
        : action.payload;
      console.log(action.payload);
      toast.error(state.error);
    },

    //remove product from the cart
    [removeeProduct.pending]: (state, action) => {
      state.isLoading = true;
    },
    [removeeProduct.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.products1 = state.products1.filter((p) => p._id !== action.payload);
    },
    [removeeProduct.rejected]: (state, action) => {
      state.isLoading = false;
      console.log(action);
      state.error = action.payload.error
        ? action.payload.error
        : action.payload;
      console.log(action.payload);
      toast.error(state.error);
    },
    //increse product quantity
    [increseProductQuantity.pending]: (state, action) => {
      state.isLoading = true;
    },
    [increseProductQuantity.fulfilled]: (state, action) => {
      state.isLoading = false;
      const { cartId, productId, productQuantity } = action.meta.arg;
      state.products1.find((p) => p._id === productId).quantity =
        productQuantity;
    },
    [increseProductQuantity.rejected]: (state, action) => {
      state.isLoading = false;
      console.log(action);
      state.error = action.payload.error
        ? action.payload.error
        : action.payload;
      console.log(action.payload);
      toast.error(state.error);
    },
    //decrese product quantity
    [decreseProductQuantity.pending]: (state, action) => {
      state.isLoading = true;
    },
    [decreseProductQuantity.fulfilled]: (state, action) => {
      state.isLoading = false;
      const { cartId, productId, productQuantity } = action.meta.arg;
      state.products1.find((p) => p._id === productId).quantity =
        productQuantity;
    },
    [decreseProductQuantity.rejected]: (state, action) => {
      state.isLoading = false;
      console.log(action);
      state.error = action.payload.error
        ? action.payload.error
        : action.payload;
      console.log(action.payload);
      toast.error(state.error);
    },
  },
});

export default cartSlice.reducer;
