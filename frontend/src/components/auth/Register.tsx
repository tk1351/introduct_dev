import React, { Fragment, useState } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { setAlert, removeAlert } from '../../features/alertSlice'
import { v4 as uuidv4 } from 'uuid'
import Alert, { ErrorAlert } from '../layout/Alert'
import { registerUser } from '../../features/authSlice'
import { unwrapResult } from '@reduxjs/toolkit'
import { AppDispatch } from 'src/app/store'

export interface UserData {
  name: string
  email: string
  password: string
}

const Register = () => {
  const dispatch: AppDispatch = useDispatch()

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    password2: '',
  })

  const { name, email, password, password2 } = formData

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
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
    } else {
      const userData: UserData = { name, email, password }
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
