import { configureStore } from '@reduxjs/toolkit'
import authReducer from "./features/auth/userAuth";



export const store = configureStore({
  reducer: {
    auth: authReducer,
  },
})