import React, { useEffect, Fragment } from 'react'
import Spinner from '../layout/Spinner'
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import { fetchPosts } from '../../features/postSlice'
import { RootState } from '../../app/store'

const Posts = () => {
  const dispatch = useAppDispatch()

  const loading = useAppSelector((state: RootState) => state.post.loading)

  useEffect(() => {
    dispatch(fetchPosts())
  }, [])
  return (
    <Fragment>{loading ? <Spinner /> : <Fragment>Posts</Fragment>}</Fragment>
  )
}

export default Posts
