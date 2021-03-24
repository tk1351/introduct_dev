import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import { UserData } from 'src/components/auth/Register'
import setAuhtToken from '../utils/setAuthToken'

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

export const registerUser = createAsyncThunk(
  'auth/registerUser',
  async (userData: UserData, { rejectWithValue }) => {
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
      return rejectWithValue({ errors })
    }
  }
)

export const loadUser = createAsyncThunk(
  'auth/loadUser',
  async (_, { rejectWithValue }) => {
    if (localStorage.token) {
      setAuhtToken(localStorage.token)
    }

    try {
      const url = '/api/v1/auth'
      const res = await axios.get(url)
      if (res.status === 200) {
        return res.data
      }
    } catch (err) {
      const error = err.response.data.msg
      return rejectWithValue(error)
    }
  }
)

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: {
    [registerUser.pending as any]: (state) => {
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
      state.auth.user = null
      state.auth.isAuthenticated = false
      state.auth.loading = false
    },
    [loadUser.pending as any]: (state) => {
      state.status = 'loading'
    },
    [loadUser.fulfilled as any]: (state, { payload }) => {
      state.status = 'succeeded'
      state.auth.user = payload
      state.auth.isAuthenticated = true
      state.auth.loading = false
    },
    [loadUser.rejected as any]: (state, { payload }) => {
      state.status = 'failed'
      state.error = payload
      state.auth.token = null
      state.auth.user = null
      state.auth.isAuthenticated = false
      state.auth.loading = false
    },
  },
})

export default authSlice.reducer
