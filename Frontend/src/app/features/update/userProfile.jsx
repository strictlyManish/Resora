import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import API from "../../../api/api";


const initialState = {
  user: null,
  loading: false,
  error: null,
};


export const updateProfile = createAsyncThunk(
  "profile/updateProfile",
  async ({ id, bio, file }, thunkAPI) => {
    try {
      const formData = new FormData();

      if (bio) formData.append("bio", bio);
      if (file) formData.append("profileImage", file);

      const res = await API.post(`/update/profile/${id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      return res.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data?.message);
    }
  }


);

const ProfileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(updateProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
      })
      .addCase(updateProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearError } = ProfileSlice.actions;
export default ProfileSlice.reducer;