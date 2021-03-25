import React, { useState, Fragment } from 'react'
import { Link, Redirect } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import { loginUser, loadUser } from '../../features/authSlice'
import { unwrapResult } from '@reduxjs/toolkit'
import { v4 as uuidv4 } from 'uuid'
import { ErrorAlert } from '../layout/Alert'
import { removeAlert, setAlert } from '../../features/alertSlice'
import Alert from '../layout/Alert'

export interface LoginUser {
  email: string
  password: string
}

const Login = () => {
  const dispatch = useAppDispatch()

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  })

  const { email, password } = formData

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const loginUserData: LoginUser = { email, password }
    const resultAction = await dispatch(loginUser(loginUserData))

    if (loginUser.fulfilled.match(resultAction)) {
      unwrapResult(resultAction)
      dispatch(loadUser())
    } else if (loginUser.rejected.match(resultAction)) {
      const payload = resultAction.payload as any
      payload.errors.map((error: ErrorAlert) => {
        const id = uuidv4()
        dispatch(setAlert({ id, msg: error.msg, alertType: 'danger' }))
        setTimeout(() => dispatch(removeAlert({ id })), 5000)
      })
    }
  }

  // login済みであればリダイレクトする
  const isAuthenticated = useAppSelector(
    (state) => state.auth.auth.isAuthenticated
  )
  if (isAuthenticated) {
    return <Redirect to="/dashboard" />
  }
  return (
    <Fragment>
      <Alert />
      <h1 className="large text-primary">ログイン</h1>
      <p className="lead">
        <i className="fas fa-user"></i> アカウントへログインする
      </p>
      <form className="form" onSubmit={(e) => onSubmit(e)}>
        <div className="form-group">
          <input
            type="email"
            placeholder="メールアドレス"
            name="email"
            value={email}
            onChange={(e) => onChange(e)}
          />
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
        <input type="submit" className="btn btn-primary" value="ログイン" />
      </form>
      <p className="my-1">
        アカウントを持っていませんか? <Link to="/register">ユーザー登録</Link>
      </p>
    </Fragment>
  )
}

export default Login
