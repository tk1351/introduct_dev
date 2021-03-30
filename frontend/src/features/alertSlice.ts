import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface AlertState {
  alert: {
    id: string
    msg: string
    alertType: string
  }[]
}

const initialState: AlertState = {
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
    setAlert(state, { payload }) {
      state.alert = [...state.alert, payload]
    },
    removeAlert(state, { payload }) {
      state.alert = state.alert.filter((alert) => alert.id !== payload.id)
    },
  },
})

export const { setAlert, removeAlert } = alertSlice.actions

export default alertSlice.reducer
