import React from 'react'
import { Link, Redirect } from 'react-router-dom'
import { useAppSelector } from '../../app/hooks'
import { RootState } from '../../app/store'

const Landing = () => {
  const isAuthenticated = useAppSelector(
    (state: RootState) => state.auth.auth.isAuthenticated
  )

  if (isAuthenticated) {
    return <Redirect to="/dashboard" />
  }
  return (
    <section className="landing">
      <div className="dark-overlay">
        <div className="landing-inner">
          <h1 className="x-large"> Introduct</h1>
          <p className="lead">お勧め製品を紹介しよう</p>
          <div className="buttons">
            <Link to="/register" className="btn btn-primary">
              ユーザー登録
            </Link>
            <Link to="/login" className="btn btn-light">
              ログイン
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Landing
