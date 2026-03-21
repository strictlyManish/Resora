import { configureStore } from '@reduxjs/toolkit'
import authReducer from "./features/auth/userAuth";
import musicReducer from "./features/music/musicSlice"


export const store = configureStore({
  reducer: {
    auth: authReducer,
    music: musicReducer,
  },
})