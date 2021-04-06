import React, { useEffect, Fragment, useState } from 'react'
import Spinner from '../layout/Spinner'
import PostItem from './PostItem'
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import { fetchPosts } from '../../features/postSlice'
import { RootState } from '../../app/store'
import { Link } from 'react-router-dom'
import Alert from '../layout/Alert'
import Paginations from '../layout/Paginations'

const Posts = () => {
  const dispatch = useAppDispatch()

  const posts = useAppSelector((state: RootState) => state.post.posts)
  const loading = useAppSelector((state: RootState) => state.post.loading)

  const [currentPage, setCurrentPage] = useState<number>(1)
  const [postsPerPage] = useState<number>(10)

  const indexOfLastPost = currentPage * postsPerPage
  const indexOfFirstPost = indexOfLastPost - postsPerPage
  const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost)

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber)

  useEffect(() => {
    dispatch(fetchPosts())
  }, [])
  return (
    <Fragment>
      {loading ? (
        <Spinner />
      ) : (
        <Fragment>
          <Alert />
          <h1 className="large text-primary">記事一覧</h1>
          <p className="lead">
            <i className="fas fa-user"></i> ようこそ
          </p>
          <Link to="/post-form" className="btn btn-primary">
            投稿する
          </Link>
          <div className="posts">
            {currentPosts.map((post) => (
              <PostItem key={post._id} post={post} />
            ))}
          </div>
          <Paginations
            postsPerPage={postsPerPage}
            totalPosts={posts.length}
            paginate={paginate}
          />
        </Fragment>
      )}
    </Fragment>
  )
}

export default Posts
