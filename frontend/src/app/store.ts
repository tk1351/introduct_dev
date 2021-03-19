import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit'
import alertReducer from '../features/alertSlice'

export const store = configureStore({
  reducer: {
    alert: alertReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>
