import { configureStore } from '@reduxjs/toolkit'
import alertReducer from '../features/alertSlice'
import authReducer from '../features/authSlice'
import profileReducer from '../features/profileSlice'

export const store = configureStore({
  reducer: {
    alert: alertReducer,
    auth: authReducer,
    profile: profileReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
