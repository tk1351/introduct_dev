import React from 'react'
import { Link } from 'react-router-dom'

const Landing = () => {
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
