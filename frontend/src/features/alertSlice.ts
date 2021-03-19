import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '../app/store'

const initialState = {
  alert: [
    {
      id: '',
      msg: '',
      alertType: '',
    },
  ],
}

export const alertSlice = createSlice({
  name: 'alert',
  initialState,
  reducers: {
    setAlert(state, action) {
      state.alert = [...state.alert, action.payload]
    },
    removeAlert(state, action) {
      state.alert = state.alert.filter(
        (alert) => alert.id !== action.payload.id
      )
    },
  },
})

export const { setAlert, removeAlert } = alertSlice.actions

export default alertSlice.reducer
