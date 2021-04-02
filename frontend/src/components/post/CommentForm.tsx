import React, { useState } from 'react'
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import { RootState } from '../../app/store'
import { addComment } from '../../features/postSlice'
import { unwrapResult } from '@reduxjs/toolkit'
import { setAlert, removeAlert } from '../../features/alertSlice'
import { v4 as uuidv4 } from 'uuid'
import { ErrorAlert } from '../layout/Alert'

const CommentForm = () => {
  const dispatch = useAppDispatch()
  const post = useAppSelector((state: RootState) => state.post.post)

  const [text, setText] = useState('')

  const onSaveCommentClicked = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const post_id = post?._id
    const commentData = { post_id, text }
    const resultAction = await dispatch(addComment(commentData))

    if (addComment.fulfilled.match(resultAction)) {
      unwrapResult(resultAction)
      const id = uuidv4()
      dispatch(
        setAlert({ id, msg: 'コメントを投稿しました', alertType: 'success' })
      )
      setTimeout(() => dispatch(removeAlert({ id })), 5000)
      setText('')
    } else if (addComment.rejected.match(resultAction)) {
      const payload = resultAction.payload as any
      payload.errors.errors.map((error: ErrorAlert) => {
        const id = uuidv4()
        dispatch(setAlert({ id, msg: error.msg, alertType: 'danger' }))
        setTimeout(() => dispatch(removeAlert({ id })), 5000)
      })
    }
  }

  return (
    <div className="post-form">
      <div className="bg-primary p">
        <h3>コメントをする</h3>
      </div>
      <form className="form my-1" onSubmit={(e) => onSaveCommentClicked(e)}>
        <textarea
          name="text"
          cols={30}
          rows={5}
          placeholder="コメントを入力してください"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <input type="submit" className="btn btn-dark my-1" value="投稿" />
      </form>
    </div>
  )
}

export default CommentForm
