import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import API from "../../../api/api";

const initialState = {
  music: [],
  loading: false,
  error: null,
};

export const fetchMusic = createAsyncThunk(
  "music/song",
  async (_, thunkAPI) => {
    try {
      const res = await API.get("/songs");
      return res.data.songs;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Something went wrong"
      );
    }
  }
);

const musicSlice = createSlice({
  name: "music",
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMusic.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchMusic.fulfilled, (state, action) => {
        state.loading = false;
        state.music = action.payload; // adjust if needed
      })
      .addCase(fetchMusic.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearError } = musicSlice.actions;
export default musicSlice.reducer;