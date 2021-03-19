import React from 'react'
import { Link } from 'react-router-dom'

const Navbar = () => {
  return (
    <nav className="navbar bg-dark">
      <h1>
        <Link to="/">
          <i className="fas fa-code"></i>Introduct
        </Link>
      </h1>
      <ul>
        <li>
          <Link to="/register">ユーザー登録</Link>
        </li>
        <li>
          <Link to="/login">ログイン</Link>
        </li>
      </ul>
    </nav>
  )
}

export default Navbar
