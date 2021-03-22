import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

const initialState = {
  auth: {
    token: localStorage.getItem('token'),
    isAuthenticated: false,
    loading: true,
    user: null,
  },
  status: 'idle',
  error: null,
}

interface User {
  name: string
  email: string
  password: string
}

export const registerUser = createAsyncThunk(
  'auth/registerUser',
  async (userData: User, { rejectWithValue }) => {
    try {
      const url = '/api/v1/users'
      const res = await axios.post(url, userData)
      if (res.status === 200) {
        localStorage.setItem('token', res.data.token)
        return { ...res.data, userData }
      }
    } catch (err) {
      const errors = err.response.data.errors
      localStorage.removeItem('token')
      return rejectWithValue({ errors, message: 'ng' })
    }
  }
)

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: {
    [registerUser.pending as any]: (state, { payload }) => {
      state.status = 'loading'
    },
    [registerUser.fulfilled as any]: (state, { payload }) => {
      state.status = 'succeeded'
      state.auth.token = payload.token
      state.auth.user = payload.userData
      state.auth.isAuthenticated = true
      state.auth.loading = false
    },
    [registerUser.rejected as any]: (state, { payload }) => {
      state.status = 'failed'
      state.error = payload.errors
      state.auth.token = null
      state.auth.isAuthenticated = false
      state.auth.loading = false
    },
  },
})

export default authSlice.reducer
