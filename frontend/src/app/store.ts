import { configureStore } from '@reduxjs/toolkit'
import alertReducer from '../features/alertSlice'
import authReducer from '../features/authSlice'

export const store = configureStore({
  reducer: {
    alert: alertReducer,
    auth: authReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
