import React, { Fragment, FC } from 'react'
import { Link } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import { RootState } from '../../app/store'
import { removeComment, CommentData } from '../../features/postSlice'
import { setAlert, removeAlert } from '../../features/alertSlice'
import { v4 as uuidv4 } from 'uuid'
import Moment from 'react-moment'

type Props = {
  comment: CommentData
  post_id: string
}

const CommentItem: FC<Props> = ({ comment, post_id }) => {
  const dispatch = useAppDispatch()
  const auth = useAppSelector((state: RootState) => state.auth.auth)

  const onDeleteCommentClicked = async () => {
    if (window.confirm('コメントを削除しますか？')) {
      const commentData = { post_id, comment_id: comment._id }
      const resultAction = await dispatch(removeComment(commentData))

      if (removeComment.fulfilled.match(resultAction)) {
        const id = uuidv4()
        dispatch(
          setAlert({ id, msg: 'コメントを削除しました', alertType: 'success' })
        )
        setTimeout(() => dispatch(removeAlert({ id })), 5000)
      }
    }
  }
  return (
    <Fragment>
      <div className="post bg-white p-1 my-1">
        <div>
          <Link to={`/profile/${comment.user}`}>
            <img src={comment.avatar} alt="" className="round-img" />
            <h4>{comment.name}</h4>
          </Link>
        </div>
        <div>
          <p className="my-1">{comment.text}</p>
          <p className="post-date">
            Posted on <Moment format="YYYY/MM/DD">{comment.date}</Moment>
          </p>
          {!auth.loading && comment.user === auth.user?._id && (
            <button
              type="button"
              className="btn btn-danger"
              onClick={onDeleteCommentClicked}
            >
              <i className="fas fa-times"></i>
            </button>
          )}
        </div>
      </div>
    </Fragment>
  )
}

export default CommentItem
