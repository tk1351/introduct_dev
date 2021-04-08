import React, { Fragment, useEffect, FC, useState } from 'react'
import Spinner from '../layout/Spinner'
import { useAppSelector, useAppDispatch } from '../../app/hooks'
import { RootState } from '../../app/store'
import { RouteComponentProps, Link } from 'react-router-dom'
import {
  fetchSinglePost,
  removeLike,
  addLike,
  fetchPosts,
} from '../../features/postSlice'
import Moment from 'react-moment'
import CommentForm from './CommentForm'
import CommentItem from './CommentItem'
import Alert from '../layout/Alert'

type PageProps = {} & RouteComponentProps<{ id: string }>

const Post: FC<PageProps> = ({ match }) => {
  const { id } = match.params
  const dispatch = useAppDispatch()
  const singlePost = useAppSelector((state: RootState) => state.post.post)

  const loading = useAppSelector((state: RootState) => state.post.loading)

  const auth = useAppSelector((state: RootState) => state.auth.auth)

  const [hasLike, setHasLike] = useState(false)

  useEffect(() => {
    dispatch(fetchSinglePost(id))
    dispatch(fetchPosts())
  }, [])

  useEffect(() => {
    if (singlePost === null) return
    setHasLike(singlePost.likes.some((like) => like.user === auth.user?._id))
  }, [singlePost, auth.user?._id])

  const clickLikeButton = () => {
    if (hasLike) {
      dispatch(removeLike(id))
      setHasLike(false)
    } else {
      dispatch(addLike(id))
      setHasLike(true)
    }
  }

  return (
    <Fragment>
      {loading || singlePost === null ? (
        <Spinner />
      ) : (
        <Fragment>
          <Alert />
          <Link className="btn btn-light my-1" to="/posts">
            戻る
          </Link>
          <div className="post bg-white p-1 my-1">
            <div>
              <Link to={`/profile/${singlePost.user}`}>
                <img className="round-img" src={singlePost.avatar} />
                <h4>{singlePost.name}</h4>
              </Link>
            </div>
            <div>
              <h4>{singlePost.title}</h4>
              <p className="my-1">{singlePost.text}</p>
              <div>
                {singlePost.imageUrl === '' ? (
                  <></>
                ) : (
                  <img src={singlePost.imageUrl} />
                )}
              </div>
              <div>
                {singlePost.url === '' ? (
                  <></>
                ) : (
                  <a
                    href={singlePost.url}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <i className="fas fa-globe fa-2x"></i>
                    {'  '}
                    <span>{singlePost.url}</span>
                  </a>
                )}
              </div>
              <p className="post-date">
                Posted on{' '}
                <Moment format="YYYY/MM/DD">{singlePost.createdAt}</Moment>
              </p>
              <button
                type="button"
                className="btn btn-light"
                onClick={clickLikeButton}
              >
                <i className="fas fa-thumbs-up"></i>{' '}
                {singlePost.likes.length > 0 && (
                  <span>{singlePost.likes.length}</span>
                )}
              </button>
            </div>
          </div>
          <CommentForm />
          <div className="comments">
            {singlePost.comments.map((comment) => (
              <CommentItem
                key={comment._id}
                comment={comment}
                post_id={singlePost._id}
              />
            ))}
          </div>
        </Fragment>
      )}
    </Fragment>
  )
}

export default Post
