import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import { UserData } from './authSlice'

interface PostData {
  _id: string
  title: string
  text: string
  image: string
  url: string
  user: UserData
  likes: [{ user: UserData }]
  comments: [{ user: UserData; text: string; date: Date }]
  createdAt: Date
  updatedAt: Date
}

interface PostState {
  post: PostData | null
  posts: PostData[]
  loading: boolean
  status: 'idle' | 'loading' | 'succeeded' | 'failed'
  error: null
}

const initialState: PostState = {
  post: null,
  posts: [],
  loading: true,
  status: 'idle',
  error: null,
}

export const fetchPosts = createAsyncThunk(
  'post/fetchPosts',
  async (_, { rejectWithValue }) => {
    try {
      const res = await axios.get('/api/v1/posts')
      return res.data
    } catch (err) {
      const errors = err.response.data
      console.error(errors)
      return rejectWithValue({ errors })
    }
  }
)

export const postSlice = createSlice({
  name: 'post',
  initialState,
  reducers: {},
  extraReducers: {
    [fetchPosts.pending as any]: (state) => {
      state.status = 'loading'
    },
    [fetchPosts.fulfilled as any]: (state, { payload }) => {
      state.status = 'succeeded'
      state.posts = payload
      state.loading = false
      state.error = null
    },
    [fetchPosts.rejected as any]: (state, { payload }) => {
      state.status = 'failed'
      state.posts = []
      state.loading = false
      state.error = payload.errors
    },
  },
})

export default postSlice.reducer
