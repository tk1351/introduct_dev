import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit'
import alertReducer from '../features/alertSlice'
import authReducer from '../features/authSlice'

export const store = configureStore({
  reducer: {
    alert: alertReducer,
    auth: authReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>
export type AppDispatch = typeof store.dispatch
