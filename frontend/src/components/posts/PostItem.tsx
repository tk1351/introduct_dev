import React, { FC, useState } from 'react'
import {
  PostData,
  addLike,
  removeLike,
  deletePost,
} from '../../features/postSlice'
import { useAppSelector, useAppDispatch } from '../../app/hooks'
import { RootState } from '../../app/store'
import { Link } from 'react-router-dom'
import Moment from 'react-moment'

type Props = {
  post: PostData
}

const PostItem: FC<Props> = ({ post }) => {
  const dispatch = useAppDispatch()

  const auth = useAppSelector((state: RootState) => state.auth)
  const initialHasLike = post.likes.some(
    (like) => like.user._id === auth.auth.user?._id
  )

  const [hasLike, setHasLike] = useState(initialHasLike)

  const clickLikeButton = () => {
    if (hasLike) {
      dispatch(removeLike(post._id))
      setHasLike(!hasLike)
    } else {
      dispatch(addLike(post._id))
      setHasLike(!hasLike)
    }
  }

  const onDeletePostClicked = async () => {
    if (window.confirm('投稿を削除してもよろしいですか？')) {
      await dispatch(deletePost(post._id))
    }
    // @to-do payload.msgをsetAlertで表示
  }

  return (
    <div className="post bg-white p-1 my-1">
      <div>
        <a href="profile.html">
          <img className="round-img" src={post.avatar} alt="" />
          <h4>{post.name}</h4>
        </a>
      </div>
      <div>
        <h4>{post.title}</h4>
        <p className="my-1">{post.text}</p>
        <p className="post-date">
          Posted on <Moment format="YYYY/MM/DD">{post.createdAt}</Moment>
        </p>
        <button
          onClick={clickLikeButton}
          type="button"
          className="btn btn-light"
        >
          <i className="fas fa-thumbs-up"></i>{' '}
          <span>
            {post.likes.length > 0 && <span>{post.likes.length}</span>}
          </span>
        </button>
        <Link to={`/post/${post._id}`} className="btn btn-primary">
          コメント{' '}
          {post.comments.length > 0 && (
            <span className="comment-count">{post.comments.length}</span>
          )}
        </Link>
        {!auth.auth.loading && post.user === auth.auth.user?._id && (
          <button
            onClick={onDeletePostClicked}
            type="button"
            className="btn btn-danger"
          >
            <i className="fas fa-times"></i>
          </button>
        )}
      </div>
    </div>
  )
}

export default PostItem
