import React, { Fragment, useState } from 'react'
import { Link, Redirect } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import { RootState } from '../../app/store'
import { setAlert, removeAlert } from '../../features/alertSlice'
import { v4 as uuidv4 } from 'uuid'
import Alert, { ErrorAlert } from '../layout/Alert'
import { registerUser } from '../../features/authSlice'
import { unwrapResult } from '@reduxjs/toolkit'
import { storage } from '../../firebase'
export interface RegisterUserData {
  name: string
  email: string
  url?: string
  password: string
}

const Register = () => {
  const dispatch = useAppDispatch()

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    password2: '',
  })

  const [image, setImage] = useState<File | null>(null)

  const { name, email, password, password2 } = formData

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    let url = ''
    if (password !== password2) {
      const id = uuidv4()
      dispatch(
        setAlert({
          id,
          msg: '確認用パスワードが異なります',
          alertType: 'danger',
        })
      )
      setTimeout(() => dispatch(removeAlert({ id })), 5000)
    } else if (image) {
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
      url = await storage.ref('avatars').child(fileName).getDownloadURL()

      const userData: RegisterUserData = { name, email, url, password }
      const resultAction = await dispatch(registerUser(userData))
      unwrapResult(resultAction)
    } else {
      const userData: RegisterUserData = { name, email, password }
      const resultAction = await dispatch(registerUser(userData))

      // フォームに入る値の成否で分岐
      if (registerUser.fulfilled.match(resultAction)) {
        unwrapResult(resultAction)
      } else if (registerUser.rejected.match(resultAction)) {
        // FIXME: payloadがunknown型のため
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

  // login済みであればリダイレクトする
  const isAuthenticated = useAppSelector(
    (state: RootState) => state.auth.auth.isAuthenticated
  )
  if (isAuthenticated) {
    return <Redirect to="/dashboard" />
  }

  return (
    <Fragment>
      <Alert />
      <h1 className="large text-primary">ユーザー登録</h1>
      <p className="lead">
        <i className="fas fa-user"></i> アカウントを作成する
      </p>
      <form className="form" onSubmit={(e) => onSubmit(e)}>
        <div className="form-group">
          <input
            type="text"
            placeholder="ユーザー名"
            name="name"
            value={name}
            onChange={(e) => onChange(e)}
          />
        </div>
        <div className="form-group">
          <input
            type="email"
            placeholder="メールアドレス"
            name="email"
            value={email}
            onChange={(e) => onChange(e)}
          />
          <small className="form-text">
            Gravatarを使用している場合は、Gravatarのメールアドレスを入力してください
          </small>
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
            type="password"
            placeholder="パスワード"
            name="password"
            value={password}
            onChange={(e) => onChange(e)}
          />
        </div>
        <div className="form-group">
          <input
            type="password"
            placeholder="確認用パスワード"
            name="password2"
            value={password2}
            onChange={(e) => onChange(e)}
          />
        </div>
        <input type="submit" className="btn btn-primary" value="登録" />
      </form>
      <p className="my-1">
        既にアカウントを持っていますか？ <Link to="/login">ログイン</Link>
      </p>
    </Fragment>
  )
}

export default Register
