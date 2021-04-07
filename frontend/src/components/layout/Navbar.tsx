import React, { Fragment } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import { RootState } from '../../app/store'
import { logout } from '../../features/authSlice'
import { clearProfile } from '../../features/profileSlice'

const Navbar = () => {
  const dispatch = useAppDispatch()

  const isAuthenticated = useAppSelector(
    (state: RootState) => state.auth.auth.isAuthenticated
  )
  const loading = useAppSelector((state: RootState) => state.auth.auth.loading)

  const history = useHistory()

  const clearUsersState = async () => {
    await dispatch(clearProfile())
    await dispatch(logout())
    history.push('/login')
  }

  const authLinks = (
    <ul>
      <li>
        <Link to="/profiles">プロフィール</Link>
      </li>
      <li>
        <Link to="/posts">記事一覧</Link>
      </li>
      <li>
        <Link to="/dashboard">
          <i className="fas fa-user"></i>{' '}
          <span className="hide-sm">ダッシュボード</span>
        </Link>
      </li>
      <li>
        <a onClick={() => clearUsersState()}>
          <i className="fas fa-sign-out-alt"></i>{' '}
          <span className="hide-sm">ログアウト</span>
        </a>
      </li>
    </ul>
  )

  const guestLinks = (
    <ul>
      <li>
        <Link to="/profiles">プロフィール</Link>
      </li>
      <li>
        <Link to="/register">ユーザー登録</Link>
      </li>
      <li>
        <Link to="/login">ログイン</Link>
      </li>
    </ul>
  )

  return (
    <nav className="navbar bg-dark">
      <h1>
        <Link to="/">
          <i className="fas fa-code"></i>Introduct
        </Link>
      </h1>

      {!loading && (
        <Fragment>{isAuthenticated ? authLinks : guestLinks}</Fragment>
      )}
    </nav>
  )
}

export default Navbar
