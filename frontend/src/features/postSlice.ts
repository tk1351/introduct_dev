import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import { UserData } from './authSlice'

export interface PostData {
  _id: string
  title: string
  text: string
  image: string
  url: string
  user: string
  name: string
  avatar: string
  likes: [{ user: string }]
  comments: [{ user: string; text: string; date: Date }]
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
      const url = '/api/v1/posts'
      const res = await axios.get(url)
      return res.data
    } catch (err) {
      const errors = err.response.data
      console.error(errors)
      return rejectWithValue({ errors })
    }
  }
)

export const addPost = createAsyncThunk(
  '/post/addPost',
  async (postData: PostData, { rejectWithValue }) => {
    try {
      const url = '/api/v1/posts'
      const res = await axios.post(url, postData)
      return res.data
    } catch (err) {
      const errors = err.response.data.errors
      return rejectWithValue({ errors })
    }
  }
)

export const addLike = createAsyncThunk(
  'post/addLike',
  async (post_id: string, { rejectWithValue }) => {
    try {
      const url = `/api/v1/posts/like/${post_id}`
      const res = await axios.put(url)
      return { id: post_id, likes: res.data }
    } catch (err) {
      const errors = err.response.data
      return rejectWithValue({ errors })
    }
  }
)

export const removeLike = createAsyncThunk(
  'post/removeLike',
  async (post_id: string, { rejectWithValue }) => {
    try {
      const url = `/api/v1/posts/unlike/${post_id}`
      const res = await axios.put(url)
      return { id: post_id, likes: res.data }
    } catch (err) {
      const errors = err.response.data
      return rejectWithValue({ errors })
    }
  }
)

export const deletePost = createAsyncThunk(
  'post/deletePost',
  async (post_id: string, { rejectWithValue }) => {
    try {
      const url = `/api/v1/posts/${post_id}`
      const res = await axios.delete(url)
      return { id: post_id, ...res.data }
    } catch (err) {
      const errors = err.response.data.errors
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
    [addPost.pending as any]: (state) => {
      state.status = 'loading'
    },
    [addPost.fulfilled as any]: (state, { payload }) => {
      state.status = 'succeeded'
      state.posts = [...state.posts, payload]
      state.loading = false
      state.error = null
    },
    [addPost.rejected as any]: (state, { payload }) => {
      state.status = 'failed'
      state.loading = false
      state.error = payload.errors
    },
    [addLike.pending as any]: (state) => {
      state.status = 'loading'
    },
    [addLike.fulfilled as any]: (state, { payload }) => {
      state.status = 'succeeded'
      // どのpostをlikeしたか判別
      const targetPostIndex = state.posts.findIndex(
        (post: { _id: string }) => post._id === payload.id
      )
      state.posts[targetPostIndex].likes = payload.likes
      state.loading = false
      state.error = null
    },
    [addLike.rejected as any]: (state, { payload }) => {
      state.status = 'failed'
      state.loading = false
      state.error = payload.errors
    },
    [removeLike.pending as any]: (state) => {
      state.status = 'loading'
    },
    [removeLike.fulfilled as any]: (state, { payload }) => {
      state.status = 'succeeded'
      const targetPostIndex = state.posts.findIndex(
        (post: { _id: string }) => post._id === payload.id
      )
      state.posts[targetPostIndex].likes = payload.likes
      state.loading = false
      state.error = null
    },
    [removeLike.rejected as any]: (state, { payload }) => {
      state.status = 'failed'
      state.loading = false
      state.error = payload.errors
    },
    [deletePost.pending as any]: (state) => {
      state.status = 'loading'
    },
    [deletePost.fulfilled as any]: (state, { payload }) => {
      state.status = 'succeeded'
      const deletePostIndex = state.posts.findIndex(
        (post: { _id: string }) => post._id === payload.id
      )
      state.posts.splice(deletePostIndex, 1)
      state.loading = false
      state.error = null
    },
    [deletePost.rejected as any]: (state, { payload }) => {
      state.status = 'failed'
      state.loading = false
      state.error = payload.errors
    },
  },
})

export default postSlice.reducer
