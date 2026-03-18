import { createSlice } from "@reduxjs/toolkit";
import API from "../../../api/api";

// ---------------- INITIAL STATE ----------------
const initialState = {
  user: null,
  loading: true,
  error: null,
};

const ProfileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
  },
});
