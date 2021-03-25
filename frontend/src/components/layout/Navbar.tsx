import React, { Fragment } from 'react'
import { Link } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import { logout } from '../../features/authSlice'

const Navbar = () => {
  const dispatch = useAppDispatch()

  const isAuthenticated = useAppSelector(
    (state) => state.auth.auth.isAuthenticated
  )
  const loading = useAppSelector((state) => state.auth.auth.loading)

  const authLinks = (
    <ul>
      <li>
        <a onClick={() => dispatch(logout())}>
          <i className="fas fa-sign-out-alt"></i>{' '}
          <span className="hide-sm">ログアウト</span>
        </a>
      </li>
    </ul>
  )

  const guestLinks = (
    <ul>
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
