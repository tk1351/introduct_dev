import React from 'react'

const Navbar = () => {
  return (
    <nav className="navbar bg-dark">
      <h1>
        <a href="index.html">
          <i className="fas fa-code"></i>Introduct
        </a>
      </h1>
      <ul>
        <li>
          <a href="register.html">ユーザー登録</a>
        </li>
        <li>
          <a href="login.html">ログイン</a>
        </li>
      </ul>
    </nav>
  )
}

export default Navbar
