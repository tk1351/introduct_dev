import React from 'react'

const Landing = () => {
  return (
    <section className="landing">
      <div className="dark-overlay">
        <div className="landing-inner">
          <h1 className="x-large"> Introduct</h1>
          <p className="lead">お勧め製品を紹介しよう</p>
          <div className="buttons">
            <a href="register.html" className="btn btn-primary">
              ユーザー登録
            </a>
            <a href="login.html" className="btn btn-light">
              ログイン
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Landing
