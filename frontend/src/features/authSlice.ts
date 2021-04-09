import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import { RegisterUserData } from '../components/auth/Register'
import setAuthToken from '../utils/setAuthToken'
import { LoginUser } from '../components/auth/Login'

export interface UserData {
  _id: string
  name: string
  email: string
  avatar: string
  createdAt: Date
  updatedAt: Date
}
export interface AuthState {
  auth: {
    token: string | null
    isAuthenticated: boolean
    loading: boolean
    user: UserData | null
  }
  status: 'idle' | 'loading' | 'succeeded' | 'failed'
  error: null
}

const initialState: AuthState = {
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
  async (userData: RegisterUserData, { rejectWithValue }) => {
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
      setAuthToken(localStorage.token)
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

export const loginUser = createAsyncThunk(
  'auth/loginUser',
  async (loginUserData: LoginUser, { rejectWithValue }) => {
    try {
      const url = '/api/v1/auth'
      const res = await axios.post(url, loginUserData)
      if (res.status === 200) {
        localStorage.setItem('token', res.data.token)
        return res.data
      }
    } catch (err) {
      const errors = err.response.data.errors
      return rejectWithValue({ errors })
    }
  }
)

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout(state) {
      state.auth.token = null
      state.auth.isAuthenticated = false
      state.auth.loading = false
      state.auth.user = null
      state.status = 'idle'
      localStorage.removeItem('token')
    },
  },
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
      state.error = null
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
    [loginUser.pending as any]: (state) => {
      state.status = 'loading'
    },
    [loginUser.fulfilled as any]: (state, { payload }) => {
      state.status = 'succeeded'
      state.auth.token = payload.token
      state.auth.isAuthenticated = true
      state.auth.loading = false
      state.error = null
    },
    [loginUser.rejected as any]: (state, { payload }) => {
      state.status = 'failed'
      state.error = payload.errors
      state.auth.isAuthenticated = false
      state.auth.loading = false
    },
  },
})

export const { logout } = authSlice.actions

export default authSlice.reducer
