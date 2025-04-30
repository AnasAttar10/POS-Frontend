import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import toast, { Toaster } from "react-hot-toast";
const BASE_URL = process.env.REACT_APP_API_URL;
const EXTERNAL_API = `${BASE_URL}/user`;
export const signUp = createAsyncThunk(
  "auth/signUp",
  async (newUser, thunkAPI) => {
    const { rejectWithValue, getState } = thunkAPI;
    try {
      const res = await fetch(`${EXTERNAL_API}/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newUser),
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
export const signIn = createAsyncThunk(
  "auth/signIn",
  async (newUser, thunkAPI) => {
    const { rejectWithValue, getState } = thunkAPI;
    try {
      const res = await fetch(`${EXTERNAL_API}/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newUser),
      });
      const data = await res.json();
      console.log(data);
      if (data.error) {
        return rejectWithValue(data);
      } else {
        localStorage.setItem("token", JSON.stringify(data.token));
        localStorage.setItem("userInfo", JSON.stringify(data.cuser));
        return data;
      }
    } catch (error) {
      console.log("error in auth ");
      return rejectWithValue(error.message);
    }
  }
);
export const getUsersCount = createAsyncThunk(
  "unit/getUsersCount",
  async (_, thunkAPI) => {
    const { rejectWithValue, getState } = thunkAPI;
    const token = getState().auth.token;
    const headers = { Authorization: `anas__${token}` };
    try {
      const res = await fetch(`${EXTERNAL_API}/count`, {
        method: "GET",
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
export const uploadUserPicture = createAsyncThunk(
  "auth/uploadUserPicture",
  async ({ profilePicture }, thunkAPI) => {
    const { rejectWithValue, getState } = thunkAPI;
    const id = getState().auth.userIdForTheImage;

    const formData = new FormData();
    formData.set("image", profilePicture);
    try {
      const res = await fetch(`${EXTERNAL_API}/profilePicture/${id}`, {
        method: "PATCH",
        body: formData,
      });
      const data = await res.json();
      console.log("upload image ");
      console.log(data);
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
const authSlice = createSlice({
  name: "auth",
  initialState: {
    token: localStorage.getItem("token")
      ? JSON.parse(localStorage.getItem("token"))
      : "",

    userName: localStorage.getItem("userInfo")
      ? JSON.parse(localStorage.getItem("userInfo")).userName
      : "",
    userImage: localStorage.getItem("userInfo")
      ? JSON.parse(localStorage.getItem("userInfo")).profilePicture
      : "",
    isAdmin: localStorage.getItem("userInfo")
      ? JSON.parse(localStorage.getItem("userInfo")).isAdmin
      : false,
    userId: localStorage.getItem("userInfo")
      ? JSON.parse(localStorage.getItem("userInfo"))._id
      : "",
    error: false,
    isLoading: false,
    userIdForTheImage: "",
    usersCount: 0,
  },
  reducers: {
    logout: (state, action) => {
      localStorage.removeItem("token");
      localStorage.removeItem("userInfo");
    },
  },
  extraReducers: {
    //signUp
    [signUp.pending]: (state, action) => {
      state.isLoading = true;
    },
    [signUp.fulfilled]: (state, action) => {
      console.log(action);
      state.userIdForTheImage = action.payload.user._id;

      state.isLoading = false;
    },
    [signUp.rejected]: (state, action) => {
      state.isLoading = false;
      console.log(action);
      state.error = action.payload.error
        ? action.payload.error
        : action.payload;
      toast.error(state.error);
    },
    //signIn
    [signIn.pending]: (state, action) => {
      state.isLoading = true;
    },
    [signIn.fulfilled]: (state, action) => {
      state.isLoading = false;
      console.log(action);
      state.token = JSON.parse(localStorage.getItem("token"));
      state.userName = JSON.parse(localStorage.getItem("userInfo")).userName;
      state.userImage = JSON.parse(
        localStorage.getItem("userInfo")
      ).profilePicture;
      state.isAdmin = JSON.parse(localStorage.getItem("userInfo")).isAdmin;
      state.userId = JSON.parse(localStorage.getItem("userInfo"))._id;
    },
    [signIn.rejected]: (state, action) => {
      state.isLoading = false;
      console.log(action);
      state.error = action.payload.error
        ? action.payload.error
        : action.payload;
      toast.error(state.error);
    },
    //get users Count
    [getUsersCount.pending]: (state, action) => {
      state.isLoading = true;
    },
    [getUsersCount.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.usersCount = action.payload.count;
    },
    [getUsersCount.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload.error
        ? action.payload.error
        : action.payload;
      toast.error(state.error);
    },
    //upload userImage
    [uploadUserPicture.pending]: (state, action) => {
      state.isLoading = true;
    },
    [uploadUserPicture.fulfilled]: (state, action) => {
      state.isLoading = false;
      console.log(action);
    },
    [uploadUserPicture.rejected]: (state, action) => {
      state.isLoading = false;
      console.log(action);
      state.error = action.payload.error
        ? action.payload.error
        : action.payload;
      toast.error(state.error);
    },
  },
});
export const { logout } = authSlice.actions;
export default authSlice.reducer;
