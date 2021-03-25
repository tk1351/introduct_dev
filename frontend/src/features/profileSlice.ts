import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import setAuthToken from '../utils/setAuthToken'

const initialState = {
  profile: null,
  profiles: [],
  loading: true,
  status: 'idle',
  error: null,
}

export const fetchCurrentProfile = createAsyncThunk(
  'profile/fetchCurrentProfile',
  async (_, { rejectWithValue }) => {
    if (localStorage.token) {
      setAuthToken(localStorage.token)
    }

    try {
      const url = '/api/v1/profile/me'
      const res = await axios.get(url)
      return res.data
    } catch (err) {
      const errors = err.response.data.msg
      console.error(err.response.data)
      return rejectWithValue({ errors })
    }
  }
)

export const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {
    clearProfile(state) {
      state.profile = null
      state.profiles = []
      state.loading = false
      state.error = null
    },
  },
  extraReducers: {
    [fetchCurrentProfile.pending as any]: (state) => {
      state.status = 'loading'
    },
    [fetchCurrentProfile.fulfilled as any]: (state, { payload }) => {
      state.status = 'succeeded'
      state.profile = payload
      state.loading = false
      state.error = null
    },
    [fetchCurrentProfile.rejected as any]: (state, { payload }) => {
      state.status = 'failed'
      state.loading = false
      state.error = payload.errors
    },
  },
})

export const { clearProfile } = profileSlice.actions

export default profileSlice.reducer
