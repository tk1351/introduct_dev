import React, { useEffect, Fragment } from 'react'
import Spinner from '../layout/Spinner'
import PostItem from './PostItem'
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import { fetchPosts } from '../../features/postSlice'
import { RootState } from '../../app/store'

const Posts = () => {
  const dispatch = useAppDispatch()

  const posts = useAppSelector((state: RootState) => state.post.posts)
  const loading = useAppSelector((state: RootState) => state.post.loading)

  useEffect(() => {
    dispatch(fetchPosts())
  }, [])
  return (
    <Fragment>
      {loading ? (
        <Spinner />
      ) : (
        <Fragment>
          <h1 className="large text-primary">Posts</h1>
          <p className="lead">
            <i className="fas fa-user"></i> ようこそ
          </p>
          {/* PostForm */}
          <div className="posts">
            {posts.map((post) => (
              <PostItem key={post._id} post={post} />
            ))}
          </div>
        </Fragment>
      )}
    </Fragment>
  )
}

export default Posts
