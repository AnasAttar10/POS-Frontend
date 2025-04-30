import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import toast, { Toaster } from "react-hot-toast";
const BASE_URL = process.env.REACT_APP_API_URL;
const EXTERNAL_API = `${BASE_URL}/unit`;

export const retriveUnits = createAsyncThunk(
  "unit/getUnits",
  async (_, thunkAPI) => {
    const { rejectWithValue, getState } = thunkAPI;
    const token = getState().auth.token;
    const headers = { Authorization: `anas__${token}` };
    try {
      const res = await fetch(EXTERNAL_API, {
        Accept: "application/json",
        headers,
        "Content-Type": "multipart/form-data",
        mode: "cors",
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
export const retriveUnit = createAsyncThunk(
  "unit/getUnit",
  async (id, thunkAPI) => {
    const { rejectWithValue, getState } = thunkAPI;
    const token = getState().auth.token;
    const headers = { Authorization: `anas__${token}` };

    try {
      const res = await fetch(`${EXTERNAL_API}/${id}`, {
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
export const insertNewUnit = createAsyncThunk(
  "unit/insertUnit",
  async (newUnit, thunkAPI) => {
    const { rejectWithValue, getState } = thunkAPI;
    const token = getState().auth.token;
    try {
      const res = await fetch(EXTERNAL_API, {
        method: "POST",
        headers: {
          Authorization: `anas__${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newUnit),
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
export const updateUnit = createAsyncThunk(
  "unit/updateUnit",
  async ({ id, newUnit }, thunkAPI) => {
    const { rejectWithValue, getState } = thunkAPI;
    const token = getState().auth.token;
    try {
      const res = await fetch(`${EXTERNAL_API}/${id}`, {
        method: "PUT",
        headers: {
          Authorization: `anas__${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newUnit),
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
export const removeUnit = createAsyncThunk(
  "unit/deleteUnit",
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
export const getUnitsCount = createAsyncThunk(
  "unit/getUnitsCount",
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

const unitSlice = createSlice({
  name: "unit",
  initialState: {
    units: [],
    targetUnit: "",
    isLoading: false,
    error: "",
    unitsCount: 0,
  },
  extraReducers: {
    //Get unit List
    [retriveUnits.pending]: (state, action) => {
      state.isLoading = true;
    },
    [retriveUnits.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.units = action.payload.units;
    },
    [retriveUnits.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload.error;
    },
    //get unit
    [retriveUnit.pending]: (state, action) => {
      state.isLoading = true;
    },
    [retriveUnit.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.targetUnit = action.payload.unit;
    },
    [retriveUnit.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload.error;
    },
    // Insert New Unit
    [insertNewUnit.pending]: (state, action) => {
      state.isLoading = true;
    },
    [insertNewUnit.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.units.push(action.payload.newUnit);
      toast.success(action.payload.message);
    },
    [insertNewUnit.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload.error
        ? action.payload.error
        : action.payload;
      toast.error(state.error);
    },
    //updateUnit
    [updateUnit.pending]: (state, action) => {
      state.isLoading = true;
    },
    [updateUnit.fulfilled]: (state, action) => {
      state.isLoading = false;
      const { id } = action.meta.arg;
      const targetIndex = state.units.findIndex((c) => c._id === id);
      state.units[targetIndex] = action.payload.updatedUnit;
      toast.success(action.payload.message);
    },
    [updateUnit.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload.error
        ? action.payload.error
        : action.payload;
      toast.error(state.error);
    },
    //delete unit
    [removeUnit.pending]: (state, action) => {
      state.isLoading = true;
    },
    [removeUnit.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.units = state.units.filter(
        (unit) => unit._id !== action.payload.deletedUnit._id
      );
      toast.success(action.payload.message);
    },
    [removeUnit.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload.error
        ? action.payload.error
        : action.payload;
      toast.error(state.error);
    },
    //get units Count
    [getUnitsCount.pending]: (state, action) => {
      state.isLoading = true;
    },
    [getUnitsCount.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.unitsCount = action.payload.count;
    },
    [getUnitsCount.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload.error
        ? action.payload.error
        : action.payload;
      toast.error(state.error);
    },
  },
});

export default unitSlice.reducer;
