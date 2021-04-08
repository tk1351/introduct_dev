import React, { useState } from 'react'
import { useAppDispatch } from '../../app/hooks'
import { addPost, PostData } from '../../features/postSlice'
import { unwrapResult } from '@reduxjs/toolkit'
import { RouteComponentProps } from 'react-router-dom'
import { setAlert, removeAlert } from '../../features/alertSlice'
import { v4 as uuidv4 } from 'uuid'
import Alert, { ErrorAlert } from '../layout/Alert'
import { storage } from '../../firebase'

interface Props extends RouteComponentProps {}

const PostForm = ({ history }: Props) => {
  const dispatch = useAppDispatch()
  const [formData, setFormData] = useState<PostData>({
    _id: '',
    title: '',
    text: '',
    url: '',
    imageUrl: '',
    user: '',
    name: '',
    avatar: '',
    likes: [],
    comments: [],
    createdAt: new Date(),
    updatedAt: new Date(),
  })

  const [image, setImage] = useState<File | null>(null)

  const { title, text, url } = formData

  const onChange = (e: { target: { name: string; value: string } }) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    let imageUrl = ''

    if (image) {
      // 画像がある場合の投稿処理
      const str =
        'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'
      const num = 16
      const randomChar = Array.from(
        crypto.getRandomValues(new Uint32Array(num))
      )
        .map((n) => str[n % str.length])
        .join('')
      const fileName = randomChar + '_' + image.name
      await storage.ref(`avatars/${fileName}`).put(image)
      imageUrl = await storage.ref('avatars').child(fileName).getDownloadURL()
      const postData: PostData = { ...formData, imageUrl }
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
    } else {
      // 画像がない場合の投稿処理
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
  }

  const onChangeImageHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files![0]) {
      setImage(e.target.files![0])
      e.target.value = ''
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
          <i className="far fa-images fa-3x"></i>
          <label className="btn btn-primary">
            <input
              type="file"
              accept="image/*"
              onChange={onChangeImageHandler}
            />
            ファイル選択
          </label>
          {image !== null && <p>{image.name}</p>}
          <small className="form-text">対応ファイル: jpeg, jpg, png</small>
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
