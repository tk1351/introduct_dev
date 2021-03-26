import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import setAuthToken from '../utils/setAuthToken'
import { ProfileData } from '../components/profile-form/CreateProfile'

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

export const createProfile = createAsyncThunk(
  'profile/createProfile',
  async (profileData: ProfileData, { rejectWithValue }) => {
    try {
      const url = '/api/v1/profile'
      const res = await axios.post(url, profileData)
      return res.data
    } catch (err) {
      const errors = err.response.data.errors
      return rejectWithValue({ errors })
    }
  }
)

export const deleteProfile = createAsyncThunk(
  'profile/deleteProfile',
  async (_, { rejectWithValue }) => {
    try {
      const url = '/api/v1/profile'
      const res = await axios.delete(url)
      return res.data
    } catch (err) {
      const errors = err.response.data
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
    [createProfile.pending as any]: (state) => {
      state.status = 'loading'
    },
    [createProfile.fulfilled as any]: (state, { payload }) => {
      state.status = 'succeeded'
      state.profile = payload
      state.loading = false
      state.error = null
    },
    [createProfile.rejected as any]: (state, { payload }) => {
      state.status = 'failed'
      state.loading = false
      state.error = payload.errors
    },
    [deleteProfile.pending as any]: (state) => {
      state.status = 'loading'
    },
    [deleteProfile.fulfilled as any]: (state) => {
      state.status = 'succeeded'
      state.profile = null
      state.loading = false
      state.error = null
    },
    [deleteProfile.rejected as any]: (state, { payload }) => {
      state.status = 'failed'
      state.loading = false
      state.error = payload.errors
    },
  },
})

export const { clearProfile } = profileSlice.actions

export default profileSlice.reducer
