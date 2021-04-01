import React, { useState } from 'react'
import { useAppDispatch } from '../../app/hooks'
import { addPost, PostData } from '../../features/postSlice'
import { unwrapResult } from '@reduxjs/toolkit'
import { RouteComponentProps } from 'react-router-dom'
import { setAlert, removeAlert } from '../../features/alertSlice'
import { v4 as uuidv4 } from 'uuid'
import Alert, { ErrorAlert } from '../layout/Alert'

interface Props extends RouteComponentProps {}

const PostForm = ({ history }: Props) => {
  const dispatch = useAppDispatch()
  const [formData, setFormData] = useState<PostData>({
    _id: '',
    title: '',
    text: '',
    image: '',
    url: '',
    user: '',
    name: '',
    avatar: '',
    likes: [{ user: '' }],
    comments: [{ user: '', text: '', date: new Date() }],
    createdAt: new Date(),
    updatedAt: new Date(),
  })

  const { title, text, image, url } = formData

  const onChange = (e: { target: { name: string; value: string } }) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const postData: PostData = formData
    const resultAction = await dispatch(addPost(postData))

    if (addPost.fulfilled.match(resultAction)) {
      unwrapResult(resultAction)
      history.push('/posts')
      const id = uuidv4()
      dispatch(
        setAlert({
          id,
          msg: '記事を投稿しました',
          alertType: 'success',
        })
      )
      setTimeout(() => dispatch(removeAlert({ id })), 5000)
    } else if (addPost.rejected.match(resultAction)) {
      const payload = resultAction.payload as any
      payload.errors.map((error: ErrorAlert) => {
        const id = uuidv4()
        dispatch(setAlert({ id, msg: error.msg, alertType: 'danger' }))
        setTimeout(() => dispatch(removeAlert({ id })), 5000)
      })
    }
  }

  return (
    <div className="post-form">
      <Alert />
      <div className="bg-primary p">
        <h3>記事を投稿する</h3>
      </div>
      <form className="form my-1" onSubmit={(e) => onSubmit(e)}>
        <div className="form-group">
          <input
            type="text"
            placeholder="タイトル"
            name="title"
            value={title}
            onChange={(e) => onChange(e)}
          />
        </div>
        <div className="form-group">
          <textarea
            name="text"
            placeholder="本文"
            value={text}
            onChange={(e) => onChange(e)}
            rows={10}
            cols={30}
          ></textarea>
        </div>
        <div className="form-group">
          <input
            type="text"
            placeholder="画像"
            name="image"
            value={image}
            onChange={(e) => onChange(e)}
          />
        </div>
        <div className="form-group">
          <input
            type="text"
            placeholder="URL"
            name="url"
            value={url}
            onChange={(e) => onChange(e)}
          />
          <small className="form-text">製品のURLを追記してください</small>
        </div>
        <input type="submit" className="btn btn-dark my-1" value="投稿" />
      </form>
    </div>
  )
}

export default PostForm
