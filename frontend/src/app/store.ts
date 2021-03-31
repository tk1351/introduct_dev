import { configureStore } from '@reduxjs/toolkit'
import alertReducer from '../features/alertSlice'
import authReducer from '../features/authSlice'
import profileReducer from '../features/profileSlice'
import postReducer from '../features/postSlice'

export const store = configureStore({
  reducer: {
    alert: alertReducer,
    auth: authReducer,
    profile: profileReducer,
    post: postReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
