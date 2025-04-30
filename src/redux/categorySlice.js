import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import toast, { Toaster } from "react-hot-toast";
const BASE_URL = process.env.REACT_APP_API_URL;
const EXTERNAL_API = `${BASE_URL}/category`;
export const retriveCategories = createAsyncThunk(
  "category/getCategoriess",
  async (_, thunkAPI) => {
    const { rejectWithValue, getState } = thunkAPI;
    const token = getState().auth.token;
    const currentUser = getState().auth.userName;
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
export const retriveCategory = createAsyncThunk(
  "category/retriveCategory",
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
export const insertNewCategory = createAsyncThunk(
  "category/insertCategory",
  async (newCategory, thunkAPI) => {
    const { rejectWithValue, getState } = thunkAPI;
    const token = getState().auth.token;
    try {
      const res = await fetch(EXTERNAL_API, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `anas__${token}`,
        },
        body: JSON.stringify(newCategory),
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
export const updateCategory = createAsyncThunk(
  "category/udateCategory",
  async ({ id, newCategory }, thunkAPI) => {
    const { rejectWithValue, getState } = thunkAPI;
    const token = getState().auth.token;
    try {
      const res = await fetch(`${EXTERNAL_API}/${id}`, {
        method: "PUT",
        headers: {
          Authorization: `anas__${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newCategory),
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
export const removeCategory = createAsyncThunk(
  "category/deleteCategory",
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
export const uploadCategoryPicture = createAsyncThunk(
  "category/uploadCategoryPicture",
  async ({ categoryPicture }, thunkAPI) => {
    const { rejectWithValue, getState } = thunkAPI;
    const token = getState().auth.token;
    const id = getState().category.categoryIdForTheImage;
    const formData = new FormData();
    formData.set("image", categoryPicture);
    try {
      const res = await fetch(`${EXTERNAL_API}/categoryPicture/${id}`, {
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

export const getcategoriesCount = createAsyncThunk(
  "product/getcategoriesCount",
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

const categorySlice = createSlice({
  name: "category",
  initialState: {
    categories: [],
    targetCategory: "",
    isLoading: false,
    error: "",
    categoryIdForTheImage: "",
    categoriesCount: 0,
  },
  extraReducers: {
    //Get Categories List
    [retriveCategories.pending]: (state, action) => {
      state.isLoading = true;
    },
    [retriveCategories.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.categories = action.payload.categories;
    },
    [retriveCategories.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload.error;
    },
    // getCategory
    [retriveCategory.pending]: (state, action) => {
      state.isLoading = true;
    },
    [retriveCategory.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.targetCategory = action.payload.category;
      state.categoryIdForTheImage = action.payload.category._id;
    },
    [retriveCategory.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload.error;
    },
    // Insert New Category
    [insertNewCategory.pending]: (state, action) => {
      state.isLoading = true;
    },
    [insertNewCategory.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.categoryIdForTheImage = action.payload.newCategory._id;
      state.categories.push(action.payload.newCategory);
      toast.success(action.payload.message);
    },
    [insertNewCategory.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload.error
        ? action.payload.error
        : action.payload;
      toast.error(state.error);
    },
    // update Category
    [updateCategory.pending]: (state, action) => {
      state.isLoading = true;
    },
    [updateCategory.fulfilled]: (state, action) => {
      state.isLoading = false;
      const { id } = action.meta.arg;
      const targetIndex = state.categories.findIndex((c) => c._id === id);
      state.categories[targetIndex] = action.payload.updatedCategory;
      toast.success(action.payload.message);
    },
    [updateCategory.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload.error
        ? action.payload.error
        : action.payload;
      toast.error(state.error);
    },
    //Delete Category
    [removeCategory.pending]: (state, action) => {
      state.isLoading = true;
    },
    [removeCategory.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.categories = state.categories.filter(
        (category) => category._id !== action.payload.deletedCategory._id
      );
      toast.success(action.payload.message);
    },
    [removeCategory.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload.error
        ? action.payload.error
        : action.payload;
      toast.error(state.error);
    },
    //get Categories count
    [getcategoriesCount.pending]: (state, action) => {
      state.isLoading = true;
    },
    [getcategoriesCount.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.categoriesCount = action.payload.count;
      // toast.success(action.payload.message);
    },
    [getcategoriesCount.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload.error
        ? action.payload.error
        : action.payload;
      toast.error(state.error);
    },
    //upload Category image
    [uploadCategoryPicture.pending]: (state, action) => {
      state.isLoading = true;
    },
    [uploadCategoryPicture.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.categories.find(
        (c) => c._id === state.categoryIdForTheImage
      ).image = action.payload.image;
    },
    [uploadCategoryPicture.rejected]: (state, action) => {
      state.isLoading = false;
      // state.error = action.payload.error;
    },
  },
});

export default categorySlice.reducer;
