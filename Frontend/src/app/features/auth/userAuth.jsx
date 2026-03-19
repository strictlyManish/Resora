import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import API from "../../../api/api";
import { updateProfile } from "../update/userProfile";

// ---------------- INITIAL STATE ----------------
const initialState = {
  user: null,
  loading: true,
  error: null,
};

// ---------------- ASYNC THUNKS ----------------

// ✅ REGISTER
export const registerUser = createAsyncThunk(
  "auth/register",
  async (userData, thunkAPI) => {
    try {
      const res = await API.post("/auth/register", userData);
      return res.data; // { success, user }
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data?.message);
    }
  },
);

// ✅ LOGIN
export const loginUser = createAsyncThunk(
  "auth/login",
  async (userData, thunkAPI) => {
    try {
      const res = await API.post("/auth/login", userData);
      return res.data; // { success, user }
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data?.message);
    }
  },
);

// ✅ GET CURRENT USER
export const getUser = createAsyncThunk("auth/getUser", async (_, thunkAPI) => {
  try {
    const res = await API.get("/auth/get-me");
    return res.data.user;
  } catch (err) {
    return thunkAPI.rejectWithValue(err.response?.data?.message);
  }
});

// ✅ LOGOUT
export const logoutUser = createAsyncThunk(
  "auth/logout",
  async (_, thunkAPI) => {
    try {
      await API.get("/auth/logout");
      return true;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data?.message);
    }
  },
);

// ---------------- SLICE ----------------

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
  },

  extraReducers: (builder) => {
    builder

      // -------- REGISTER --------
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // -------- LOGIN --------
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      

      // -------- GET USER --------
      .addCase(getUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(getUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(getUser.rejected, (state) => {
        state.loading = false;
        state.user = null;
      })

      .addCase(updateProfile.fulfilled, (state, action) => {
        state.user = action.payload.user;
      })

      // -------- LOGOUT --------
      .addCase(logoutUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.loading = false;
        state.user = null;
      })
      .addCase(logoutUser.rejected, (state) => {
        state.loading = false;
      });
  },
});

export const { clearError } = authSlice.actions;
export default authSlice.reducer;
