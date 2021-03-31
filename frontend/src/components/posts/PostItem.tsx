import React, { FC } from 'react'
import { PostData } from '../../features/postSlice'
import { useAppSelector } from '../../app/hooks'
import { RootState } from '../../app/store'
import { Link } from 'react-router-dom'
import Moment from 'react-moment'

type Props = {
  post: PostData
}

const PostItem: FC<Props> = ({ post }) => {
  const auth = useAppSelector((state: RootState) => state.auth)
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
        <button type="button" className="btn btn-light">
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
          <button type="button" className="btn btn-danger">
            <i className="fas fa-times"></i>
          </button>
        )}
      </div>
    </div>
  )
}

export default PostItem
